import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star, MapPin, Phone, Mail, Search, Filter } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Vendors = () => {
  const vendors = [
    {
      name: "Elegant Moments Photography",
      category: "Photography",
      location: "Mumbai, Maharashtra",
      rating: 4.9,
      reviews: 125,
      price: "₹50,000 - ₹1,50,000",
      image: "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Royal Palace Banquet",
      category: "Venue",
      location: "Delhi, Delhi",
      rating: 4.8,
      reviews: 89,
      price: "₹2,00,000 - ₹5,00,000",
      image: "https://images.unsplash.com/photo-1519167758481-83f29c8ea79d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Gourmet Catering Co.",
      category: "Catering",
      location: "Bangalore, Karnataka",
      rating: 4.7,
      reviews: 156,
      price: "₹800 - ₹1,500 per plate",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Glamour Decoration Studio",
      category: "Decoration",
      location: "Pune, Maharashtra",
      rating: 4.9,
      reviews: 78,
      price: "₹25,000 - ₹75,000",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Dream Event Planners",
      category: "Event Planner",
      location: "Jaipur, Rajasthan",
      rating: 4.8,
      reviews: 92,
      price: "₹1,00,000 - ₹3,00,000",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Melody Music Band",
      category: "Entertainment",
      location: "Chennai, Tamil Nadu",
      rating: 4.6,
      reviews: 67,
      price: "₹30,000 - ₹80,000",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 bg-gradient-to-br from-maroon-900 to-maroon-950">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center metallic-gold-bright glitter-text font-cinzel">
            Find Event Vendors
          </h1>
          <p className="text-xl text-center mb-8 max-w-3xl mx-auto metallic-gold-subtle font-cormorant">
            Discover trusted event vendors in your city. Compare prices, read reviews, 
            and book the perfect professionals for your special occasion.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 bg-maroon-800 p-4 rounded-lg shadow-lg border border-gold-600">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gold-400" />
                <Input 
                  placeholder="Search vendors (e.g., photographers, venues...)"
                  className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gold-400" />
                <Input 
                  placeholder="Location (city, area)"
                  className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300"
                />
              </div>
              <Button className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold px-8">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 border-b border-gold-600 bg-maroon-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" className="gap-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant">
              <Filter className="h-4 w-4" />
              All Categories
            </Button>
            <Button variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant">Photography</Button>
            <Button variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant">Venues</Button>
            <Button variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant">Catering</Button>
            <Button variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant">Decoration</Button>
            <Button variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant">Planners</Button>
            <Button variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant">Entertainment</Button>
          </div>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="py-12 px-4 bg-maroon-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.map((vendor, index) => (
              <Card key={index} className="bg-maroon-800 border-gold-600 hover:border-gold-400 hover:shadow-lg hover:shadow-gold-400/20 transition-all overflow-hidden">
                <div className="aspect-video bg-gray-200 overflow-hidden">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg metallic-gold font-cinzel">{vendor.name}</CardTitle>
                      <p className="text-sm text-gold-500 font-medium font-cormorant">{vendor.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium metallic-gold-subtle">{vendor.rating}</span>
                      </div>
                      <p className="text-xs metallic-gold-subtle">({vendor.reviews} reviews)</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm metallic-gold-subtle font-cormorant">
                      <MapPin className="h-4 w-4" />
                      {vendor.location}
                    </div>
                    <div className="text-sm font-medium text-green-400 font-cormorant">
                      {vendor.price}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                    </div>
                    <Button className="w-full bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant">
              Load More Vendors
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Vendors;
