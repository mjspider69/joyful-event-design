
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageCircle, DollarSign, Star, Settings, Upload, Check, X, Eye, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const VendorDashboard: React.FC = () => {
  const { user, profile } = useAuth();
  const [vendorProfile, setVendorProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [earnings, setEarnings] = useState<any[]>([]);
  const [availability, setAvailability] = useState<any[]>([]);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchVendorData();
    }
  }, [user]);

  const fetchVendorData = async () => {
    try {
      // Fetch vendor profile
      const { data: vendorData } = await supabase
        .from('vendors')
        .select('*')
        .eq('user_id', user?.id)
        .single();
      
      if (vendorData) {
        setVendorProfile(vendorData);
        setIsOnline(vendorData.is_online || false);
      }

      // Fetch bookings
      const { data: bookingsData } = await supabase
        .from('bookings')
        .select('*')
        .eq('vendor_id', vendorData?.id)
        .order('created_at', { ascending: false });
      setBookings(bookingsData || []);

      // Fetch earnings
      const { data: earningsData } = await supabase
        .from('vendor_earnings')
        .select('*')
        .eq('vendor_id', vendorData?.id)
        .order('created_at', { ascending: false });
      setEarnings(earningsData || []);

      // Calculate total earnings
      const total = earningsData?.reduce((sum, earning) => sum + Number(earning.net_amount), 0) || 0;
      setTotalEarnings(total);

      // Fetch availability
      const { data: availabilityData } = await supabase
        .from('vendor_availability')
        .select('*')
        .eq('vendor_id', vendorData?.id)
        .gte('date', new Date().toISOString().split('T')[0])
        .order('date', { ascending: true });
      setAvailability(availabilityData || []);
    } catch (error) {
      console.error('Error fetching vendor data:', error);
    }
  };

  const toggleOnlineStatus = async () => {
    try {
      const newStatus = !isOnline;
      const { error } = await supabase
        .from('vendors')
        .update({ is_online: newStatus })
        .eq('id', vendorProfile?.id);

      if (error) throw error;

      setIsOnline(newStatus);
      toast({
        title: "Status Updated",
        description: `You are now ${newStatus ? 'online' : 'offline'}`
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update status",
        variant: "destructive"
      });
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status })
        .eq('id', bookingId);

      if (error) throw error;

      toast({
        title: "Success",
        description: `Booking ${status} successfully`
      });

      fetchVendorData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update booking",
        variant: "destructive"
      });
    }
  };

  const addAvailability = async (date: string, isAvailable: boolean) => {
    try {
      const { error } = await supabase
        .from('vendor_availability')
        .upsert([
          {
            vendor_id: vendorProfile?.id,
            date,
            is_available: isAvailable,
            max_bookings: 1,
            current_bookings: 0
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Availability updated successfully"
      });

      fetchVendorData();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update availability",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  if (!vendorProfile) {
    return (
      <div className="min-h-screen bg-cream-50 pt-20 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-bold mb-4">Complete Your Vendor Profile</h2>
            <p className="text-charcoal-600 mb-4">
              You need to set up your vendor profile to access the dashboard.
            </p>
            <Button className="bg-coral-500 hover:bg-coral-600">
              Set Up Profile
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={vendorProfile?.portfolio_images?.[0]} />
              <AvatarFallback className="bg-coral-500 text-white text-xl">
                {vendorProfile?.business_name?.charAt(0) || 'V'}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold text-charcoal-900">
                  {vendorProfile?.business_name}
                </h1>
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`} />
                  <span className="text-sm text-charcoal-600">
                    {isOnline ? 'Online' : 'Offline'}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={toggleOnlineStatus}
                    className="ml-2"
                  >
                    {isOnline ? 'Go Offline' : 'Go Online'}
                  </Button>
                </div>
              </div>
              <p className="text-charcoal-600">{vendorProfile?.category}</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{vendorProfile?.rating || 0}</span>
                <Badge className={vendorProfile?.is_approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                  {vendorProfile?.is_approved ? 'Approved' : 'Pending Approval'}
                </Badge>
              </div>
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
                  <p className="text-2xl font-bold text-charcoal-900">₹{totalEarnings.toLocaleString()}</p>
                  <p className="text-sm text-charcoal-600">Total Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold text-charcoal-900">{vendorProfile?.rating || 0}</p>
                  <p className="text-sm text-charcoal-600">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold text-charcoal-900">0</p>
                  <p className="text-sm text-charcoal-600">Active Chats</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Bookings
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
                            <div className="space-x-2">
                              {booking.status === 'pending' && (
                                <>
                                  <Button 
                                    size="sm" 
                                    className="bg-green-600 hover:bg-green-700"
                                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                  >
                                    <Check className="h-4 w-4 mr-1" />
                                    Accept
                                  </Button>
                                  <Button 
                                    size="sm" 
                                    variant="outline"
                                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                  >
                                    <X className="h-4 w-4 mr-1" />
                                    Decline
                                  </Button>
                                </>
                              )}
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View Details
                              </Button>
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

          <TabsContent value="earnings" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Earnings History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {earnings.length === 0 ? (
                  <div className="text-center py-8">
                    <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-charcoal-600">No earnings yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {earnings.map((earning) => (
                      <Card key={earning.id} className="border-l-4 border-l-green-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-charcoal-900">
                              Booking Payment
                            </h3>
                            <Badge className={getStatusColor(earning.status)}>
                              {earning.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-charcoal-600">
                            <div>Amount: ₹{earning.amount?.toLocaleString()}</div>
                            <div>Commission: ₹{earning.commission_amount?.toLocaleString()}</div>
                            <div>Net Earnings: ₹{earning.net_amount?.toLocaleString()}</div>
                            <div>Date: {new Date(earning.payment_date).toLocaleDateString()}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calendar" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Availability Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-7 gap-2 mb-6">
                  {Array.from({ length: 7 }, (_, i) => {
                    const date = new Date();
                    date.setDate(date.getDate() + i);
                    const dateStr = date.toISOString().split('T')[0];
                    const isAvailable = availability.find(a => a.date === dateStr)?.is_available;
                    
                    return (
                      <Card key={i} className={`cursor-pointer transition-colors ${
                        isAvailable === false ? 'bg-red-100' : 
                        isAvailable === true ? 'bg-green-100' : 'bg-gray-50'
                      }`}>
                        <CardContent className="p-3 text-center">
                          <p className="text-sm font-medium">
                            {date.toLocaleDateString('en-US', { weekday: 'short' })}
                          </p>
                          <p className="text-xs text-charcoal-600">
                            {date.getDate()}
                          </p>
                          <div className="mt-2 space-y-1">
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full text-xs"
                              onClick={() => addAvailability(dateStr, true)}
                            >
                              Available
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full text-xs"
                              onClick={() => addAvailability(dateStr, false)}
                            >
                              Unavailable
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="portfolio" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5" />
                  Portfolio Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-charcoal-600 mb-4">Portfolio management coming soon!</p>
                  <Button className="bg-coral-500 hover:bg-coral-600">
                    Upload Images
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Customer Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-charcoal-600">No messages yet</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Business Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Name</label>
                    <input 
                      type="text" 
                      value={vendorProfile?.business_name || ''} 
                      className="w-full p-2 border rounded-md"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <input 
                      type="text" 
                      value={vendorProfile?.category || ''} 
                      className="w-full p-2 border rounded-md"
                      readOnly
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea 
                      value={vendorProfile?.description || ''} 
                      className="w-full p-2 border rounded-md h-24"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input 
                      type="text" 
                      value={vendorProfile?.location || ''} 
                      className="w-full p-2 border rounded-md"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range</label>
                    <input 
                      type="text" 
                      value={vendorProfile?.price_range || ''} 
                      className="w-full p-2 border rounded-md"
                      readOnly
                    />
                  </div>
                </div>
                <Button className="bg-coral-500 hover:bg-coral-600">
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

export default VendorDashboard;
