
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Camera, MapPin, Users, Music, Palette, Flower } from "lucide-react";

const ModernServices = () => {
  const services = [
    {
      icon: Camera,
      title: "Photography & Videography",
      description: "Capture every precious moment with our award-winning photographers and cinematographers",
      price: "Starting from ₹25,000",
      features: ["4K Video", "Drone Shots", "Same Day Edits", "Online Gallery"],
      color: "coral"
    },
    {
      icon: Palette,
      title: "Decoration & Design",
      description: "Transform your venue into a dreamland with our creative design specialists",
      price: "Starting from ₹35,000",
      features: ["3D Design", "Fresh Flowers", "Lighting Setup", "Theme Coordination"],
      color: "sage"
    },
    {
      icon: Users,
      title: "Catering Services",
      description: "Delight your guests with exquisite multi-cuisine dining experiences",
      price: "Starting from ₹400/plate",
      features: ["Live Counters", "Customizable Menu", "Professional Staff", "Hygiene Certified"],
      color: "cream"
    },
    {
      icon: Music,
      title: "Entertainment & Music",
      description: "Keep the energy high with professional DJs and live entertainment",
      price: "Starting from ₹15,000",
      features: ["Professional DJ", "Sound System", "Lighting Effects", "MC Services"],
      color: "coral"
    },
    {
      icon: Flower,
      title: "Makeup & Styling",
      description: "Look your absolute best with our professional beauty experts",
      price: "Starting from ₹12,000",
      features: ["Bridal Makeup", "Hair Styling", "Saree Draping", "Trial Session"],
      color: "sage"
    },
    {
      icon: MapPin,
      title: "Venue Management",
      description: "Find and manage the perfect venue for your special celebration",
      price: "Starting from ₹50,000",
      features: ["Venue Booking", "Decoration", "Catering Setup", "Full Management"],
      color: "cream"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'coral':
        return {
          icon: 'text-coral-600',
          badge: 'bg-coral-100 text-coral-800 border-coral-200',
          button: 'bg-coral-500 hover:bg-coral-600 text-white'
        };
      case 'sage':
        return {
          icon: 'text-sage-600',
          badge: 'bg-sage-100 text-sage-800 border-sage-200',
          button: 'bg-sage-500 hover:bg-sage-600 text-white'
        };
      case 'cream':
        return {
          icon: 'text-cream-600',
          badge: 'bg-cream-100 text-cream-800 border-cream-200',
          button: 'bg-cream-500 hover:bg-cream-600 text-white'
        };
      default:
        return {
          icon: 'text-coral-600',
          badge: 'bg-coral-100 text-coral-800 border-coral-200',
          button: 'bg-coral-500 hover:bg-coral-600 text-white'
        };
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-brand-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-coral-100 border border-coral-200 rounded-full px-8 py-3 mb-8">
            <Star className="h-5 w-5 text-coral-600 fill-current" />
            <span className="text-coral-800 font-bold text-base">Premium Services</span>
          </div>
          
          <h2 className="heading-lg mb-8 text-charcoal-900">
            Our Signature Services
          </h2>
          <p className="text-xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
            From intimate gatherings to grand celebrations, we create unforgettable experiences with attention to every detail
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const colorClasses = getColorClasses(service.color);
            return (
              <Card key={index} className="group glass-card hover-lift border-0">
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-white shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className={`h-8 w-8 ${colorClasses.icon}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-charcoal-900 mb-3">
                    {service.title}
                  </CardTitle>
                  <Badge className={`${colorClasses.badge} font-semibold border`}>
                    {service.price}
                  </Badge>
                </CardHeader>
                
                <CardContent className="text-center">
                  <p className="text-charcoal-700 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  {/* Features */}
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-center gap-3 text-sm text-charcoal-700">
                        <div className={`w-2 h-2 rounded-full ${service.color === 'coral' ? 'bg-coral-500' : service.color === 'sage' ? 'bg-sage-500' : 'bg-cream-500'}`}></div>
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className={`w-full ${colorClasses.button} font-semibold shadow-lg hover:shadow-xl transition-all duration-300`}>
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <Button 
            size="lg"
            className="btn-primary font-bold text-lg px-10 py-6 rounded-full transform hover:scale-105"
          >
            View All Services
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ModernServices;
