
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building, DollarSign, BarChart3, Check, X, Eye, Shield, Settings, Package } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalBookings: 0,
    totalRevenue: 0
  });
  const [pendingVendors, setPendingVendors] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [recentBookings, setRecentBookings] = useState<any[]>([]);
  const [packages, setPackages] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [adminSettings, setAdminSettings] = useState<any>({});
  const { toast } = useToast();

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch stats
      const { count: userCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      const { count: vendorCount } = await supabase
        .from('vendors')
        .select('*', { count: 'exact', head: true });

      const { count: bookingCount } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true });

      const { data: payments } = await supabase
        .from('payments')
        .select('amount')
        .eq('payment_status', 'completed');

      const revenue = payments?.reduce((sum, p) => sum + Number(p.amount), 0) || 0;

      setStats({
        totalUsers: userCount || 0,
        totalVendors: vendorCount || 0,
        totalBookings: bookingCount || 0,
        totalRevenue: revenue
      });

      // Fetch pending vendors
      const { data: pendingData } = await supabase
        .from('vendors')
        .select('*')
        .eq('is_approved', false)
        .order('created_at', { ascending: false });
      setPendingVendors(pendingData || []);

      // Fetch all users
      const { data: usersData } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      setAllUsers(usersData || []);

      // Fetch recent bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);
      setRecentBookings(bookingsData || []);

      // Fetch packages
      const { data: packagesData } = await supabase
        .from('packages')
        .select('*')
        .order('created_at', { ascending: false });
      setPackages(packagesData || []);

      // Fetch support tickets
      const { data: ticketsData } = await supabase
        .from('tickets')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);
      setTickets(ticketsData || []);

      // Fetch admin settings
      const { data: settingsData } = await supabase
        .from('admin_settings')
        .select('*');
      
      const settingsObj = {};
      settingsData?.forEach(setting => {
        settingsObj[setting.key] = setting.value;
      });
      setAdminSettings(settingsObj);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const approveVendor = async (vendorId: string) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ is_approved: true, status: 'approved' })
        .eq('id', vendorId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Vendor approved successfully"
      });

      fetchDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to approve vendor",
        variant: "destructive"
      });
    }
  };

  const rejectVendor = async (vendorId: string) => {
    try {
      const { error } = await supabase
        .from('vendors')
        .update({ is_approved: false, status: 'rejected' })
        .eq('id', vendorId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Vendor rejected successfully"
      });

      fetchDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reject vendor",
        variant: "destructive"
      });
    }
  };

  const updateTicketStatus = async (ticketId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('tickets')
        .update({ status })
        .eq('id', ticketId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Ticket status updated successfully"
      });

      fetchDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update ticket status",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': case 'approved': case 'completed': case 'resolved': return 'bg-green-100 text-green-800';
      case 'pending': case 'open': case 'in_progress': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': case 'rejected': case 'closed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-coral-600" />
            <h1 className="text-3xl font-bold text-charcoal-900">Admin Dashboard</h1>
          </div>
          <p className="text-charcoal-600">Manage your platform, vendors, and users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-charcoal-900">{stats.totalUsers}</p>
                  <p className="text-sm text-charcoal-600">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Building className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-charcoal-900">{stats.totalVendors}</p>
                  <p className="text-sm text-charcoal-600">Total Vendors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold text-charcoal-900">{stats.totalBookings}</p>
                  <p className="text-sm text-charcoal-600">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold text-charcoal-900">₹{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-charcoal-600">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="vendors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7 bg-white">
            <TabsTrigger value="vendors">Vendor Approvals</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="tickets">Support</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="vendors" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" />
                  Pending Vendor Approvals ({pendingVendors.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pendingVendors.length === 0 ? (
                  <div className="text-center py-8">
                    <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-charcoal-600">No pending vendor approvals</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingVendors.map((vendor) => (
                      <Card key={vendor.id} className="border-l-4 border-l-yellow-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg text-charcoal-900">{vendor.business_name}</h3>
                              <p className="text-charcoal-600">{vendor.category}</p>
                              <Badge className="mt-1 bg-yellow-100 text-yellow-800">
                                Pending Approval
                              </Badge>
                            </div>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {/* View details */}}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => approveVendor(vendor.id)}
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => rejectVendor(vendor.id)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-charcoal-600">
                            <div>Location: {vendor.location}</div>
                            <div>Price Range: {vendor.price_range}</div>
                            <div>Applied: {new Date(vendor.created_at).toLocaleDateString()}</div>
                            <div>Rating: {vendor.rating || 0}/5</div>
                          </div>
                          {vendor.description && (
                            <p className="mt-3 text-sm text-charcoal-700">{vendor.description}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tickets" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Support Tickets ({tickets.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tickets.length === 0 ? (
                  <div className="text-center py-8">
                    <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-charcoal-600">No support tickets</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tickets.map((ticket) => (
                      <Card key={ticket.id} className="border-l-4 border-l-blue-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-charcoal-900">{ticket.title}</h3>
                            <div className="flex gap-2">
                              <Badge className={getStatusColor(ticket.status)}>
                                {ticket.status}
                              </Badge>
                              <Badge className={getPriorityColor(ticket.priority)}>
                                {ticket.priority}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-charcoal-600 mb-3">{ticket.description}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-charcoal-500">
                              Created: {new Date(ticket.created_at).toLocaleDateString()} • 
                              Category: {ticket.category}
                            </p>
                            <div className="flex gap-2">
                              {ticket.status === 'open' && (
                                <Button
                                  size="sm"
                                  onClick={() => updateTicketStatus(ticket.id, 'in_progress')}
                                >
                                  Start Processing
                                </Button>
                              )}
                              {ticket.status === 'in_progress' && (
                                <Button
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() => updateTicketStatus(ticket.id, 'resolved')}
                                >
                                  Mark Resolved
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packages" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Packages Management
                  </CardTitle>
                  <Button className="bg-coral-500 hover:bg-coral-600">
                    Add New Package
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {packages.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-charcoal-600">No packages available</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {packages.map((pkg) => (
                      <Card key={pkg.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="mb-3">
                            <h3 className="font-semibold text-charcoal-900">{pkg.name}</h3>
                            <p className="text-sm text-charcoal-600">{pkg.category}</p>
                            <p className="text-sm text-charcoal-500">{pkg.price_range}</p>
                          </div>
                          <p className="text-sm text-charcoal-600 mb-3">{pkg.description}</p>
                          <div className="flex justify-between items-center">
                            <Badge className={pkg.is_featured ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}>
                              {pkg.is_featured ? 'Featured' : 'Regular'}
                            </Badge>
                            <Button variant="outline" size="sm">
                              Edit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  All Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {allUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-charcoal-900">{user.full_name || 'Anonymous User'}</h4>
                        <p className="text-sm text-charcoal-600">{user.phone}</p>
                        <Badge className="text-xs bg-blue-100 text-blue-800">
                          {user.user_type || 'customer'}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-charcoal-600">{user.city}</p>
                        <p className="text-xs text-charcoal-500">
                          Joined {new Date(user.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Recent Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentBookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-charcoal-900">{booking.event_type}</h4>
                        <p className="text-sm text-charcoal-600">{booking.event_location}</p>
                        <Badge className={getStatusColor(booking.status)}>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-charcoal-900">₹{booking.total_amount?.toLocaleString()}</p>
                        <p className="text-sm text-charcoal-600">
                          {new Date(booking.event_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Platform Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Hero Title</label>
                    <input 
                      type="text" 
                      value={adminSettings.hero_title?.replace(/"/g, '') || ''} 
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter hero section title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Hero Subtitle</label>
                    <textarea 
                      value={adminSettings.hero_subtitle?.replace(/"/g, '') || ''} 
                      className="w-full p-2 border rounded-md h-24"
                      placeholder="Enter hero section subtitle"
                    />
                  </div>
                  <Button className="bg-coral-500 hover:bg-coral-600">
                    Save Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Platform Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-charcoal-600 mb-4">Advanced analytics coming soon!</p>
                  <p className="text-sm text-charcoal-500">Track user engagement, revenue trends, and vendor performance</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
