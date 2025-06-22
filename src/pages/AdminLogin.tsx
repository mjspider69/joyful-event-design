
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, Lock, Shield, Users, TrendingUp, Calendar, Eye } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.email === 'greshma789@' && formData.password === 'aarohameve') {
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "Welcome to the Admin Dashboard",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#5a0202' }}>
        <Navbar />
        
        <div className="pt-20 pb-12 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 metallic-gold-bright font-cinzel animate-fade-in">
                Admin Dashboard
              </h1>
              <p className="text-xl metallic-gold-subtle font-cormorant animate-slide-in-right">
                Manage your events platform
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="bg-maroon-800 border-gold-600 hover:border-gold-400 transition-all duration-300 hover:scale-105 animate-fade-in">
                <CardHeader className="text-center">
                  <Users className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                  <CardTitle className="text-2xl metallic-gold font-cinzel">245</CardTitle>
                  <CardDescription className="metallic-gold-subtle font-cormorant">
                    Total Customers
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-maroon-800 border-gold-600 hover:border-gold-400 transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.1s'}}>
                <CardHeader className="text-center">
                  <Shield className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                  <CardTitle className="text-2xl metallic-gold font-cinzel">48</CardTitle>
                  <CardDescription className="metallic-gold-subtle font-cormorant">
                    Active Vendors
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-maroon-800 border-gold-600 hover:border-gold-400 transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.2s'}}>
                <CardHeader className="text-center">
                  <Calendar className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                  <CardTitle className="text-2xl metallic-gold font-cinzel">127</CardTitle>
                  <CardDescription className="metallic-gold-subtle font-cormorant">
                    Pending Bookings
                  </CardDescription>
                </CardHeader>
              </Card>
              
              <Card className="bg-maroon-800 border-gold-600 hover:border-gold-400 transition-all duration-300 hover:scale-105 animate-fade-in" style={{animationDelay: '0.3s'}}>
                <CardHeader className="text-center">
                  <TrendingUp className="h-12 w-12 text-gold-400 mx-auto mb-4" />
                  <CardTitle className="text-2xl metallic-gold font-cinzel">₹2.4L</CardTitle>
                  <CardDescription className="metallic-gold-subtle font-cormorant">
                    Monthly Revenue
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-maroon-800 border-gold-600 animate-slide-in-right">
                <CardHeader>
                  <CardTitle className="text-2xl metallic-gold font-cinzel">Recent Enrollments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Priya Sharma", event: "Wedding", date: "2024-01-15", status: "Confirmed" },
                      { name: "Rajesh Kumar", event: "Corporate Event", date: "2024-01-18", status: "Pending" },
                      { name: "Anita Patel", event: "Birthday Party", date: "2024-01-20", status: "Confirmed" },
                      { name: "Suresh Gupta", event: "Anniversary", date: "2024-01-25", status: "Pending" }
                    ].map((enrollment, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-maroon-700 rounded-lg hover:bg-maroon-600 transition-colors">
                        <div>
                          <p className="font-semibold metallic-gold font-cormorant">{enrollment.name}</p>
                          <p className="text-sm metallic-gold-subtle font-cormorant">{enrollment.event} - {enrollment.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          enrollment.status === 'Confirmed' 
                            ? 'bg-green-600 text-green-100' 
                            : 'bg-yellow-600 text-yellow-100'
                        }`}>
                          {enrollment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-maroon-800 border-gold-600 animate-slide-in-right" style={{animationDelay: '0.2s'}}>
                <CardHeader>
                  <CardTitle className="text-2xl metallic-gold font-cinzel">Lead Generation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-maroon-700 p-4 rounded-lg">
                      <h4 className="font-semibold metallic-gold font-cormorant mb-2">This Month</h4>
                      <div className="flex items-center justify-between">
                        <span className="metallic-gold-subtle font-cormorant">New Leads</span>
                        <span className="text-2xl font-bold metallic-gold font-cinzel">89</span>
                      </div>
                    </div>
                    <div className="bg-maroon-700 p-4 rounded-lg">
                      <h4 className="font-semibold metallic-gold font-cormorant mb-2">Conversion Rate</h4>
                      <div className="flex items-center justify-between">
                        <span className="metallic-gold-subtle font-cormorant">Lead to Booking</span>
                        <span className="text-2xl font-bold metallic-gold font-cinzel">67%</span>
                      </div>
                    </div>
                    <div className="bg-maroon-700 p-4 rounded-lg">
                      <h4 className="font-semibold metallic-gold font-cormorant mb-2">Top Source</h4>
                      <div className="flex items-center justify-between">
                        <span className="metallic-gold-subtle font-cormorant">Website Inquiries</span>
                        <span className="text-2xl font-bold metallic-gold font-cinzel">45%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="mt-8 text-center">
              <Button 
                onClick={() => setIsLoggedIn(false)}
                className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold px-8 py-3"
              >
                Logout
              </Button>
            </div>
          </div>
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
              <Heart className="h-8 w-8 text-gold-400 animate-pulse" />
              <span className="font-cinzel font-bold text-2xl metallic-gold-bright">
                Aaroham
              </span>
            </div>
            <Shield className="h-16 w-16 text-gold-400 mx-auto mb-4 animate-bounce" />
            <CardTitle className="text-2xl font-cinzel metallic-gold">
              Admin Login
            </CardTitle>
            <CardDescription className="metallic-gold-subtle font-cormorant">
              Access administrative dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium metallic-gold-subtle font-cormorant">
                  Admin Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gold-400" />
                  <Input
                    id="email"
                    name="email"
                    type="text"
                    required
                    className="pl-10 bg-maroon-700 border-gold-500 text-gold-200 placeholder:text-gold-300 focus:border-gold-400 transition-all duration-300"
                    placeholder="Enter admin email"
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
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold py-3 transition-all duration-300 hover:scale-105"
              >
                Access Dashboard
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <div className="flex justify-center gap-4">
                <Link to="/customer-login" className="text-sm text-gold-400 hover:text-gold-300 font-cormorant transition-colors">
                  Customer Login
                </Link>
                <span className="text-gold-600">|</span>
                <Link to="/vendor-login" className="text-sm text-gold-400 hover:text-gold-300 font-cormorant transition-colors">
                  Vendor Login
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
