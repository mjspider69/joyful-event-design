
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Settings, Heart } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut, profile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (!profile?.user_type) return '/customer-dashboard';
    
    switch (profile.user_type) {
      case 'admin':
        return '/admin-dashboard';
      case 'vendor':
        return '/vendor-dashboard';
      default:
        return '/customer-dashboard';
    }
  };

  const navLinks = [
    { href: "/services", label: "Services" },
    { href: "/vendors", label: "Vendors" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-cream-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-600 to-yellow-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-600">
              Aaroham
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-charcoal-700 hover:text-amber-600 transition-colors font-medium ${
                  location.pathname === link.href ? 'text-amber-600' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{profile?.full_name || 'Account'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                    <Settings className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  {profile?.user_type === 'customer' && (
                    <DropdownMenuItem onClick={() => navigate('/customer-dashboard')}>
                      <Heart className="h-4 w-4 mr-2" />
                      My Bookings
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/customer-login')}
                  className="text-charcoal-700 hover:text-amber-600"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/customer-login')}
                  className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white"
                >
                  Get Started
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-cream-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-charcoal-700 hover:text-amber-600 transition-colors px-3 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <>
                  <Link
                    to={getDashboardLink()}
                    className="text-charcoal-700 hover:text-amber-600 transition-colors px-3 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="text-charcoal-700 hover:text-amber-600 transition-colors px-3 py-2 text-left"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/customer-login"
                    className="text-charcoal-700 hover:text-amber-600 transition-colors px-3 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/customer-login"
                    className="bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-3 py-2 rounded-md text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
