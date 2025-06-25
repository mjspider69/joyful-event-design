
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Heart, Trophy } from "lucide-react";

const ModernTestimonials = () => {
  const testimonials = [
    {
      name: "Priya & Rajesh",
      event: "Dream Wedding",
      rating: 5,
      text: "Aaroham turned our wedding dreams into reality! Every detail was perfect, from the stunning decorations to the flawless coordination. Our guests still can't stop talking about how magical everything was.",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=400&fit=crop&crop=face",
      location: "Mumbai"
    },
    {
      name: "Anjali & Vikram",
      event: "Grand Reception",
      rating: 5,
      text: "The team's attention to detail and professional service exceeded our expectations. The AI recommendations were spot-on, and the booking process was seamless. Highly recommended!",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      location: "Delhi"
    },
    {
      name: "Meera & Arjun",
      event: "Intimate Engagement",
      rating: 5,
      text: "From planning to execution, everything was seamless. The vendors were exceptional, and the whole experience was stress-free. Thank you for making our engagement so special!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b190?w=400&h=400&fit=crop&crop=face",
      location: "Bangalore"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-sage-50 to-cream-50 relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235c775c' fill-opacity='0.4'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-3 bg-sage-100 border border-sage-200 rounded-full px-8 py-3 mb-8">
            <Heart className="h-5 w-5 text-sage-600 fill-current" />
            <span className="text-sage-800 font-bold text-base">Love Stories</span>
          </div>
          
          <h2 className="heading-lg mb-8 text-charcoal-900">
            Happy Couples Share
          </h2>
          <p className="text-xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
            Real experiences from beautiful celebrations we've had the honor to plan
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group glass-card hover-lift border-2 border-brand-200">
              <CardContent className="p-8">
                {/* Quote icon */}
                <div className="w-12 h-12 bg-coral-100 rounded-full flex items-center justify-center mb-6">
                  <Quote className="h-6 w-6 text-coral-600" />
                </div>
                
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-cream-500 fill-current" />
                  ))}
                </div>
                
                {/* Testimonial text */}
                <p className="text-lg text-charcoal-700 mb-8 leading-relaxed font-medium">
                  "{testimonial.text}"
                </p>
                
                {/* Customer info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-3 border-white shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-coral-500 rounded-full flex items-center justify-center">
                      <Heart className="h-3 w-3 text-white fill-current" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal-800 text-lg">{testimonial.name}</h4>
                    <p className="text-coral-600 font-semibold">{testimonial.event}</p>
                    <p className="text-sage-600 text-sm font-medium">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          <div className="text-center group">
            <div className="w-20 h-20 bg-white shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl font-bold text-coral-600">500+</span>
            </div>
            <p className="text-charcoal-700 font-semibold">Happy Couples</p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-white shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl font-bold text-sage-600">4.9</span>
            </div>
            <p className="text-charcoal-700 font-semibold">Average Rating</p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-white shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl font-bold text-cream-600">1000+</span>
            </div>
            <p className="text-charcoal-700 font-semibold">Events Planned</p>
          </div>
          <div className="text-center group">
            <div className="w-20 h-20 bg-white shadow-lg rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <span className="text-3xl font-bold text-coral-600">50+</span>
            </div>
            <p className="text-charcoal-700 font-semibold">Expert Vendors</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernTestimonials;
