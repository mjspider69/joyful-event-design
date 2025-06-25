
import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Users, Calendar, Heart, Sparkles, Trophy } from "lucide-react";
import { SocialLinks } from "@/components/ui/social-links";

interface ModernHeroProps {
  onPlanEvent: () => void;
  onChatAI: () => void;
}

const ModernHero: React.FC<ModernHeroProps> = ({ onPlanEvent, onChatAI }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Clean background */}
      <div className="absolute inset-0 hero-gradient"></div>
      
      {/* Subtle pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23eb7527' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>
      
      {/* Floating decorative elements */}
      <div className="absolute top-20 left-10 text-coral-400/60 animate-bounce">
        <Heart className="h-8 w-8" />
      </div>
      <div className="absolute bottom-32 right-16 text-sage-400/60 animate-pulse">
        <Star className="h-6 w-6" />
      </div>
      <div className="absolute top-1/3 right-20 text-cream-600/60 animate-bounce" style={{ animationDelay: '1s' }}>
        <Sparkles className="h-7 w-7" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-6 py-20">
        <div className="animate-fade-in">
          {/* Premium badge */}
          <div className="inline-flex items-center gap-3 bg-white/95 backdrop-blur-sm border-2 border-coral-200 rounded-full px-8 py-4 mb-12 shadow-xl">
            <Trophy className="h-5 w-5 text-coral-500" />
            <span className="text-charcoal-800 font-semibold text-base">Premium Event Planning</span>
          </div>

          {/* Main heading with perfect visibility */}
          <h1 className="heading-xl mb-8">
            <span className="block text-charcoal-900 mb-2">Create</span>
            <span className="block text-gradient-coral mb-2">Unforgettable</span>
            <span className="block text-gradient-sage">Moments</span>
          </h1>
          
          {/* Subtitle with excellent contrast */}
          <p className="text-xl md:text-2xl font-medium mb-12 text-charcoal-700 max-w-4xl mx-auto leading-relaxed">
            Experience the magic of perfect celebrations with our AI-powered wedding and event planning platform. 
            From intimate gatherings to grand celebrations, we make every moment count.
          </p>

          {/* Statistics with clear backgrounds */}
          <div className="flex flex-wrap justify-center items-center gap-6 mb-16">
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-brand-200">
              <Users className="h-6 w-6 text-coral-600" />
              <span className="font-bold text-charcoal-800 text-lg">500+ Happy Couples</span>
            </div>
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-brand-200">
              <Star className="h-6 w-6 text-cream-600 fill-current" />
              <span className="font-bold text-charcoal-800 text-lg">4.9 Rating</span>
            </div>
            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-brand-200">
              <Heart className="h-6 w-6 text-sage-600 fill-current" />
              <span className="font-bold text-charcoal-800 text-lg">Premium Quality</span>
            </div>
          </div>

          {/* CTA Buttons with excellent contrast */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              onClick={onPlanEvent}
              size="lg" 
              className="group btn-primary font-bold text-lg px-10 py-6 rounded-full transform hover:scale-105"
            >
              <Calendar className="mr-3 h-6 w-6" />
              Start Planning Your Event
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={onChatAI}
              variant="outline" 
              size="lg" 
              className="group border-2 border-sage-500 bg-white/95 text-sage-700 hover:bg-sage-500 hover:text-white font-bold text-lg px-10 py-6 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Chat with AI Assistant
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Social Links with clear background */}
          <div className="flex flex-col items-center gap-6">
            <p className="text-charcoal-700 font-semibold text-lg">Follow our journey</p>
            <div className="bg-white/95 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg border border-brand-200">
              <SocialLinks variant="horizontal" size="lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernHero;
