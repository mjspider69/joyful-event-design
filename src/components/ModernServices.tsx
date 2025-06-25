
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";

const ModernServices = () => {
  const services = [
    {
      icon: "📸",
      title: "Photography & Videography",
      description: "Capture every precious moment with our award-winning photographers and cinematographers",
      price: "Starting from ₹25,000",
      features: ["4K Video", "Drone Shots", "Same Day Edits", "Online Gallery"],
      gradient: "from-primary-400/20 to-primary-600/20"
    },
    {
      icon: "🎊",
      title: "Decoration & Design",
      description: "Transform your venue into a dreamland with our creative design specialists",
      price: "Starting from ₹35,000",
      features: ["3D Design", "Fresh Flowers", "Lighting Setup", "Theme Coordination"],
      gradient: "from-elegant-400/20 to-elegant-600/20"
    },
    {
      icon: "🍽️",
      title: "Catering Services",
      description: "Delight your guests with exquisite multi-cuisine dining experiences",
      price: "Starting from ₹400/plate",
      features: ["Live Counters", "Customizable Menu", "Professional Staff", "Hygiene Certified"],
      gradient: "from-accent-400/20 to-accent-600/20"
    },
    {
      icon: "🎵",
      title: "Entertainment & Music",
      description: "Keep the energy high with professional DJs and live entertainment",
      price: "Starting from ₹15,000",
      features: ["Professional DJ", "Sound System", "Lighting Effects", "MC Services"],
      gradient: "from-success-400/20 to-success-600/20"
    },
    {
      icon: "💄",
      title: "Makeup & Styling",
      description: "Look your absolute best with our professional beauty experts",
      price: "Starting from ₹12,000",
      features: ["Bridal Makeup", "Hair Styling", "Saree Draping", "Trial Session"],
      gradient: "from-elegant-400/20 to-elegant-600/20"
    },
    {
      icon: "🏰",
      title: "Venue Management",
      description: "Find and manage the perfect venue for your special celebration",
      price: "Starting from ₹50,000",
      features: ["Venue Booking", "Decoration", "Catering Setup", "Full Management"],
      gradient: "from-luxury-400/20 to-luxury-600/20"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-primary-50/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary-100 rounded-full px-6 py-2 mb-6">
            <Star className="h-4 w-4 text-primary-600 fill-current" />
            <span className="text-primary-800 font-semibold text-sm">Premium Services</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-cinzel font-bold text-luxury-800 mb-6">
            Our Signature Services
          </h2>
          <p className="text-xl text-luxury-600 font-cormorant max-w-3xl mx-auto leading-relaxed">
            From intimate gatherings to grand celebrations, we create unforgettable experiences with attention to every detail
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/80 backdrop-blur-sm">
              {/* Gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <CardHeader className="relative z-10 text-center pb-4">
                <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-cinzel text-luxury-800 mb-2">
                  {service.title}
                </CardTitle>
                <Badge className="bg-accent-100 text-accent-800 font-semibold">
                  {service.price}
                </Badge>
              </CardHeader>
              
              <CardContent className="relative z-10 text-center">
                <p className="text-luxury-600 mb-6 font-cormorant leading-relaxed">
                  {service.description}
                </p>
                
                {/* Features */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center gap-2 text-sm text-luxury-700">
                      <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                      <span className="font-cormorant">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full bg-primary-600 hover:bg-primary-700 text-white font-cormorant group-hover:bg-accent-600 group-hover:text-white transition-all duration-300">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-cormorant font-bold text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            View All Services
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ModernServices;
