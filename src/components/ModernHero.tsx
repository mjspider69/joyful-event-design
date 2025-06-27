
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, MessageCircle, Sparkles } from "lucide-react";

interface ModernHeroProps {
  onPlanEvent: () => void;
  onChatAI: () => void;
}

const ModernHero: React.FC<ModernHeroProps> = ({ onPlanEvent, onChatAI }) => {
  const [showChatIntro, setShowChatIntro] = useState(true);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-cream-50 via-white to-sage-50 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23F4F1E8" fill-opacity="0.3"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="text-center">
          {/* Main Heading */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 mb-6 font-serif">
              ELEVATE EVERY OCCASION
            </h1>
            <p className="text-xl md:text-2xl text-charcoal-700 max-w-3xl mx-auto leading-relaxed">
              Transform your dreams into unforgettable celebrations with India's most trusted event planning platform
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              onClick={onPlanEvent}
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Start Planning Your Event
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button
              onClick={onChatAI}
              variant="outline"
              size="lg"
              className="border-2 border-amber-600 text-amber-700 hover:bg-amber-50 px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat with AI Assistant
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">Curated Vendors</h3>
              <p className="text-charcoal-600">Handpicked professionals across India ready to make your event extraordinary</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">End-to-End Planning</h3>
              <p className="text-charcoal-600">From concept to celebration, we handle every detail of your special day</p>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-charcoal-900 mb-2">AI-Powered Assistance</h3>
              <p className="text-charcoal-600">Smart recommendations and instant support for all your planning needs</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Intro Popup */}
      {showChatIntro && (
        <div className="fixed bottom-6 right-6 bg-white rounded-2xl shadow-2xl border border-amber-200 p-6 max-w-sm z-50 animate-in slide-in-from-bottom-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-charcoal-900 mb-1">AI Assistant Ready!</h4>
              <p className="text-sm text-charcoal-600 mb-3">
                Get instant help planning your perfect event. Try our AI assistant for free!
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    onChatAI();
                    setShowChatIntro(false);
                  }}
                  className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white"
                >
                  Try Now
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setShowChatIntro(false)}
                  className="text-charcoal-600"
                >
                  Later
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ModernHero;
