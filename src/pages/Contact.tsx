
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, Send, MessageCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import ModernFooter from "@/components/ModernFooter";
import { SocialLinks } from "@/components/ui/social-links";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    eventDate: '',
    budget: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      eventDate: '',
      budget: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-maroon-900 to-maroon-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffd700" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 metallic-gold-bright font-cinzel">
            Get In Touch
          </h1>
          <p className="text-xl max-w-3xl mx-auto metallic-gold-subtle font-cormorant leading-relaxed">
            Ready to plan your dream event? We're here to help make your vision come to life. 
            Let's create something magical together.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-maroon-900 to-maroon-800 p-8">
                  <CardTitle className="text-2xl metallic-gold font-cinzel flex items-center gap-3">
                    <Send className="h-6 w-6" />
                    Send us a Message
                  </CardTitle>
                  <p className="text-gold-200 font-cormorant mt-2">We'll respond within 24 hours</p>
                </div>
                
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-maroon-900 font-cormorant font-semibold">First Name *</Label>
                        <Input 
                          id="firstName" 
                          name="firstName"
                          placeholder="Your first name" 
                          className="mt-2 border-gray-300 focus:border-gold-500 focus:ring-gold-500"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-maroon-900 font-cormorant font-semibold">Last Name *</Label>
                        <Input 
                          id="lastName" 
                          name="lastName"
                          placeholder="Your last name" 
                          className="mt-2 border-gray-300 focus:border-gold-500 focus:ring-gold-500"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="email" className="text-maroon-900 font-cormorant font-semibold">Email Address *</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          placeholder="your@email.com" 
                          className="mt-2 border-gray-300 focus:border-gold-500 focus:ring-gold-500"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-maroon-900 font-cormorant font-semibold">Phone Number *</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          type="tel" 
                          placeholder="+91 9876543210" 
                          className="mt-2 border-gray-300 focus:border-gold-500 focus:ring-gold-500"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="eventDate" className="text-maroon-900 font-cormorant font-semibold">Event Date</Label>
                        <Input 
                          id="eventDate" 
                          name="eventDate"
                          type="date" 
                          className="mt-2 border-gray-300 focus:border-gold-500 focus:ring-gold-500"
                          value={formData.eventDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <Label htmlFor="budget" className="text-maroon-900 font-cormorant font-semibold">Budget Range</Label>
                        <select 
                          id="budget"
                          name="budget"
                          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                          value={formData.budget}
                          onChange={handleInputChange}
                        >
                          <option value="">Select your budget</option>
                          <option value="under-5">Under ₹5 Lakhs</option>
                          <option value="5-10">₹5 - 10 Lakhs</option>
                          <option value="10-20">₹10 - 20 Lakhs</option>
                          <option value="20-50">₹20 - 50 Lakhs</option>
                          <option value="above-50">Above ₹50 Lakhs</option>
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="message" className="text-maroon-900 font-cormorant font-semibold">Tell us about your dream event *</Label>
                      <textarea 
                        id="message"
                        name="message"
                        rows={4}
                        className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                        placeholder="Describe your event vision, preferred venues, special requirements..."
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                    
                    <Button 
                      type="submit"
                      className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-maroon-900 font-cormorant font-semibold text-lg py-6 transform hover:scale-105 transition-all duration-300"
                    >
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              {/* Direct Contact */}
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-maroon-900 to-maroon-800 p-6">
                  <CardTitle className="flex items-center gap-2 metallic-gold font-cinzel">
                    <Phone className="h-6 w-6 text-gold-500" />
                    Get Immediate Help
                  </CardTitle>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-maroon-600" />
                      <div>
                        <p className="font-semibold text-maroon-900">Call us now</p>
                        <a href="tel:+919176988931" className="text-gold-600 font-cormorant hover:text-gold-700 transition-colors">
                          +91 9176988931
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MessageCircle className="h-5 w-5 text-maroon-600" />
                      <div>
                        <p className="font-semibold text-maroon-900">WhatsApp us</p>
                        <a href="https://wa.me/919176988931" className="text-gold-600 font-cormorant hover:text-gold-700 transition-colors">
                          Chat on WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Email Contact */}
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-maroon-900 to-maroon-800 p-6">
                  <CardTitle className="flex items-center gap-2 metallic-gold font-cinzel">
                    <Mail className="h-6 w-6 text-gold-500" />
                    Email Support
                  </CardTitle>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <p className="font-semibold text-maroon-900 mb-1">General Inquiries</p>
                    <a href="mailto:aaroham.net@gmail.com" className="text-gold-600 font-cormorant hover:text-gold-700 transition-colors">
                      aaroham.net@gmail.com
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold text-maroon-900 mb-1">Careers & Internships</p>
                    <a href="mailto:withaaroham@aaroham" className="text-gold-600 font-cormorant hover:text-gold-700 transition-colors">
                      withaaroham@aaroham
                    </a>
                  </div>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-maroon-900 to-maroon-800 p-6">
                  <CardTitle className="flex items-center gap-2 metallic-gold font-cinzel">
                    <Clock className="h-6 w-6 text-gold-500" />
                    Office Hours
                  </CardTitle>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-2 text-maroon-900 font-cormorant">
                    <p><strong>Monday - Saturday:</strong> 9:00 AM - 8:00 PM</p>
                    <p><strong>Sunday:</strong> 10:00 AM - 6:00 PM</p>
                    <p className="text-sm text-gray-600 pt-2">
                      *Emergency support available 24/7 for ongoing events
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="shadow-xl border-0 overflow-hidden">
                <div className="bg-gradient-to-r from-maroon-900 to-maroon-800 p-6">
                  <CardTitle className="flex items-center gap-2 metallic-gold font-cinzel">
                    <MessageCircle className="h-6 w-6 text-gold-500" />
                    Follow Our Journey
                  </CardTitle>
                </div>
                <CardContent className="p-6">
                  <SocialLinks variant="vertical" size="md" showLabels={true} />
                  <p className="text-sm text-gray-600 mt-4 font-cormorant">
                    Get daily inspiration and see our latest work on social media!
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <ModernFooter />
    </div>
  );
};

export default Contact;
