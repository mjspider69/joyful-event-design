
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Heart, Phone, Eye } from "lucide-react";

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
    <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        {vendor.portfolio_images && vendor.portfolio_images.length > 0 ? (
          <img
            src={vendor.portfolio_images[0]}
            alt={vendor.business_name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-cream-100 to-sage-100 flex items-center justify-center">
            <span className="text-charcoal-400 text-lg font-medium">
              {vendor.business_name.charAt(0)}
            </span>
          </div>
        )}
        
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onSaveVendor(vendor.id)}
            className="bg-white/90 hover:bg-white text-charcoal-600 hover:text-coral-600"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        {vendor.is_online && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-green-500 text-white">Online</Badge>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-charcoal-900 mb-1 line-clamp-1">
              {vendor.business_name}
            </h3>
            <Badge variant="outline" className="text-coral-600 border-coral-200 mb-2">
              {vendor.category}
            </Badge>
          </div>
          
          <Avatar className="h-12 w-12 ml-3">
            <AvatarImage src={vendor.portfolio_images?.[0]} />
            <AvatarFallback className="bg-coral-100 text-coral-700">
              {vendor.business_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="flex items-center gap-4 text-sm text-charcoal-600 mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4 text-coral-500" />
            <span className="line-clamp-1">{vendor.location}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span>{vendor.rating || 0}</span>
          </div>
        </div>

        {vendor.description && (
          <p className="text-sm text-charcoal-600 mb-4 line-clamp-2">
            {vendor.description}
          </p>
        )}

        <div className="mb-4">
          <Badge className="bg-sage-100 text-sage-800">
            {vendor.price_range || 'Contact for pricing'}
          </Badge>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onVendorClick(vendor)}
            className="flex-1 border-coral-200 text-coral-600 hover:bg-coral-50"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Button>
          
          {vendor.contact_phone && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onInitiateCall(vendor)}
              className="border-sage-200 text-sage-600 hover:bg-sage-50"
            >
              <Phone className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
