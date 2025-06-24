
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MessageCircle, DollarSign, Star, Settings, Bell, Users, TrendingUp } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface VendorDashboardProps {
  user?: any;
}

const VendorDashboard: React.FC<VendorDashboardProps> = ({ user }) => {
  const [profile, setProfile] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [earnings, setEarnings] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchBookings();
      fetchEarnings();
      fetchReviews();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('vendors')
      .select('*')
      .eq('user_id', user.id)
      .single();
    setProfile(data);
  };

  const fetchBookings = async () => {
    const { data } = await supabase
      .from('bookings')
      .select('*')
      .eq('vendor_id', user.id)
      .order('created_at', { ascending: false });
    setBookings(data || []);
  };

  const fetchEarnings = async () => {
    const { data } = await supabase
      .from('payments')
      .select('amount')
      .eq('vendor_id', user.id)
      .eq('payment_status', 'completed');
    
    const total = data?.reduce((sum, payment) => sum + Number(payment.amount), 0) || 0;
    setEarnings(total);
  };

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('vendor_reviews')
      .select('*')
      .eq('vendor_id', profile?.id)
      .order('created_at', { ascending: false });
    setReviews(data || []);
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

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile?.portfolio_images?.[0]} />
              <AvatarFallback className="bg-maroon-900 text-gold-400 text-xl">
                {profile?.business_name?.charAt(0) || 'V'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {profile?.business_name || 'Vendor Dashboard'}
              </h1>
              <p className="text-gray-600">{profile?.category}</p>
              <div className="flex items-center gap-2 mt-1">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium">{averageRating.toFixed(1)}</span>
                <span className="text-sm text-gray-500">({reviews.length} reviews)</span>
              </div>
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
                  <p className="text-2xl font-bold">₹{earnings.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Star className="h-8 w-8 text-yellow-600" />
                <div>
                  <p className="text-2xl font-bold">{averageRating.toFixed(1)}</p>
                  <p className="text-sm text-gray-600">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <p className="text-2xl font-bold">{reviews.length}</p>
                  <p className="text-sm text-gray-600">Reviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <Card>
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
                    <p className="text-gray-600">No bookings yet</p>
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
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                            <div>Event Date: {new Date(booking.event_date).toLocaleDateString()}</div>
                            <div>Guests: {booking.guest_count}</div>
                            <div>Location: {booking.event_location}</div>
                            <div>Budget: ₹{booking.budget?.toLocaleString()}</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-bold text-maroon-900">
                              ₹{booking.total_amount?.toLocaleString()}
                            </span>
                            <div className="space-x-2">
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                              <Button size="sm" className="bg-maroon-900 hover:bg-maroon-800">
                                Message Customer
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

          <TabsContent value="calendar" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  My Calendar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Calendar view coming soon!</p>
                  <p className="text-sm text-gray-500">Manage your availability and bookings</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Customer Messages
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No messages yet</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Customer Reviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.length === 0 ? (
                  <div className="text-center py-8">
                    <Star className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No reviews yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(review.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-gray-700">{review.review_text}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-4">
            <Card>
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
                      defaultValue={profile?.business_name} 
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <input 
                      type="text" 
                      defaultValue={profile?.category} 
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea 
                      defaultValue={profile?.description} 
                      className="w-full p-2 border rounded-md h-24"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Location</label>
                    <input 
                      type="text" 
                      defaultValue={profile?.location} 
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Price Range</label>
                    <input 
                      type="text" 
                      defaultValue={profile?.price_range} 
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

export default VendorDashboard;
