
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Star, Calendar, MessageCircle, Phone } from "lucide-react";

interface VendorDetailDialogProps {
  vendor: any;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onInitiateCall: (vendor: any) => void;
  profile: any;
}

export const VendorDetailDialog: React.FC<VendorDetailDialogProps> = ({
  vendor,
  open,
  onOpenChange,
  onInitiateCall,
  profile,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{vendor?.business_name}</DialogTitle>
        </DialogHeader>
        {vendor && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={vendor.portfolio_images?.[0]} />
                <AvatarFallback>{vendor.business_name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold">{vendor.business_name}</h3>
                <p className="text-charcoal-600">{vendor.category}</p>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                  <span>{vendor.rating || 0}</span>
                  <MapPin className="h-4 w-4 text-charcoal-400 ml-2" />
                  <span className="text-sm">{vendor.location}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-2">About</h4>
              <p className="text-charcoal-600">{vendor.description}</p>
            </div>

            <div>
              <h4 className="font-semibold mb-2">Services & Pricing</h4>
              <Badge className="bg-coral-100 text-coral-800">
                {vendor.price_range || 'Contact for pricing'}
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
              {vendor.contact_phone && (
                <Button 
                  variant="outline"
                  onClick={() => onInitiateCall(vendor)}
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
  );
};
