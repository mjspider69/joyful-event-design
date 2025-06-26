
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, Heart, Phone, Mail } from "lucide-react";

interface VendorCardProps {
  vendor: any;
  onVendorClick: (vendor: any) => void;
  onSaveVendor: (vendorId: string) => void;
  onInitiateCall: (vendor: any) => void;
}

export const VendorCard: React.FC<VendorCardProps> = ({
  vendor,
  onVendorClick,
  onSaveVendor,
  onInitiateCall,
}) => {
  return (
    <Card 
      className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
      onClick={() => onVendorClick(vendor)}
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
                onSaveVendor(vendor.id);
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
                    onInitiateCall(vendor);
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
  );
};
