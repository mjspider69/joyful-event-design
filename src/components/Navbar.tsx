
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Menu, X, User, Building, Shield, LogIn } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    window.addEventListener('scroll', handleScroll);
    checkUser();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate('/');
  };

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/vendors', label: 'Vendors' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gold-200' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <Heart className={`h-8 w-8 transition-colors duration-300 ${
              isScrolled ? 'text-maroon-600 group-hover:text-maroon-700' : 'text-gold-400 group-hover:text-gold-300'
            }`} />
            <span className={`font-cinzel font-bold text-2xl transition-colors duration-300 ${
              isScrolled ? 'text-maroon-900' : 'text-gold-100'
            }`}>
              Aaroham
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative font-cormorant font-medium text-lg transition-colors duration-300 group ${
                  isActivePath(item.path)
                    ? isScrolled 
                      ? 'text-maroon-900' 
                      : 'text-gold-100'
                    : isScrolled 
                      ? 'text-gray-700 hover:text-maroon-900' 
                      : 'text-gold-200 hover:text-gold-100'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isActivePath(item.path) || isScrolled ? 'bg-gold-500' : 'bg-gold-300'
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className={`font-cormorant ${isScrolled ? 'text-maroon-900' : 'text-gold-200'}`}>
                  Welcome back!
                </span>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className={`font-cormorant transition-all duration-300 ${
                    isScrolled 
                      ? 'border-maroon-600 text-maroon-600 hover:bg-maroon-600 hover:text-white' 
                      : 'border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900'
                  }`}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Link to="/customer-login">
                    <Button
                      variant="ghost"
                      className={`font-cormorant transition-all duration-300 ${
                        isScrolled 
                          ? 'text-gray-700 hover:text-maroon-900 hover:bg-gray-100' 
                          : 'text-gold-200 hover:text-gold-100 hover:bg-white/10'
                      }`}
                    >
                      <User className="h-4 w-4 mr-2" />
                      Customer
                    </Button>
                  </Link>
                  <Link to="/vendor-login">
                    <Button
                      variant="ghost"
                      className={`font-cormorant transition-all duration-300 ${
                        isScrolled 
                          ? 'text-gray-700 hover:text-maroon-900 hover:bg-gray-100' 
                          : 'text-gold-200 hover:text-gold-100 hover:bg-white/10'
                      }`}
                    >
                      <Building className="h-4 w-4 mr-2" />
                      Vendor
                    </Button>
                  </Link>
                  <Link to="/admin-login">
                    <Button
                      variant="ghost"
                      className={`font-cormorant transition-all duration-300 ${
                        isScrolled 
                          ? 'text-gray-700 hover:text-maroon-900 hover:bg-gray-100' 
                          : 'text-gold-200 hover:text-gold-100 hover:bg-white/10'
                      }`}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Admin
                    </Button>
                  </Link>
                </div>
                <Link to="/booking">
                  <Button className={`font-cormorant font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isScrolled 
                      ? 'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-maroon-900' 
                      : 'bg-gradient-to-r from-gold-400 to-gold-500 hover:from-gold-500 hover:to-gold-600 text-maroon-900'
                  }`}>
                    Plan My Event
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors duration-300 ${
              isScrolled 
                ? 'text-maroon-900 hover:bg-gray-100' 
                : 'text-gold-200 hover:bg-white/10'
            }`}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-gold-200 shadow-lg">
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block font-cormorant font-medium text-lg transition-colors duration-300 ${
                    isActivePath(item.path) 
                      ? 'text-maroon-900' 
                      : 'text-gray-700 hover:text-maroon-900'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gold-200">
                {user ? (
                  <Button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    variant="outline"
                    className="w-full border-maroon-600 text-maroon-600 hover:bg-maroon-600 hover:text-white font-cormorant"
                  >
                    Logout
                  </Button>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      <Link to="/customer-login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full text-xs border-gray-300 text-gray-700 hover:bg-gray-100">
                          <User className="h-3 w-3 mr-1" />
                          Customer
                        </Button>
                      </Link>
                      <Link to="/vendor-login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full text-xs border-gray-300 text-gray-700 hover:bg-gray-100">
                          <Building className="h-3 w-3 mr-1" />
                          Vendor
                        </Button>
                      </Link>
                      <Link to="/admin-login" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button variant="outline" size="sm" className="w-full text-xs border-gray-300 text-gray-700 hover:bg-gray-100">
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </Button>
                      </Link>
                    </div>
                    <Link to="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-maroon-900 font-cormorant font-semibold">
                        Plan My Event
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
