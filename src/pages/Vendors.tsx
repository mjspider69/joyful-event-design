
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
      <section className="pt-24 pb-12 px-4 luxury-gradient relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-white font-cinzel">
            Find Event Vendors
          </h1>
          <p className="text-xl text-center mb-8 max-w-3xl mx-auto text-gray-100 font-cormorant">
            Discover trusted event vendors in your city. Compare prices, read reviews, 
            and book the perfect professionals for your special occasion.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-2xl border border-white/20">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-primary-500" />
                <Input 
                  placeholder="Search vendors (e.g., photographers, venues...)"
                  className="pl-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-primary-500" />
                <Input 
                  placeholder="Location (city, area)"
                  className="pl-10 border-primary-200 focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <Button className="bg-primary-600 hover:bg-primary-700 text-white font-cormorant font-semibold px-8 shadow-lg">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 border-b border-primary-200 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4">
            <Button variant="outline" className="gap-2 border-primary-300 text-primary-700 hover:bg-primary-100 hover:border-primary-400 font-cormorant">
              <Filter className="h-4 w-4" />
              All Categories
            </Button>
            <Button variant="outline" className="border-primary-300 text-primary-700 hover:bg-primary-100 hover:border-primary-400 font-cormorant">Photography</Button>
            <Button variant="outline" className="border-primary-300 text-primary-700 hover:bg-primary-100 hover:border-primary-400 font-cormorant">Venues</Button>
            <Button variant="outline" className="border-primary-300 text-primary-700 hover:bg-primary-100 hover:border-primary-400 font-cormorant">Catering</Button>
            <Button variant="outline" className="border-primary-300 text-primary-700 hover:bg-primary-100 hover:border-primary-400 font-cormorant">Decoration</Button>
            <Button variant="outline" className="border-primary-300 text-primary-700 hover:bg-primary-100 hover:border-primary-400 font-cormorant">Planners</Button>
            <Button variant="outline" className="border-primary-300 text-primary-700 hover:bg-primary-100 hover:border-primary-400 font-cormorant">Entertainment</Button>
          </div>
        </div>
      </section>

      {/* Vendors Grid */}
      <section className="py-12 px-4 bg-gradient-to-b from-white/80 to-primary-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vendors.map((vendor, index) => (
              <Card key={index} className="bg-white/95 backdrop-blur-sm border border-primary-200 hover:border-primary-400 hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500 transform hover:-translate-y-2 overflow-hidden">
                <div className="aspect-video bg-gray-200 overflow-hidden relative">
                  <img 
                    src={vendor.image} 
                    alt={vendor.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-luxury-800 font-cinzel hover:text-primary-600 transition-colors">{vendor.name}</CardTitle>
                      <p className="text-sm text-primary-600 font-medium font-cormorant bg-primary-100 px-2 py-1 rounded-full inline-block mt-1">{vendor.category}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1 bg-accent-100 px-2 py-1 rounded-full">
                        <Star className="h-4 w-4 fill-accent-500 text-accent-500" />
                        <span className="font-medium text-accent-700 text-sm">{vendor.rating}</span>
                      </div>
                      <p className="text-xs text-luxury-600 mt-1">({vendor.reviews} reviews)</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-luxury-600 font-cormorant">
                      <MapPin className="h-4 w-4 text-primary-500" />
                      {vendor.location}
                    </div>
                    <div className="text-sm font-semibold text-success-600 bg-success-100 px-3 py-2 rounded-lg font-cormorant">
                      {vendor.price}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 border-primary-300 text-primary-700 hover:bg-primary-100 hover:border-primary-400 font-cormorant">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1 border-primary-300 text-primary-700 hover:bg-primary-100 hover:border-primary-400 font-cormorant">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                    </div>
                    <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-cormorant font-semibold shadow-lg hover:shadow-xl transition-shadow">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg" className="border-primary-400 text-primary-700 hover:bg-primary-100 hover:border-primary-500 font-cormorant px-8 py-3 shadow-lg">
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
