
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X, Send, MessageCircle, User, Bot, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI event planning assistant. I can help you find vendors, suggest packages, and answer questions about planning your perfect event. How can I help you today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !sessionStartTime) {
      setSessionStartTime(new Date());
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (!user && sessionStartTime) {
      const timer = setTimeout(() => {
        setShowLoginPrompt(true);
      }, 60000); // 1 minute for guests

      return () => clearTimeout(timer);
    }
  }, [user, sessionStartTime]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Check if user needs to login (after 1 minute for guests)
    if (!user && sessionStartTime && Date.now() - sessionStartTime.getTime() > 60000) {
      setShowLoginPrompt(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI response - in production, this would call your AI service
      const aiResponse = await generateAIResponse(inputMessage);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Save chat history for logged-in users
      if (user) {
        await supabase.from('chat_messages').insert({
          user_id: user.id,
          message: inputMessage,
          sender_type: 'customer',
          created_at: new Date().toISOString()
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple rule-based responses - in production, use OpenAI API
    if (lowerMessage.includes('wedding') || lowerMessage.includes('marriage')) {
      return "I'd love to help you plan your wedding! Our platform offers complete wedding packages including venues, photographers, decorators, caterers, and more. What's your preferred location and budget range?";
    }
    
    if (lowerMessage.includes('photographer') || lowerMessage.includes('photography')) {
      return "We have amazing photographers across India! I can help you find wedding photographers, pre-wedding specialists, or event photographers. Which city and what type of photography are you looking for?";
    }
    
    if (lowerMessage.includes('venue') || lowerMessage.includes('hall')) {
      return "Finding the perfect venue is crucial! We have banquet halls, outdoor venues, palace locations, and destination wedding spots. What's your guest count and preferred location?";
    }
    
    if (lowerMessage.includes('budget') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
      return "Budget planning is important! Our packages range from ₹50,000 for intimate gatherings to ₹10,00,000+ for grand celebrations. What type of event and how many guests are you expecting?";
    }
    
    if (lowerMessage.includes('mumbai') || lowerMessage.includes('delhi') || lowerMessage.includes('bangalore')) {
      const city = lowerMessage.includes('mumbai') ? 'Mumbai' : lowerMessage.includes('delhi') ? 'Delhi' : 'Bangalore';
      return `Great choice! ${city} has excellent vendors and venues. We have verified photographers, decorators, caterers, and venues in ${city}. Would you like me to show you some popular packages for your city?`;
    }
    
    return "That's a great question! I can help you with event planning, vendor selection, budget planning, and package recommendations. Could you tell me more about what type of event you're planning and your requirements?";
  };

  const handleLoginRedirect = () => {
    window.location.href = '/customer-login';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              AI Event Assistant
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {!user && (
            <p className="text-xs text-amber-100">
              💡 Free 1-minute preview • Login for unlimited chat
            </p>
          )}
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-4">
          {showLoginPrompt && !user ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center space-y-4">
                <LogIn className="h-12 w-12 text-amber-600 mx-auto" />
                <h3 className="font-semibold text-charcoal-900">Continue the Conversation</h3>
                <p className="text-sm text-charcoal-600">
                  Login to continue chatting with our AI assistant and access personalized recommendations.
                </p>
                <Button
                  onClick={handleLoginRedirect}
                  className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                >
                  Login to Continue
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarFallback className={message.sender === 'user' ? 'bg-amber-100' : 'bg-blue-100'}>
                        {message.sender === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white'
                          : 'bg-gray-100 text-charcoal-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-amber-100' : 'text-gray-500'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-blue-100">
                        <Bot className="h-4 w-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about event planning, vendors, packages..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AIChat;
