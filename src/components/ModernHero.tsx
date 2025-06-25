
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Calendar, Heart } from "lucide-react";
import { SocialLinks } from "@/components/ui/social-links";

interface ModernHeroProps {
  onPlanEvent: () => void;
  onChatAI: () => void;
}

const ModernHero: React.FC<ModernHeroProps> = ({ onPlanEvent, onChatAI }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 primary-gradient"></div>
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ca8a04' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      {/* Floating elements */}
      <div className="absolute top-20 left-10 animate-float">
        <Heart className="h-8 w-8 text-rose-400/60" />
      </div>
      <div className="absolute bottom-32 right-16 animate-float" style={{ animationDelay: '2s' }}>
        <Star className="h-6 w-6 text-luxury-400/60" />
      </div>
      <div className="absolute top-1/3 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Calendar className="h-7 w-7 text-luxury-500/50" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-6 py-20">
        <div className="animate-fade-in">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-2 bg-luxury-500/20 border border-luxury-400/30 rounded-full px-6 py-2 mb-8">
            <Star className="h-4 w-4 text-luxury-600 fill-current" />
            <span className="text-luxury-800 font-medium text-sm">Premium Event Planning</span>
          </div>

          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-cinzel font-bold mb-6 leading-tight">
            <span className="block metallic-luxury">Create</span>
            <span className="block text-primary-700">Unforgettable</span>
            <span className="block metallic-primary">Moments</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-cormorant mb-8 text-elegant-700 max-w-3xl mx-auto leading-relaxed">
            Experience the magic of perfect celebrations with our AI-powered wedding and event planning platform. 
            From intimate gatherings to grand celebrations.
          </p>

          {/* Statistics */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-elegant-600">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-luxury-600" />
              <span className="font-semibold">500+ Happy Couples</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-luxury-600 fill-current" />
              <span className="font-semibold">4.9 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-rose-500 fill-current" />
              <span className="font-semibold">Premium Quality</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button 
              onClick={onPlanEvent}
              size="lg" 
              className="group bg-gradient-to-r from-luxury-500 to-luxury-600 hover:from-luxury-600 hover:to-luxury-700 text-white font-cormorant font-bold text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Start Planning Your Event
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={onChatAI}
              variant="outline" 
              size="lg" 
              className="group border-2 border-luxury-500 text-luxury-700 hover:bg-luxury-500 hover:text-white font-cormorant font-bold text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Chat with AI Assistant
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex flex-col items-center gap-4">
            <p className="text-primary-600 font-cormorant">Follow our journey</p>
            <SocialLinks variant="horizontal" size="lg" />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default ModernHero;
