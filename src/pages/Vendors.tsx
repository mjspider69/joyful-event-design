
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Star, Heart, Phone, Mail, Filter, Calendar } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { CulturalBackdrop } from "@/components/CulturalBackdrop";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Vendors: React.FC = () => {
  const [vendors, setVendors] = useState<any[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<any>(null);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const categories = [
    'all', 'Photographers', 'Decorators', 'Caterers', 'Musicians', 'Priests', 'Makeup Artists', 'Venues', 'Transport'
  ];

  const locations = [
    'all', 'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Kochi'
  ];

  useEffect(() => {
    fetchVendors();
  }, []);

  useEffect(() => {
    filterVendors();
  }, [vendors, searchQuery, selectedCategory, selectedLocation]);

  const fetchVendors = async () => {
    try {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .eq('is_approved', true)
        .eq('is_online', true)
        .order('rating', { ascending: false });

      if (error) throw error;
      
      setVendors(data || []);
      setFilteredVendors(data || []);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterVendors = () => {
    let filtered = [...vendors];

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(vendor =>
        vendor.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.location?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(vendor => 
        vendor.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by location
    if (selectedLocation !== 'all') {
      filtered = filtered.filter(vendor => 
        vendor.location?.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    setFilteredVendors(filtered);
  };

  const handleVendorClick = async (vendor: any) => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    // Check if user has used their first call
    if (!profile?.first_call_used) {
      // Mark first call as used
      await supabase
        .from('profiles')
        .update({ first_call_used: true })
        .eq('id', user.id);
    }

    setSelectedVendor(vendor);
  };

  const saveVendor = async (vendorId: string) => {
    if (!user) {
      setShowLoginDialog(true);
      return;
    }

    try {
      const { error } = await supabase
        .from('saved_vendors')
        .insert([
          {
            customer_id: user.id,
            vendor_id: vendorId
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Vendor saved to your favorites"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save vendor",
        variant: "destructive"
      });
    }
  };

  const initiateCall = (vendor: any) => {
    if (profile?.first_call_used) {
      toast({
        title: "First Call Used",
        description: "You've used your free call. Please chat or book to continue.",
        variant: "destructive"
      });
      return;
    }

    if (vendor.contact_phone) {
      window.open(`tel:${vendor.contact_phone}`, '_self');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cream-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-coral-500 mx-auto mb-4"></div>
          <p className="text-charcoal-600">Loading vendors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-20">
      {/* Cultural Backdrop Header */}
      <CulturalBackdrop 
        location={selectedLocation === 'all' ? 'India' : selectedLocation}
        className="h-64 flex items-center justify-center"
      >
        <div className="text-center text-white z-10 relative">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect Vendor</h1>
          <p className="text-xl md:text-2xl">
            Discover talented professionals for your special day
          </p>
        </div>
      </CulturalBackdrop>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters */}
        <Card className="mb-8 bg-white shadow-lg">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-charcoal-400" />
                <Input
                  placeholder="Search vendors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(location => (
                    <SelectItem key={location} value={location}>
                      {location === 'all' ? 'All Locations' : location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button className="bg-coral-500 hover:bg-coral-600 w-full">
                <Filter className="h-4 w-4 mr-2" />
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-charcoal-600">
            Showing {filteredVendors.length} vendor{filteredVendors.length !== 1 ? 's' : ''} 
            {selectedLocation !== 'all' && ` in ${selectedLocation}`}
            {selectedCategory !== 'all' && ` for ${selectedCategory}`}
          </p>
        </div>

        {/* Vendors Grid */}
        {filteredVendors.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-charcoal-900 mb-2">No vendors found</h3>
            <p className="text-charcoal-600">Try adjusting your search criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVendors.map((vendor) => (
              <Card 
                key={vendor.id} 
                className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                onClick={() => handleVendorClick(vendor)}
              >
                <CardContent className="p-0">
                  {/* Vendor Image */}
                  <div className="relative h-48 bg-gradient-to-r from-coral-100 to-sage-100">
                    {vendor.portfolio_images && vendor.portfolio_images.length > 0 ? (
                      <img 
                        src={vendor.portfolio_images[0]} 
                        alt={vendor.business_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl">📸</span>
                      </div>
                    )}
                    <div className="absolute top-3 right-3">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/90 hover:bg-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          saveVendor(vendor.id);
                        }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Vendor Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg text-charcoal-900">{vendor.business_name}</h3>
                        <p className="text-sm text-charcoal-600">{vendor.category}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium">{vendor.rating || 0}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 mb-2">
                      <MapPin className="h-4 w-4 text-charcoal-400" />
                      <span className="text-sm text-charcoal-600">{vendor.location || 'Location not specified'}</span>
                    </div>

                    <p className="text-sm text-charcoal-600 mb-3 line-clamp-2">
                      {vendor.description || 'Professional service provider for your special occasions.'}
                    </p>

                    <div className="flex items-center justify-between">
                      <Badge className="bg-coral-100 text-coral-800">
                        {vendor.price_range || 'Contact for pricing'}
                      </Badge>
                      <div className="flex gap-2">
                        {vendor.contact_phone && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              initiateCall(vendor);
                            }}
                          >
                            <Phone className="h-4 w-4" />
                          </Button>
                        )}
                        {vendor.contact_email && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`mailto:${vendor.contact_email}`, '_blank');
                            }}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Login Dialog */}
        <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Login Required</DialogTitle>
            </DialogHeader>
            <div className="text-center py-6">
              <p className="text-charcoal-600 mb-4">
                Please log in to view full vendor details and contact options.
              </p>
              <div className="flex gap-3 justify-center">
                <Button 
                  onClick={() => {
                    setShowLoginDialog(false);
                    window.location.href = '/customer-login';
                  }}
                  className="bg-coral-500 hover:bg-coral-600"
                >
                  Login as Customer
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowLoginDialog(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Vendor Detail Dialog */}
        <Dialog open={!!selectedVendor} onOpenChange={() => setSelectedVendor(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedVendor?.business_name}</DialogTitle>
            </DialogHeader>
            {selectedVendor && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={selectedVendor.portfolio_images?.[0]} />
                    <AvatarFallback>{selectedVendor.business_name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-lg font-bold">{selectedVendor.business_name}</h3>
                    <p className="text-charcoal-600">{selectedVendor.category}</p>
                    <div className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500 fill-current" />
                      <span>{selectedVendor.rating || 0}</span>
                      <MapPin className="h-4 w-4 text-charcoal-400 ml-2" />
                      <span className="text-sm">{selectedVendor.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">About</h4>
                  <p className="text-charcoal-600">{selectedVendor.description}</p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Services & Pricing</h4>
                  <Badge className="bg-coral-100 text-coral-800">
                    {selectedVendor.price_range || 'Contact for pricing'}
                  </Badge>
                </div>

                <div className="flex gap-3">
                  <Button className="bg-coral-500 hover:bg-coral-600 flex-1">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat
                  </Button>
                  {selectedVendor.contact_phone && (
                    <Button 
                      variant="outline"
                      onClick={() => initiateCall(selectedVendor)}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {profile?.first_call_used ? 'Used' : 'Free Call'}
                    </Button>
                  )}
                </div>

                {profile?.first_call_used && (
                  <div className="text-center py-2 px-4 bg-yellow-50 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      You've used your free call. Chat or book to continue engaging with vendors.
                    </p>
                  </div>
                )}
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Vendors;
