
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-maroon-900 to-maroon-950">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 metallic-gold-bright glitter-text font-cinzel">
            Contact Us
          </h1>
          <p className="text-xl max-w-3xl mx-auto metallic-gold-subtle font-cormorant">
            Have questions about planning your event? We're here to help! 
            Get in touch with our event experts.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4 bg-maroon-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card className="bg-maroon-800 border-gold-600">
                <CardHeader>
                  <CardTitle className="text-2xl metallic-gold font-cinzel">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="metallic-gold-subtle font-cormorant">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" className="bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="metallic-gold-subtle font-cormorant">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" className="bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="metallic-gold-subtle font-cormorant">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" className="bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="metallic-gold-subtle font-cormorant">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" className="bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300" />
                  </div>
                  
                  <div>
                    <Label htmlFor="eventDate" className="metallic-gold-subtle font-cormorant">Event Date</Label>
                    <Input id="eventDate" type="date" className="bg-maroon-700 border-gold-500 text-gold-200" />
                  </div>
                  
                  <div>
                    <Label htmlFor="budget" className="metallic-gold-subtle font-cormorant">Budget Range</Label>
                    <select 
                      id="budget"
                      className="flex h-10 w-full rounded-md border border-gold-500 bg-maroon-700 px-3 py-2 text-sm text-gold-200 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="">Select your budget range</option>
                      <option value="under-5">Under ₹5 Lakhs</option>
                      <option value="5-10">₹5 - 10 Lakhs</option>
                      <option value="10-20">₹10 - 20 Lakhs</option>
                      <option value="20-50">₹20 - 50 Lakhs</option>
                      <option value="above-50">Above ₹50 Lakhs</option>
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="metallic-gold-subtle font-cormorant">Message</Label>
                    <textarea 
                      id="message"
                      rows={4}
                      className="flex min-h-[80px] w-full rounded-md border border-gold-500 bg-maroon-700 px-3 py-2 text-sm text-gold-200 ring-offset-background placeholder:text-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about your dream event..."
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold text-lg py-6">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-maroon-800 border-gold-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 metallic-gold font-cinzel">
                    <MapPin className="h-6 w-6 text-gold-500" />
                    Visit Our Office
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="metallic-gold-subtle font-cormorant">
                    123 Event Street, Bandra West<br />
                    Mumbai, Maharashtra 400050<br />
                    India
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-maroon-800 border-gold-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 metallic-gold font-cinzel">
                    <Phone className="h-6 w-6 text-gold-500" />
                    Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="metallic-gold-subtle font-cormorant">
                    +91 9876543210<br />
                    +91 8765432109
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-maroon-800 border-gold-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 metallic-gold font-cinzel">
                    <Mail className="h-6 w-6 text-gold-500" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="metallic-gold-subtle font-cormorant">
                    hello@aaroham.in<br />
                    support@aaroham.in
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-maroon-800 border-gold-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 metallic-gold font-cinzel">
                    <Clock className="h-6 w-6 text-gold-500" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="metallic-gold-subtle font-cormorant space-y-1">
                    <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
                    <p>Sunday: Closed</p>
                    <p className="text-sm pt-2">
                      *Emergency support available 24/7 for ongoing events
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 px-4 bg-maroon-950">
        <div className="max-w-7xl mx-auto">
          <div className="aspect-video bg-maroon-800 border border-gold-600 rounded-lg flex items-center justify-center">
            <p className="metallic-gold-subtle font-cormorant text-lg">Interactive Map Coming Soon</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
