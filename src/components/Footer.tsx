
import { Heart, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-maroon-950 text-gold-300 border-t border-gold-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 font-cinzel font-bold text-3xl text-gold-400 mb-4">
              <Heart className="h-8 w-8" />
              Aaroham
            </Link>
            <p className="text-gold-200 mb-4 font-cormorant text-lg">
              India's most trusted event planning platform. Making your dream events a reality with royal elegance.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-6 w-6 text-gold-300 hover:text-gold-400 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gold-300 hover:text-gold-400 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gold-300 hover:text-gold-400 cursor-pointer transition-colors" />
              <Youtube className="h-6 w-6 text-gold-300 hover:text-gold-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-cinzel font-semibold text-xl mb-4 text-gold-400">Services</h3>
            <ul className="space-y-2 text-gold-200 font-cormorant text-lg">
              <li><Link to="/services" className="hover:text-gold-400 transition-colors">Event Photography</Link></li>
              <li><Link to="/services" className="hover:text-gold-400 transition-colors">Event Venues</Link></li>
              <li><Link to="/services" className="hover:text-gold-400 transition-colors">Event Planners</Link></li>
              <li><Link to="/services" className="hover:text-gold-400 transition-colors">Catering Services</Link></li>
              <li><Link to="/services" className="hover:text-gold-400 transition-colors">Decoration Services</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-cinzel font-semibold text-xl mb-4 text-gold-400">Quick Links</h3>
            <ul className="space-y-2 text-gold-200 font-cormorant text-lg">
              <li><Link to="/about" className="hover:text-gold-400 transition-colors">About Us</Link></li>
              <li><Link to="/vendors" className="hover:text-gold-400 transition-colors">Find Vendors</Link></li>
              <li><Link to="/gallery" className="hover:text-gold-400 transition-colors">Event Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-gold-400 transition-colors">Event Blog</Link></li>
              <li><Link to="/contact" className="hover:text-gold-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-cinzel font-semibold text-xl mb-4 text-gold-400">Contact Us</h3>
            <div className="space-y-2 text-gold-200 font-cormorant text-lg">
              <p>📍 123 Royal Street, Mumbai, India</p>
              <p>📞 +91 9876543210</p>
              <p>✉️ hello@aaroham.in</p>
              <p className="text-base pt-2">
                Mon - Sat: 9:00 AM - 6:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gold-600 mt-8 pt-8 text-center text-gold-400 font-cormorant text-lg">
          <p>&copy; 2024 Aaroham. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
