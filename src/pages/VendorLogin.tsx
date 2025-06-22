
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OTPVerification from "@/components/OTPVerification";

const VendorLogin = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOTP, setShowOTP] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    businessName: '',
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
    console.log('Vendor form submitted:', formData);
    
    if (isLogin) {
      // For login, proceed to OTP verification
      toast({
        title: "OTP Sent",
        description: "Please check your email for the verification code.",
      });
      setShowOTP(true);
    } else {
      // For signup, also proceed to OTP verification
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: "Password Mismatch",
          description: "Passwords do not match. Please try again.",
          variant: "destructive"
        });
        return;
      }
      toast({
        title: "Business Registration",
        description: "Please verify your email with the OTP sent to you.",
      });
      setShowOTP(true);
    }
  };

  const handleOTPVerified = () => {
    setIsLoggedIn(true);
    setShowOTP(false);
  };

  const handleBackToLogin = () => {
    setShowOTP(false);
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#5a0202' }}>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen px-4 pt-16">
          <Card className="w-full max-w-md bg-maroon-800/95 border-gold-600 shadow-2xl shadow-gold-400/20 animate-scale-in">
            <CardContent className="p-8 text-center">
              <Building className="h-16 w-16 text-gold-400 mx-auto mb-6 animate-float" />
              <h2 className="text-2xl font-cinzel metallic-gold mb-4">Welcome to Your Dashboard!</h2>
              <p className="metallic-gold-subtle font-cormorant mb-6">
                You have successfully accessed your vendor account. Manage your services and bookings here.
              </p>
              <Button 
                onClick={() => {
                  setIsLoggedIn(false);
                  setFormData({ email: '', password: '', businessName: '', confirmPassword: '' });
                }}
                className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold px-8 py-3"
              >
                Logout
              </Button>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-maroon-950 to-maroon-900">
      <Navbar />
      
      <div className="flex items-center justify-center min-h-screen px-4 pt-16">
        <Card className="w-full max-w-md bg-maroon-800/95 border-gold-600 shadow-2xl shadow-gold-400/20 animate-scale-in">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-8 w-8 text-gold-400 animate-float" />
              <span className="font-cinzel font-bold text-2xl metallic-gold-bright">
                Aaroham
              </span>
            </div>
            <CardTitle className="text-2xl font-cinzel metallic-gold">
              {showOTP ? 'Verify Your Email' : (isLogin ? 'Vendor Login' : 'Vendor Registration')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showOTP ? (
              <OTPVerification 
                email={formData.email}
                onVerified={handleOTPVerified}
                onBack={handleBackToLogin}
                userType="vendor"
              />
            ) : (
              <>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {!isLogin && (
                    <div className="space-y-2">
                      <Label htmlFor="businessName" className="text-sm font-medium metallic-gold-subtle font-cormorant">
                        Business Name
                      </Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-gold-400" />
                        <Input
                          id="businessName"
                          name="businessName"
                          type="text"
                          required
                          className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300 focus:border-gold-400 transition-all duration-300"
                          placeholder="Enter your business name"
                          value={formData.businessName}
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
                        className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300 focus:border-gold-400 transition-all duration-300"
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
                        className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300 focus:border-gold-400 transition-all duration-300"
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
                          className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300 focus:border-gold-400 transition-all duration-300"
                          placeholder="Confirm your password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  )}
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold py-3 transition-all duration-300 hover-scale"
                  >
                    {isLogin ? 'Send OTP & Login' : 'Register & Verify'}
                  </Button>
                </form>
                
                <div className="mt-6 text-center">
                  <p className="text-sm metallic-gold-subtle font-cormorant">
                    {isLogin ? "Don't have a vendor account?" : "Already have an account?"}
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-gold-400 hover:text-gold-300 font-cormorant transition-colors"
                  >
                    {isLogin ? 'Register as Vendor' : 'Login Instead'}
                  </Button>
                </div>
                
                <div className="mt-4 text-center">
                  <Link to="/customer-login" className="text-sm text-gold-400 hover:text-gold-300 font-cormorant transition-colors">
                    Customer Login →
                  </Link>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default VendorLogin;
