import { Button } from "@/components/ui/button";
import { Heart, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-maroon-900/95 backdrop-blur-sm border-b border-gold-400">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-cinzel font-bold text-3xl metallic-gold-bright glitter-text">
            <Heart className="h-8 w-8" />
            Aaroham
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 font-cormorant text-lg">
            <Link to="/" className="metallic-gold-subtle hover:metallic-gold transition-all">
              Home
            </Link>
            <Link to="/services" className="metallic-gold-subtle hover:metallic-gold transition-all">
              Services
            </Link>
            <Link to="/vendors" className="metallic-gold-subtle hover:metallic-gold transition-all">
              Vendors
            </Link>
            <Link to="/gallery" className="metallic-gold-subtle hover:metallic-gold transition-all">
              Gallery
            </Link>
            <Link to="/blog" className="metallic-gold-subtle hover:metallic-gold transition-all">
              Blog
            </Link>
            <Link to="/contact" className="metallic-gold-subtle hover:metallic-gold transition-all">
              Contact
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="outline" className="border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant">
              Sign In
            </Button>
            <Button className="bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gold-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gold-400 bg-maroon-900">
            <div className="flex flex-col gap-4 font-cormorant text-lg">
              <Link 
                to="/" 
                className="metallic-gold-subtle hover:metallic-gold transition-all px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/services" 
                className="metallic-gold-subtle hover:metallic-gold transition-all px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/vendors" 
                className="metallic-gold-subtle hover:metallic-gold transition-all px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Vendors
              </Link>
              <Link 
                to="/gallery" 
                className="metallic-gold-subtle hover:metallic-gold transition-all px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/blog" 
                className="metallic-gold-subtle hover:metallic-gold transition-all px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className="metallic-gold-subtle hover:metallic-gold transition-all px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="flex flex-col gap-2 px-4 pt-4 border-t border-gold-400">
                <Button variant="outline" className="w-full border-gold-400 text-gold-400 hover:bg-gold-400 hover:text-maroon-900 font-cormorant">
                  Sign In
                </Button>
                <Button className="w-full bg-gold-500 hover:bg-gold-600 text-maroon-900 font-cormorant font-semibold">
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