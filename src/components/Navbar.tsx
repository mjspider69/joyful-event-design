
import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-pink-500">
            <Heart className="h-8 w-8" />
            WedPlanner
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="hover:text-pink-500 transition-colors">
              Home
            </Link>
            <Link to="/services" className="hover:text-pink-500 transition-colors">
              Services
            </Link>
            <Link to="/vendors" className="hover:text-pink-500 transition-colors">
              Vendors
            </Link>
            <Link to="/gallery" className="hover:text-pink-500 transition-colors">
              Gallery
            </Link>
            <Link to="/blog" className="hover:text-pink-500 transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="hover:text-pink-500 transition-colors">
              Contact
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline">
              Sign In
            </Button>
            <Button className="bg-pink-500 hover:bg-pink-600">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t bg-white">
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="hover:text-pink-500 transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="hover:text-pink-500 transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/vendors" 
                className="hover:text-pink-500 transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Vendors
              </Link>
              <Link 
                to="/gallery" 
                className="hover:text-pink-500 transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/blog" 
                className="hover:text-pink-500 transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className="hover:text-pink-500 transition-colors px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-2 px-4 pt-4 border-t">
                <Button variant="outline" className="w-full">
                  Sign In
                </Button>
                <Button className="w-full bg-pink-500 hover:bg-pink-600">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
