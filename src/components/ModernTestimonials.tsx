
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, Heart } from "lucide-react";

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
    <section className="py-24 primary-gradient relative overflow-hidden">
      {/* Background pattern */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ca8a04' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12 12-5.373 12-12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-20 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-luxury-500/20 border border-luxury-400/30 rounded-full px-6 py-2 mb-6">
            <Heart className="h-4 w-4 text-luxury-600 fill-current" />
            <span className="text-luxury-800 font-semibold text-sm">Love Stories</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-cinzel font-bold mb-6 metallic-luxury">
            Happy Couples Share
          </h2>
          <p className="text-xl text-elegant-600 font-cormorant max-w-3xl mx-auto leading-relaxed">
            Real experiences from beautiful celebrations we've had the honor to plan
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group bg-white/90 backdrop-blur-sm border border-luxury-200 hover:border-luxury-400 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-luxury-400/20">
              <CardContent className="p-8">
                {/* Quote icon */}
                <Quote className="h-8 w-8 text-luxury-500 mb-6 opacity-60" />
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-luxury-500 fill-current" />
                  ))}
                </div>
                
                {/* Testimonial text */}
                <p className="font-cormorant text-lg text-elegant-700 mb-8 leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                {/* Customer info */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-luxury-300 group-hover:border-luxury-500 transition-colors"
                    />
                    <Heart className="absolute -bottom-1 -right-1 h-6 w-6 text-rose-400 fill-current bg-white rounded-full p-1" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-elegant-700 text-lg">{testimonial.name}</h4>
                    <p className="text-primary-600 font-cormorant">{testimonial.event}</p>
                    <p className="text-luxury-600 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
          <div className="group">
            <div className="text-4xl font-bold metallic-luxury mb-2 group-hover:scale-110 transition-transform">500+</div>
            <p className="text-primary-600 font-cormorant">Happy Couples</p>
          </div>
          <div className="group">
            <div className="text-4xl font-bold metallic-luxury mb-2 group-hover:scale-110 transition-transform">4.9</div>
            <p className="text-primary-600 font-cormorant">Average Rating</p>
          </div>
          <div className="group">
            <div className="text-4xl font-bold metallic-luxury mb-2 group-hover:scale-110 transition-transform">1000+</div>
            <p className="text-primary-600 font-cormorant">Events Planned</p>
          </div>
          <div className="group">
            <div className="text-4xl font-bold metallic-luxury mb-2 group-hover:scale-110 transition-transform">50+</div>
            <p className="text-primary-600 font-cormorant">Expert Vendors</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernTestimonials;
