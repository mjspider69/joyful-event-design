
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageCircle, Heart, FileText, Settings, Download, Plus, Ticket, Edit3 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const CustomerDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [quotations, setQuotations] = useState<any[]>([]);
  const [savedVendors, setSavedVendors] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [showTicketForm, setShowTicketForm] = useState(false);
  const [ticketData, setTicketData] = useState({ title: '', description: '', priority: 'medium' });
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .eq('customer_id', user?.id)
        .order('created_at', { ascending: false });
      setBookings(bookingsData || []);

      // Fetch quotations
      const { data: quotationsData } = await supabase
        .from('quotations')
        .select('*')
        .eq('customer_id', user?.id)
        .order('created_at', { ascending: false });
      setQuotations(quotationsData || []);

      // Fetch saved vendors
      const { data: savedData } = await supabase
        .from('saved_vendors')
        .select(`
          *,
          vendors (
            id,
            business_name,
            category,
            location,
            rating,
            portfolio_images
          )
        `)
        .eq('customer_id', user?.id);
      setSavedVendors(savedData || []);

      // Fetch invoices
      const { data: invoicesData } = await supabase
        .from('invoices')
        .select('*')
        .eq('customer_id', user?.id)
        .order('created_at', { ascending: false });
      setInvoices(invoicesData || []);

      // Fetch tickets
      const { data: ticketsData } = await supabase
        .from('tickets')
        .select('*')
        .eq('customer_id', user?.id)
        .order('created_at', { ascending: false });
      setTickets(ticketsData || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const handleCreateTicket = async () => {
    try {
      const { error } = await supabase
        .from('tickets')
        .insert([
          {
            customer_id: user?.id,
            title: ticketData.title,
            description: ticketData.description,
            priority: ticketData.priority
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Ticket created successfully"
      });

      setShowTicketForm(false);
      setTicketData({ title: '', description: '', priority: 'medium' });
      fetchDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create ticket",
        variant: "destructive"
      });
    }
  };

  const downloadInvoice = async (invoiceId: string) => {
    // In a real implementation, this would generate and download a PDF
    toast({
      title: "Download Started",
      description: "Invoice download will begin shortly"
    });
  };

  const removeSavedVendor = async (vendorId: string) => {
    try {
      const { error } = await supabase
        .from('saved_vendors')
        .delete()
        .eq('customer_id', user?.id)
        .eq('vendor_id', vendorId);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Vendor removed from saved list"
      });

      fetchDashboardData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove vendor",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-coral-500 text-white text-xl">
                {profile?.full_name?.charAt(0) || 'C'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-charcoal-900">
                Welcome back, {profile?.full_name || 'Customer'}!
              </h1>
              <p className="text-charcoal-600">Plan your perfect event with us</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-coral-500" />
                <div>
                  <p className="text-2xl font-bold text-charcoal-900">{bookings.length}</p>
                  <p className="text-sm text-charcoal-600">Active Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-sage-600" />
                <div>
                  <p className="text-2xl font-bold text-charcoal-900">{quotations.length}</p>
                  <p className="text-sm text-charcoal-600">Quotations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Heart className="h-8 w-8 text-red-500" />
                <div>
                  <p className="text-2xl font-bold text-charcoal-900">{savedVendors.length}</p>
                  <p className="text-sm text-charcoal-600">Saved Vendors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-charcoal-900">{tickets.length}</p>
                  <p className="text-sm text-charcoal-600">Support Tickets</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="quotations">Quotations</TabsTrigger>
            <TabsTrigger value="vendors">Saved Vendors</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
            <TabsTrigger value="tickets">Support</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  My Bookings
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-charcoal-600">No bookings yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-coral-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-charcoal-900">{booking.event_type}</h3>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-charcoal-600 mb-4">
                            <div>Event Date: {new Date(booking.event_date).toLocaleDateString()}</div>
                            <div>Guests: {booking.guest_count}</div>
                            <div>Location: {booking.event_location}</div>
                            <div>Budget: ₹{booking.budget?.toLocaleString()}</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-coral-600">
                              ₹{booking.total_amount?.toLocaleString() || 'TBD'}
                            </span>
                            <Button variant="outline" size="sm">
                              View Details
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

          <TabsContent value="invoices" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Invoices
                </CardTitle>
              </CardHeader>
              <CardContent>
                {invoices.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-charcoal-600">No invoices yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {invoices.map((invoice) => (
                      <Card key={invoice.id} className="border-l-4 border-l-sage-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-charcoal-900">
                              Invoice #{invoice.invoice_number}
                            </h3>
                            <Badge className={getStatusColor(invoice.status)}>
                              {invoice.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-charcoal-600 mb-4">
                            <div>Amount: ₹{invoice.amount?.toLocaleString()}</div>
                            <div>Due Date: {new Date(invoice.due_date).toLocaleDateString()}</div>
                            <div>Tax: ₹{invoice.tax_amount?.toLocaleString()}</div>
                            <div>Total: ₹{invoice.total_amount?.toLocaleString()}</div>
                          </div>
                          <div className="flex justify-end">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => downloadInvoice(invoice.id)}
                            >
                              <Download className="h-4 w-4 mr-2" />
                              Download
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

          <TabsContent value="vendors" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Saved Vendors
                </CardTitle>
              </CardHeader>
              <CardContent>
                {savedVendors.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-charcoal-600">No saved vendors yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {savedVendors.map((saved) => (
                      <Card key={saved.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-4">
                          <div className="mb-3">
                            <h3 className="font-semibold text-charcoal-900">
                              {saved.vendors.business_name}
                            </h3>
                            <p className="text-sm text-charcoal-600">{saved.vendors.category}</p>
                            <p className="text-sm text-charcoal-500">{saved.vendors.location}</p>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-500">★</span>
                              <span className="text-sm">{saved.vendors.rating}</span>
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => removeSavedVendor(saved.vendor_id)}
                            >
                              Remove
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

          <TabsContent value="tickets" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Ticket className="h-5 w-5" />
                    Support Tickets
                  </CardTitle>
                  <Button 
                    onClick={() => setShowTicketForm(true)}
                    className="bg-coral-500 hover:bg-coral-600"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New Ticket
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {showTicketForm && (
                  <Card className="mb-6 border-2 border-coral-200">
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-4">Create New Ticket</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Ticket Title"
                          value={ticketData.title}
                          onChange={(e) => setTicketData({...ticketData, title: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        />
                        <textarea
                          placeholder="Describe your issue..."
                          value={ticketData.description}
                          onChange={(e) => setTicketData({...ticketData, description: e.target.value})}
                          className="w-full p-2 border rounded-md h-24"
                        />
                        <select
                          value={ticketData.priority}
                          onChange={(e) => setTicketData({...ticketData, priority: e.target.value})}
                          className="w-full p-2 border rounded-md"
                        >
                          <option value="low">Low Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="high">High Priority</option>
                          <option value="urgent">Urgent</option>
                        </select>
                        <div className="flex gap-2">
                          <Button onClick={handleCreateTicket} className="bg-coral-500 hover:bg-coral-600">
                            Create Ticket
                          </Button>
                          <Button variant="outline" onClick={() => setShowTicketForm(false)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {tickets.length === 0 ? (
                  <div className="text-center py-8">
                    <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-charcoal-600">No support tickets yet</p>
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
                              <Badge variant="outline">
                                {ticket.priority}
                              </Badge>
                            </div>
                          </div>
                          <p className="text-sm text-charcoal-600 mb-2">{ticket.description}</p>
                          <p className="text-xs text-charcoal-500">
                            Created: {new Date(ticket.created_at).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input 
                      type="text" 
                      value={profile?.full_name || ''} 
                      className="w-full p-2 border rounded-md"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input 
                      type="tel" 
                      value={profile?.phone || ''} 
                      className="w-full p-2 border rounded-md"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input 
                      type="text" 
                      value={profile?.city || ''} 
                      className="w-full p-2 border rounded-md"
                      readOnly
                    />
                  </div>
                </div>
                <Button className="bg-coral-500 hover:bg-coral-600">
                  <Edit3 className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomerDashboard;
