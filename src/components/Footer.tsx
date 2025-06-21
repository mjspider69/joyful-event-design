import { Heart, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-maroon-950 border-t border-gold-400">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 font-cinzel font-bold text-3xl metallic-gold-bright glitter-text mb-4">
              <Heart className="h-8 w-8" />
              Aaroham
            </Link>
            <p className="mb-4 font-cormorant text-lg metallic-gold-subtle">
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
            <h3 className="font-cinzel font-semibold text-xl mb-4 metallic-gold">Services</h3>
            <ul className="space-y-2 font-cormorant text-lg">
              <li><Link to="/services" className="metallic-gold-subtle hover:metallic-gold transition-all">Event Photography</Link></li>
              <li><Link to="/services" className="metallic-gold-subtle hover:metallic-gold transition-all">Event Venues</Link></li>
              <li><Link to="/services" className="metallic-gold-subtle hover:metallic-gold transition-all">Event Planners</Link></li>
              <li><Link to="/services" className="metallic-gold-subtle hover:metallic-gold transition-all">Catering Services</Link></li>
              <li><Link to="/services" className="metallic-gold-subtle hover:metallic-gold transition-all">Decoration Services</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-cinzel font-semibold text-xl mb-4 metallic-gold">Quick Links</h3>
            <ul className="space-y-2 font-cormorant text-lg">
              <li><Link to="/about" className="metallic-gold-subtle hover:metallic-gold transition-all">About Us</Link></li>
              <li><Link to="/vendors" className="metallic-gold-subtle hover:metallic-gold transition-all">Find Vendors</Link></li>
              <li><Link to="/gallery" className="metallic-gold-subtle hover:metallic-gold transition-all">Event Gallery</Link></li>
              <li><Link to="/blog" className="metallic-gold-subtle hover:metallic-gold transition-all">Event Blog</Link></li>
              <li><Link to="/contact" className="metallic-gold-subtle hover:metallic-gold transition-all">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-cinzel font-semibold text-xl mb-4 metallic-gold">Contact Us</h3>
            <div className="space-y-2 font-cormorant text-lg metallic-gold-subtle">
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

        <div className="border-t border-gold-600 mt-8 pt-8 text-center font-cormorant text-lg metallic-gold-subtle">
          <p>&copy; 2024 Aaroham. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;