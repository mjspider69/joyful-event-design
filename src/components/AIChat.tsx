
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { X, Send, Bot, User, Clock, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your wedding planning assistant. I can help you find vendors, suggest packages, and answer questions about your dream wedding. You have 2 minutes of free interaction!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9));
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && timeLeft > 0 && !isTimeUp) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsTimeUp(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isOpen, timeLeft, isTimeUp]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTimeUp) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That sounds wonderful! For a wedding with that budget, I'd recommend checking out our premium vendors. Would you like me to suggest some photographers and decorators?",
        "Great choice! Based on your requirements, I can suggest several venue options. What's your preferred location - indoor or outdoor?",
        "I'd be happy to help you with that! Let me suggest some packages that fit your needs. Are you looking for complete planning or specific services?",
        "Perfect! For your guest count, we have some amazing caterers and event managers. Would you like me to connect you with them?",
        "Excellent! I can help you plan the perfect wedding. Let me suggest some vendors based on your requirements and budget."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: randomResponse,
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const handleLogin = () => {
    onClose();
    window.location.href = '/customer-login';
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl h-[80vh] flex flex-col bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-maroon-900 text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-gold-500 text-maroon-900">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">Wedding Planning Assistant</h3>
              <div className="flex items-center gap-2 text-sm text-gold-200">
                <Clock className="h-3 w-3" />
                <span className={timeLeft < 30 ? "text-red-300 font-bold" : ""}>
                  {formatTime(timeLeft)} remaining
                </span>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-maroon-800">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}>
                {message.isBot && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-gold-500 text-maroon-900">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[70%] p-3 rounded-lg ${
                  message.isBot 
                    ? 'bg-gray-100 text-gray-900' 
                    : 'bg-maroon-900 text-white'
                }`}>
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {!message.isBot && (
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-maroon-900 text-gold-400">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-gold-500 text-maroon-900">
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
          </div>
          <div ref={messagesEndRef} />
        </ScrollArea>

        {/* Time Up Overlay */}
        {isTimeUp && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
            <Card className="p-6 max-w-sm mx-4 text-center">
              <Clock className="h-12 w-12 text-gold-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Time's Up!</h3>
              <p className="text-gray-600 mb-4">
                Your 2-minute free session has ended. Login to continue chatting with our AI assistant and get personalized wedding planning help!
              </p>
              <Button onClick={handleLogin} className="w-full bg-maroon-900 hover:bg-maroon-800">
                <LogIn className="h-4 w-4 mr-2" />
                Login to Continue
              </Button>
            </Card>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isTimeUp ? "Login to continue chatting..." : "Ask about venues, vendors, packages..."}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={isTimeUp || isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isTimeUp || isLoading}
              className="bg-maroon-900 hover:bg-maroon-800"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AIChat;
