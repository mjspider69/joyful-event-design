
import { useState } from "react";
import Navbar from "@/components/Navbar";
import ModernFooter from "@/components/ModernFooter";
import ModernHero from "@/components/ModernHero";
import ModernServices from "@/components/ModernServices";
import ModernTestimonials from "@/components/ModernTestimonials";
import AIChat from "@/components/AIChat";
import AdvancedBookingFlow from "@/components/AdvancedBookingFlow";

const Index = () => {
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isBookingFlowOpen, setIsBookingFlowOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Modern Hero Section */}
      <ModernHero 
        onPlanEvent={() => setIsBookingFlowOpen(true)}
        onChatAI={() => setIsAIChatOpen(true)}
      />

      {/* Modern Services Section */}
      <ModernServices />

      {/* Modern Testimonials Section */}
      <ModernTestimonials />

      {/* Modern Footer */}
      <ModernFooter />

      {/* AI Chat Component */}
      <AIChat isOpen={isAIChatOpen} onClose={() => setIsAIChatOpen(false)} />

      {/* Advanced Booking Flow */}
      <AdvancedBookingFlow isOpen={isBookingFlowOpen} onClose={() => setIsBookingFlowOpen(false)} />
    </div>
  );
};

export default Index;
