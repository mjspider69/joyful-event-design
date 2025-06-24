
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, DollarSign, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdvancedBookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdvancedBookingFlow: React.FC<AdvancedBookingFlowProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [vendors, setVendors] = useState<any[]>([]);
  const [selectedVendors, setSelectedVendors] = useState<any[]>([]);
  const [bookingData, setBookingData] = useState({
    eventType: '',
    eventDate: '',
    eventLocation: '',
    guestCount: '',
    budget: '',
    requirements: '',
    totalAmount: 0
  });
  const { toast } = useToast();

  const steps = [
    { id: 1, title: 'Event Details', icon: Calendar },
    { id: 2, title: 'Select Vendors', icon: Users },
    { id: 3, title: 'Requirements', icon: MapPin },
    { id: 4, title: 'Review & Confirm', icon: Check }
  ];

  useEffect(() => {
    if (isOpen && currentStep === 2) {
      fetchVendors();
    }
  }, [isOpen, currentStep]);

  const fetchVendors = async () => {
    const { data } = await supabase
      .from('vendors')
      .select('*')
      .eq('status', 'approved')
      .order('rating', { ascending: false });
    setVendors(data || []);
  };

  const handleVendorToggle = (vendor: any) => {
    setSelectedVendors(prev => {
      const exists = prev.find(v => v.id === vendor.id);
      if (exists) {
        return prev.filter(v => v.id !== vendor.id);
      } else {
        return [...prev, vendor];
      }
    });
  };

  const calculateTotal = () => {
    // Simple calculation - in real app, this would be more sophisticated
    const baseAmount = selectedVendors.length * 50000; // Base amount per vendor
    const budgetMultiplier = bookingData.budget ? parseFloat(bookingData.budget) / 100000 : 1;
    return Math.round(baseAmount * budgetMultiplier);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      if (currentStep === 3) {
        setBookingData(prev => ({ ...prev, totalAmount: calculateTotal() }));
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please login to create a booking",
          variant: "destructive"
        });
        return;
      }

      const { error } = await supabase.from('bookings').insert({
        customer_id: user.id,
        event_type: bookingData.eventType,
        event_date: bookingData.eventDate,
        event_location: bookingData.eventLocation,
        guest_count: parseInt(bookingData.guestCount),
        budget: parseFloat(bookingData.budget),
        requirements: bookingData.requirements,
        total_amount: bookingData.totalAmount,
        status: 'pending'
      });

      if (error) throw error;

      toast({
        title: "Booking Created!",
        description: "Your booking has been submitted successfully",
      });

      onClose();
      setCurrentStep(1);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create booking",
        variant: "destructive"
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-auto">
        <CardHeader className="bg-maroon-900 text-white">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Create Your Perfect Wedding</CardTitle>
            <Button variant="ghost" onClick={onClose} className="text-white hover:bg-maroon-800">
              ×
            </Button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex justify-between mt-6">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id 
                      ? 'bg-gold-500 border-gold-500' 
                      : 'border-gold-400 text-gold-400'
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="ml-2 text-sm font-medium hidden md:block">{step.title}</span>
                  {step.id < steps.length && (
                    <ArrowRight className="h-4 w-4 ml-4 text-gold-400 hidden md:block" />
                  )}
                </div>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Step 1: Event Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Tell us about your event</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Event Type</label>
                  <select 
                    className="w-full p-3 border rounded-lg"
                    value={bookingData.eventType}
                    onChange={(e) => setBookingData(prev => ({ ...prev, eventType: e.target.value }))}
                  >
                    <option value="">Select event type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Pre-Wedding">Pre-Wedding</option>
                    <option value="Engagement">Engagement</option>
                    <option value="Reception">Reception</option>
                    <option value="Mehendi">Mehendi</option>
                    <option value="Sangam">Sangam</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Event Date</label>
                  <Input
                    type="date"
                    value={bookingData.eventDate}
                    onChange={(e) => setBookingData(prev => ({ ...prev, eventDate: e.target.value }))}
                    className="p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Event Location</label>
                  <Input
                    placeholder="Enter venue or city"
                    value={bookingData.eventLocation}
                    onChange={(e) => setBookingData(prev =>({ ...prev, eventLocation: e.target.value }))}
                    className="p-3"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Number of Guests</label>
                  <Input
                    type="number"
                    placeholder="e.g. 150"
                    value={bookingData.guestCount}
                    onChange={(e) => setBookingData(prev => ({ ...prev, guestCount: e.target.value }))}
                    className="p-3"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-2">Budget Range</label>
                  <select 
                    className="w-full p-3 border rounded-lg"
                    value={bookingData.budget}
                    onChange={(e) => setBookingData(prev => ({ ...prev, budget: e.target.value }))}
                  >
                    <option value="">Select budget range</option>
                    <option value="50000">₹50,000 - ₹1,00,000</option>
                    <option value="100000">₹1,00,000 - ₹2,00,000</option>
                    <option value="200000">₹2,00,000 - ₹5,00,000</option>
                    <option value="500000">₹5,00,000 - ₹10,00,000</option>
                    <option value="1000000">₹10,00,000+</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Select Vendors */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Choose your vendors</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {vendors.map((vendor) => (
                  <Card 
                    key={vendor.id} 
                    className={`cursor-pointer transition-all ${
                      selectedVendors.find(v => v.id === vendor.id) 
                        ? 'ring-2 ring-maroon-500 bg-maroon-50' 
                        : 'hover:shadow-md'
                    }`}
                    onClick={() => handleVendorToggle(vendor)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{vendor.business_name}</h4>
                        {selectedVendors.find(v => v.id === vendor.id) && (
                          <Check className="h-5 w-5 text-maroon-600" />
                        )}
                      </div>
                      <Badge variant="outline" className="mb-2">{vendor.category}</Badge>
                      <p className="text-sm text-gray-600 mb-2">{vendor.location}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{vendor.price_range}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-sm">⭐</span>
                          <span className="text-sm">{vendor.rating}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {selectedVendors.length > 0 && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Selected Vendors ({selectedVendors.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedVendors.map((vendor) => (
                      <Badge key={vendor.id} variant="secondary">
                        {vendor.business_name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Requirements */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Special requirements</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">
                  Describe your vision and any special requirements
                </label>
                <Textarea
                  placeholder="Tell us about your dream wedding, specific decorations, food preferences, special arrangements, etc."
                  value={bookingData.requirements}
                  onChange={(e) => setBookingData(prev => ({ ...prev, requirements: e.target.value }))}
                  className="min-h-32"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 Tips for better planning:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Mention any religious or cultural preferences</li>
                  <li>• Include dietary restrictions for catering</li>
                  <li>• Specify photography style preferences</li>
                  <li>• Note any accessibility requirements</li>
                </ul>
              </div>
            </div>
          )}

          {/* Step 4: Review & Confirm */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold mb-4">Review your booking</h3>
              
              <div className="space-y-4">
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Event Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div><strong>Type:</strong> {bookingData.eventType}</div>
                      <div><strong>Date:</strong> {new Date(bookingData.eventDate).toLocaleDateString()}</div>
                      <div><strong>Location:</strong> {bookingData.eventLocation}</div>
                      <div><strong>Guests:</strong> {bookingData.guestCount}</div>
                      <div><strong>Budget:</strong> ₹{parseInt(bookingData.budget).toLocaleString()}</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-medium mb-3">Selected Vendors ({selectedVendors.length})</h4>
                    <div className="space-y-2">
                      {selectedVendors.map((vendor) => (
                        <div key={vendor.id} className="flex justify-between items-center">
                          <span>{vendor.business_name}</span>
                          <Badge variant="outline">{vendor.category}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {bookingData.requirements && (
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Special Requirements</h4>
                      <p className="text-sm text-gray-600">{bookingData.requirements}</p>
                    </CardContent>
                  </Card>
                )}

                <Card className="border-maroon-200 bg-maroon-50">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="text-lg font-semibold">Estimated Total</h4>
                      <span className="text-2xl font-bold text-maroon-900">
                        ₹{calculateTotal().toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      *Final amount may vary based on vendor quotes and customizations
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            {currentStep < 4 ? (
              <Button
                onClick={handleNext}
                className="bg-maroon-900 hover:bg-maroon-800"
                disabled={
                  (currentStep === 1 && (!bookingData.eventType || !bookingData.eventDate || !bookingData.eventLocation)) ||
                  (currentStep === 2 && selectedVendors.length === 0)
                }
              >
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-maroon-900 hover:bg-maroon-800"
              >
                Confirm Booking
                <Check className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdvancedBookingFlow;
