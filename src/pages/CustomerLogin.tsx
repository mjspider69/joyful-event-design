
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CustomerLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Customer form submitted:', formData);
    // Handle login/signup logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon-950 to-maroon-900">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-screen px-4 pt-16">
        <Card className="w-full max-w-md bg-maroon-800/95 border-gold-600 shadow-2xl shadow-gold-400/20">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-gold-400" />
              <span className="font-cinzel font-bold text-2xl metallic-gold-bright glitter-text">
                Aaroham
              </span>
            </div>
            <CardTitle className="text-2xl font-cinzel metallic-gold">
              {isLogin ? 'Customer Login' : 'Create Account'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-sm font-medium metallic-gold-subtle font-cormorant">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gold-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300 focus:border-gold-400"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium metallic-gold-subtle font-cormorant">
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gold-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300 focus:border-gold-400"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium metallic-gold-subtle font-cormorant">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gold-400" />
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300 focus:border-gold-400"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium metallic-gold-subtle font-cormorant">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gold-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300 focus:border-gold-400"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold py-3"
              >
                {isLogin ? 'Login' : 'Create Account'}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm metallic-gold-subtle font-cormorant">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
              </p>
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="text-gold-400 hover:text-gold-300 font-cormorant"
              >
                {isLogin ? 'Sign Up' : 'Login Instead'}
              </Button>
            </div>
            
            <div className="mt-4 text-center">
              <Link to="/vendor-login" className="text-sm text-gold-400 hover:text-gold-300 font-cormorant">
                Vendor Login →
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default CustomerLogin;
