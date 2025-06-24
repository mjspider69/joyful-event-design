
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageCircle, Heart, FileText, Settings, Bell, Star, MapPin, Phone, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CustomerDashboardProps {
  user?: any;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ user }) => {
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [quotations, setQuotations] = useState<any[]>([]);
  const [savedVendors, setSavedVendors] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchBookings();
      fetchQuotations();
      fetchNotifications();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    setProfile(data);
  };

  const fetchBookings = async () => {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('customer_id', user.id)
      .order('created_at', { ascending: false });
    setBookings(data || []);
  };

  const fetchQuotations = async () => {
    const { data } = await supabase
      .from('quotations')
      .select('*')
      .eq('customer_id', user.id)
      .order('created_at', { ascending: false });
    setQuotations(data || []);
  };

  const fetchNotifications = async () => {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5);
    setNotifications(data || []);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-maroon-900 text-gold-400 text-xl">
                {profile?.full_name?.charAt(0) || 'C'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile?.full_name || 'Customer'}!</h1>
              <p className="text-gray-600">Plan your perfect wedding with us</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-maroon-600" />
                <div>
                  <p className="text-2xl font-bold">{bookings.length}</p>
                  <p className="text-sm text-gray-600">Active Bookings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{quotations.length}</p>
                  <p className="text-sm text-gray-600">Quotations</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Heart className="h-8 w-8 text-red-600" />
                <div>
                  <p className="text-2xl font-bold">{savedVendors.length}</p>
                  <p className="text-sm text-gray-600">Saved Vendors</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <MessageCircle className="h-8 w-8 text-green-600" />
                <div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-gray-600">Active Chats</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="quotations">Quotations</TabsTrigger>
            <TabsTrigger value="vendors">Saved Vendors</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
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
                    <p className="text-gray-600">No bookings yet</p>
                    <Button className="mt-4 bg-maroon-900 hover:bg-maroon-800">
                      Create Your First Booking
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id} className="border-l-4 border-l-maroon-500">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{booking.event_type}</h3>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              {new Date(booking.event_date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4" />
                              {booking.event_location}
                            </div>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-lg font-bold text-maroon-900">
                              ₹{booking.total_amount?.toLocaleString()}
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

          <TabsContent value="quotations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  My Quotations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {quotations.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No quotations yet</p>
                    <Button className="mt-4 bg-maroon-900 hover:bg-maroon-800">
                      Request a Quote
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {quotations.map((quote) => (
                      <Card key={quote.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{quote.event_type}</h3>
                            <Badge className={getStatusColor(quote.status)}>
                              {quote.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{quote.requirements}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-maroon-900">
                              ₹{quote.total_amount?.toLocaleString()}
                            </span>
                            <Button variant="outline" size="sm">
                              View Quote
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Saved Vendors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No saved vendors yet</p>
                  <Button className="mt-4 bg-maroon-900 hover:bg-maroon-800">
                    Browse Vendors
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No messages yet</p>
                  <Button className="mt-4 bg-maroon-900 hover:bg-maroon-800">
                    Start a Conversation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
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
                      defaultValue={profile?.full_name} 
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input 
                      type="tel" 
                      defaultValue={profile?.phone} 
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <input 
                      type="text" 
                      defaultValue={profile?.city} 
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <Button className="bg-maroon-900 hover:bg-maroon-800">
                  Save Changes
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
