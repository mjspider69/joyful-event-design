
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Building, DollarSign, BarChart3, Check, X, Eye, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

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

  useEffect(() => {
    fetchStats();
    fetchPendingVendors();
    fetchAllUsers();
    fetchRecentBookings();
  }, []);

  const fetchStats = async () => {
    // Fetch total users
    const { count: userCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });

    // Fetch total vendors
    const { count: vendorCount } = await supabase
      .from('vendors')
      .select('*', { count: 'exact', head: true });

    // Fetch total bookings
    const { count: bookingCount } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true });

    // Fetch total revenue
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
  };

  const fetchPendingVendors = async () => {
    const { data } = await supabase
      .from('vendors')
      .select('*')
      .eq('status', 'pending')
      .order('created_at', { ascending: false });
    setPendingVendors(data || []);
  };

  const fetchAllUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);
    setAllUsers(data || []);
  };

  const fetchRecentBookings = async () => {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(10);
    setRecentBookings(data || []);
  };

  const approveVendor = async (vendorId: string) => {
    const { error } = await supabase
      .from('vendors')
      .update({ status: 'approved' })
      .eq('id', vendorId);

    if (!error) {
      fetchPendingVendors();
      fetchStats();
    }
  };

  const rejectVendor = async (vendorId: string) => {
    const { error } = await supabase
      .from('vendors')
      .update({ status: 'rejected' })
      .eq('id', vendorId);

    if (!error) {
      fetchPendingVendors();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="h-8 w-8 text-maroon-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600">Manage your platform, vendors, and users</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                  <p className="text-sm text-gray-600">Total Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Building className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalVendors}</p>
                  <p className="text-sm text-gray-600">Total Vendors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-purple-600" />
                <div>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="vendors" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="vendors">Vendor Approvals</TabsTrigger>
            <TabsTrigger value="users">All Users</TabsTrigger>
            <TabsTrigger value="bookings">Recent Bookings</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="vendors" className="space-y-4">
            <Card>
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
                    <p className="text-gray-600">No pending vendor approvals</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {pendingVendors.map((vendor) => (
                      <Card key={vendor.id} className="border-l-4 border-l-yellow-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">{vendor.business_name}</h3>
                              <p className="text-gray-600">{vendor.category}</p>
                              <Badge variant="outline" className="mt-1">
                                {vendor.status}
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
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div>Location: {vendor.location}</div>
                            <div>Price Range: {vendor.price_range}</div>
                            <div>Applied: {new Date(vendor.created_at).toLocaleDateString()}</div>
                            <div>Rating: {vendor.rating}/5</div>
                          </div>
                          {vendor.description && (
                            <p className="mt-3 text-sm text-gray-700">{vendor.description}</p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
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
                        <h4 className="font-medium">{user.full_name || 'Anonymous User'}</h4>
                        <p className="text-sm text-gray-600">{user.phone}</p>
                        <Badge variant="outline" className="text-xs">
                          {user.user_type || 'customer'}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{user.city}</p>
                        <p className="text-xs text-gray-500">
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
            <Card>
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
                        <h4 className="font-medium">{booking.event_type}</h4>
                        <p className="text-sm text-gray-600">{booking.event_location}</p>
                        <Badge className={
                          booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }>
                          {booking.status}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">₹{booking.total_amount?.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(booking.event_date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Platform Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Advanced analytics coming soon!</p>
                  <p className="text-sm text-gray-500">Track user engagement, revenue trends, and vendor performance</p>
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
