
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
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have questions about planning your event? We're here to help! 
            Get in touch with our event experts.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="Enter your phone number" />
                  </div>
                  
                  <div>
                    <Label htmlFor="eventDate">Event Date</Label>
                    <Input id="eventDate" type="date" />
                  </div>
                  
                  <div>
                    <Label htmlFor="budget">Budget Range</Label>
                    <select 
                      id="budget"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                    <Label htmlFor="message">Message</Label>
                    <textarea 
                      id="message"
                      rows={4}
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Tell us about your dream event..."
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-pink-500 hover:bg-pink-600 text-lg py-6">
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-pink-500" />
                    Visit Our Office
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    123 Event Street, Bandra West<br />
                    Mumbai, Maharashtra 400050<br />
                    India
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-6 w-6 text-pink-500" />
                    Call Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    +91 9876543210<br />
                    +91 8765432109
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-6 w-6 text-pink-500" />
                    Email Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    hello@aaroham.in<br />
                    support@aaroham.in
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-6 w-6 text-pink-500" />
                    Office Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground space-y-1">
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
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">Interactive Map Coming Soon</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
