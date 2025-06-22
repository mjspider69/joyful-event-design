
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, Clock, MapPin, CreditCard, User, Mail, Phone } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Booking = () => {
  const [selectedService, setSelectedService] = useState('');
  const [bookingData, setBookingData] = useState({
    eventType: '',
    eventDate: '',
    eventTime: '',
    venue: '',
    guestCount: '',
    budget: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    specialRequests: ''
  });

  const services = [
    { id: 'photography', name: 'Event Photography', price: '₹50,000 - ₹1,50,000' },
    { id: 'venue', name: 'Event Venue', price: '₹2,00,000 - ₹5,00,000' },
    { id: 'catering', name: 'Catering Services', price: '₹800 - ₹1,500 per plate' },
    { id: 'decoration', name: 'Decoration Services', price: '₹25,000 - ₹75,000' },
    { id: 'planning', name: 'Event Planning', price: '₹1,00,000 - ₹3,00,000' },
    { id: 'entertainment', name: 'Entertainment', price: '₹30,000 - ₹80,000' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking submitted:', { selectedService, ...bookingData });
    // Handle booking submission and payment processing
  };

  const proceedToPayment = () => {
    console.log('Proceeding to payment...');
    // Integrate with payment gateway
  };

  return (
    <div className="min-h-screen bg-maroon-900">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center metallic-gold-bright glitter-text font-cinzel">
            Book Your Event
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Service Selection */}
            <Card className="bg-maroon-800 border-gold-600">
              <CardHeader>
                <CardTitle className="text-xl metallic-gold font-cinzel">Select Service</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedService === service.id
                          ? 'border-gold-400 bg-maroon-700'
                          : 'border-gold-600 hover:border-gold-500'
                      }`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <h3 className="font-semibold metallic-gold font-cormorant">{service.name}</h3>
                      <p className="text-sm text-green-400 font-cormorant">{service.price}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Booking Form */}
            <Card className="bg-maroon-800 border-gold-600">
              <CardHeader>
                <CardTitle className="text-xl metallic-gold font-cinzel">Event Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="text-sm font-medium metallic-gold-subtle font-cormorant">Event Type</Label>
                    <Input
                      name="eventType"
                      placeholder="Birthday, Corporate, Anniversary..."
                      className="bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300"
                      value={bookingData.eventType}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium metallic-gold-subtle font-cormorant">Event Date</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gold-400" />
                        <Input
                          name="eventDate"
                          type="date"
                          className="pl-10 bg-maroon-700 border-gold-500 text-gold-200"
                          value={bookingData.eventDate}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium metallic-gold-subtle font-cormorant">Event Time</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gold-400" />
                        <Input
                          name="eventTime"
                          type="time"
                          className="pl-10 bg-maroon-700 border-gold-500 text-gold-200"
                          value={bookingData.eventTime}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium metallic-gold-subtle font-cormorant">Venue</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gold-400" />
                      <Input
                        name="venue"
                        placeholder="Event venue address"
                        className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300"
                        value={bookingData.venue}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium metallic-gold-subtle font-cormorant">Guest Count</Label>
                      <Input
                        name="guestCount"
                        placeholder="Number of guests"
                        className="bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300"
                        value={bookingData.guestCount}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium metallic-gold-subtle font-cormorant">Budget Range</Label>
                      <Input
                        name="budget"
                        placeholder="₹50,000 - ₹1,00,000"
                        className="bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300"
                        value={bookingData.budget}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Customer Information */}
          <Card className="mt-8 bg-maroon-800 border-gold-600">
            <CardHeader>
              <CardTitle className="text-xl metallic-gold font-cinzel">Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium metallic-gold-subtle font-cormorant">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gold-400" />
                    <Input
                      name="customerName"
                      placeholder="Your full name"
                      className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300"
                      value={bookingData.customerName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium metallic-gold-subtle font-cormorant">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gold-400" />
                    <Input
                      name="customerEmail"
                      type="email"
                      placeholder="your@email.com"
                      className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300"
                      value={bookingData.customerEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium metallic-gold-subtle font-cormorant">Phone</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gold-400" />
                    <Input
                      name="customerPhone"
                      placeholder="+91 9876543210"
                      className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300"
                      value={bookingData.customerPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Section */}
          <Card className="mt-8 bg-maroon-800 border-gold-600">
            <CardHeader>
              <CardTitle className="text-xl metallic-gold font-cinzel flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment & Confirmation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-maroon-700 rounded-lg border border-gold-600">
                  <h3 className="font-semibold metallic-gold font-cormorant mb-2">Booking Summary</h3>
                  <div className="space-y-2 text-sm metallic-gold-subtle font-cormorant">
                    <p>Service: {selectedService || 'Not selected'}</p>
                    <p>Event Date: {bookingData.eventDate || 'Not specified'}</p>
                    <p>Guest Count: {bookingData.guestCount || 'Not specified'}</p>
                    <p>Budget: {bookingData.budget || 'Not specified'}</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={proceedToPayment}
                    className="flex-1 bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold"
                    disabled={!selectedService}
                  >
                    Pay Advance & Book
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant"
                  >
                    Request Quote
                  </Button>
                </div>
                
                <p className="text-xs metallic-gold-subtle font-cormorant text-center">
                  Secure payment processing • 100% refund if cancelled 48hrs before event
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Booking;
