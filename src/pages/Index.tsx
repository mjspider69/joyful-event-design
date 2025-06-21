
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Calendar, Users, Camera, MapPin, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="absolute inset-0 bg-black/20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
          }}
        ></div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Your Dream Event
            <span className="block text-pink-300">Starts Here</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Plan your perfect event with India's most trusted event planning platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-6 text-lg">
              Start Planning
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-pink-500 px-8 py-6 text-lg">
              Browse Vendors
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Event Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for your perfect event, all in one place
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Camera className="h-12 w-12 text-pink-500 mb-2" />
                <CardTitle>Event Photography</CardTitle>
                <CardDescription>
                  Capture your special moments with professional photographers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View Photographers</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <MapPin className="h-12 w-12 text-pink-500 mb-2" />
                <CardTitle>Event Venues</CardTitle>
                <CardDescription>
                  Find the perfect venue for your dream event celebration
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Browse Venues</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Heart className="h-12 w-12 text-pink-500 mb-2" />
                <CardTitle>Event Planners</CardTitle>
                <CardDescription>
                  Professional planners to make your event stress-free
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Find Planners</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-pink-500 mb-2" />
                <CardTitle>Catering Services</CardTitle>
                <CardDescription>
                  Delicious food and beverages for your event guests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">View Caterers</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calendar className="h-12 w-12 text-pink-500 mb-2" />
                <CardTitle>Event Planning</CardTitle>
                <CardDescription>
                  Complete event planning tools and checklists
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Start Planning</Button>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <Star className="h-12 w-12 text-pink-500 mb-2" />
                <CardTitle>Decoration Services</CardTitle>
                <CardDescription>
                  Professional decoration services for your special event
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">Find Decorators</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Vendors Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Vendors</h2>
            <p className="text-lg text-muted-foreground">
              Top-rated event vendors trusted by thousands of clients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 rounded-t-lg"></div>
                <CardHeader>
                  <CardTitle className="text-lg">Event Vendor {i}</CardTitle>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <span className="text-sm text-muted-foreground ml-1">4.9</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Professional event services with years of experience
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-pink-500 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Plan Your Dream Event?</h2>
          <p className="text-xl mb-8">
            Join thousands of clients who have planned their perfect events with us
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-6 text-lg">
              Get Started Today
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-pink-500 px-8 py-6 text-lg">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
