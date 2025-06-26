
import React, { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { CulturalBackdrop } from "@/components/CulturalBackdrop";
import { VendorFilters } from "@/components/VendorFilters";
import { VendorCard } from "@/components/VendorCard";
import { LoginDialog } from "@/components/LoginDialog";
import { VendorDetailDialog } from "@/components/VendorDetailDialog";

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
        <VendorFilters
          searchQuery={searchQuery}
          selectedCategory={selectedCategory}
          selectedLocation={selectedLocation}
          onSearchChange={setSearchQuery}
          onCategoryChange={setSelectedCategory}
          onLocationChange={setSelectedLocation}
        />

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
              <VendorCard
                key={vendor.id}
                vendor={vendor}
                onVendorClick={handleVendorClick}
                onSaveVendor={saveVendor}
                onInitiateCall={initiateCall}
              />
            ))}
          </div>
        )}

        {/* Login Dialog */}
        <LoginDialog 
          open={showLoginDialog} 
          onOpenChange={setShowLoginDialog} 
        />

        {/* Vendor Detail Dialog */}
        <VendorDetailDialog
          vendor={selectedVendor}
          open={!!selectedVendor}
          onOpenChange={() => setSelectedVendor(null)}
          onInitiateCall={initiateCall}
          profile={profile}
        />
      </div>
    </div>
  );
};

export default Vendors;
