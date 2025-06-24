
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, Calendar, Users, MapPin, Phone, Mail, MessageCircle, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AIChat from "@/components/AIChat";
import AdvancedBookingFlow from "@/components/AdvancedBookingFlow";

const Index = () => {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isBookingFlowOpen, setIsBookingFlowOpen] = useState(false);

  const services = [
    {
      icon: "📸",
      title: "Photography & Videography",
      description: "Capture your precious moments with our professional photographers and videographers",
      price: "Starting from ₹25,000"
    },
    {
      icon: "🎊",
      title: "Decoration & Design",
      description: "Transform your venue with stunning decorations and floral arrangements",
      price: "Starting from ₹35,000"
    },
    {
      icon: "🍽️",
      title: "Catering Services",
      description: "Delicious multi-cuisine catering with customizable menu options",
      price: "Starting from ₹400/plate"
    },
    {
      icon: "🎵",
      title: "Entertainment & Music",
      description: "Professional DJs, live bands, and entertainment for your special day",
      price: "Starting from ₹15,000"
    },
    {
      icon: "💄",
      title: "Makeup & Styling",
      description: "Professional bridal makeup and styling services",
      price: "Starting from ₹12,000"
    },
    {
      icon: "🏰",
      title: "Venue Management",
      description: "Beautiful venues with complete event management services",
      price: "Starting from ₹50,000"
    }
  ];

  const testimonials = [
    {
      name: "Priya & Raj",
      event: "Wedding",
      rating: 5,
      text: "Absolutely wonderful experience! The team made our dream wedding come true. Every detail was perfect.",
      image: "/placeholder.svg"
    },
    {
      name: "Anjali & Vikram",
      event: "Reception",
      rating: 5,
      text: "Professional service and beautiful arrangements. Our guests are still talking about the amazing event!",
      image: "/placeholder.svg"
    },
    {
      name: "Meera & Arjun",
      event: "Engagement",
      rating: 5,
      text: "From planning to execution, everything was seamless. Highly recommended for any celebration!",
      image: "/placeholder.svg"
    }
  ];

  const packages = [
    {
      name: "Silver Package",
      price: "₹2,50,000",
      features: [
        "Basic Photography (6 hours)",
        "Simple Decoration",
        "DJ Services",
        "Basic Catering (100 guests)",
        "Event Coordination"
      ],
      popular: false
    },
    {
      name: "Gold Package",
      price: "₹5,00,000",
      features: [
        "Premium Photography & Videography",
        "Designer Decorations",
        "Live Music & DJ",
        "Multi-cuisine Catering (200 guests)",
        "Bridal Makeup",
        "Complete Event Management"
      ],
      popular: true
    },
    {
      name: "Platinum Package",
      price: "₹10,00,000",
      features: [
        "Cinematic Photography & Videos",
        "Luxury Decorations & Themes",
        "Celebrity DJ & Live Band",
        "Premium Catering (300+ guests)",
        "Professional Makeup Team",
        "Dedicated Wedding Planner",
        "Venue Decoration & Lighting"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-maroon-900 via-maroon-800 to-rose-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 py-20">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-cinzel font-bold mb-6 metallic-gold leading-tight">
              Your Dream Wedding
              <span className="block text-gold-300">Awaits</span>
            </h1>
            <p className="text-xl md:text-2xl font-cormorant mb-8 text-gold-100 max-w-2xl mx-auto leading-relaxed">
              Experience the magic of perfect celebrations with our premium wedding planning services
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button 
                onClick={() => setIsBookingFlowOpen(true)}
                size="lg" 
                className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold text-lg px-8 py-4 rounded-full shadow-2xl hover-scale"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Plan Your Wedding
              </Button>
              
              <Button 
                onClick={() => setIsAIChatOpen(true)}
                variant="outline" 
                size="lg" 
                className="border-2 border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant font-semibold text-lg px-8 py-4 rounded-full shadow-2xl hover-scale"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat with AI Assistant
              </Button>
            </div>

            <div className="flex items-center justify-center gap-6 text-gold-200">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-gold-400 fill-current" />
                <span>500+ Happy Couples</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-rose-400 fill-current" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-400" />
                <span>Expert Team</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <Heart className="h-12 w-12 text-rose-300 opacity-60" />
        </div>
        <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: '1s' }}>
          <Sparkles className="h-10 w-10 text-gold-300 opacity-60" />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-maroon-900 mb-4">
              Our Premium Services
            </h2>
            <p className="text-xl text-gray-600 font-cormorant max-w-2xl mx-auto">
              From intimate gatherings to grand celebrations, we create unforgettable experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover-scale border-0 shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl font-cinzel text-maroon-900">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-600 mb-4 font-cormorant leading-relaxed">{service.description}</p>
                  <Badge variant="secondary" className="bg-gold-100 text-gold-800 font-semibold">
                    {service.price}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold text-maroon-900 mb-4">
              Wedding Packages
            </h2>
            <p className="text-xl text-gray-600 font-cormorant max-w-2xl mx-auto">
              Choose the perfect package for your special day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <Card key={index} className={`relative overflow-hidden transition-all duration-300 hover-scale ${
                pkg.popular ? 'ring-2 ring-gold-400 shadow-2xl scale-105' : 'shadow-lg'
              }`}>
                {pkg.popular && (
                  <div className="absolute top-0 right-0 bg-gold-500 text-maroon-900 px-3 py-1 text-sm font-semibold">
                    Most Popular
                  </div>
                )}
                <CardHeader className="text-center bg-gradient-to-b from-maroon-900 to-maroon-800 text-white">
                  <CardTitle className="text-2xl font-cinzel">{pkg.name}</CardTitle>
                  <div className="text-3xl font-bold text-gold-400">{pkg.price}</div>
                </CardHeader>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    {pkg.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gold-500 rounded-full"></div>
                        <span className="font-cormorant">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6 bg-maroon-900 hover:bg-maroon-800 font-cormorant">
                    Choose Package
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-maroon-900 text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-4 metallic-gold">
              Happy Couples
            </h2>
            <p className="text-xl text-gold-200 font-cormorant max-w-2xl mx-auto">
              Real experiences from our beautiful weddings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/10 backdrop-blur-sm border-gold-400/20 text-white hover-scale">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-gold-400 fill-current" />
                    ))}
                  </div>
                  <p className="font-cormorant text-lg mb-4 leading-relaxed">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-maroon-900" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-gold-200 text-sm">{testimonial.event}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gold-500 to-gold-600 text-maroon-900">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-cinzel font-bold mb-6">
            Ready to Plan Your Dream Wedding?
          </h2>
          <p className="text-xl font-cormorant mb-8 opacity-90">
            Let our expert team create the perfect celebration for your special day
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={() => setIsBookingFlowOpen(true)}
              size="lg" 
              className="bg-maroon-900 hover:bg-maroon-800 text-gold-400 font-cormorant font-semibold text-lg px-8 py-4 rounded-full shadow-2xl hover-scale"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Start Planning Now
            </Button>
            
            <div className="flex items-center gap-4 text-maroon-800">
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                <span className="font-semibold">+91 9876543210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                <span className="font-semibold">hello@aaroham.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* AI Chat Component */}
      <AIChat isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />

      {/* Advanced Booking Flow */}
      <AdvancedBookingFlow isOpen={isBookingFlowOpen} onClose={() => setIsBookingFlowOpen(false)} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 space-y-3">
        <Button
          onClick={() => setIsAIChatOpen(true)}
          className="bg-maroon-900 hover:bg-maroon-800 text-gold-400 rounded-full p-4 shadow-2xl hover-scale animate-pulse"
          size="lg"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
