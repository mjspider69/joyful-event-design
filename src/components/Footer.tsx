
import { Heart, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-pink-400 mb-4">
              <Heart className="h-8 w-8" />
              WedPlanner
            </Link>
            <p className="text-gray-300 mb-4">
              India's most trusted wedding planning platform. Making your dream wedding a reality.
            </p>
            <div className="flex gap-4">
              <Facebook className="h-6 w-6 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
              <Instagram className="h-6 w-6 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
              <Twitter className="h-6 w-6 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
              <Youtube className="h-6 w-6 text-gray-400 hover:text-pink-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/services" className="hover:text-pink-400 transition-colors">Wedding Photography</Link></li>
              <li><Link to="/services" className="hover:text-pink-400 transition-colors">Wedding Venues</Link></li>
              <li><Link to="/services" className="hover:text-pink-400 transition-colors">Wedding Planners</Link></li>
              <li><Link to="/services" className="hover:text-pink-400 transition-colors">Catering Services</Link></li>
              <li><Link to="/services" className="hover:text-pink-400 transition-colors">Bridal Makeup</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link to="/about" className="hover:text-pink-400 transition-colors">About Us</Link></li>
              <li><Link to="/vendors" className="hover:text-pink-400 transition-colors">Find Vendors</Link></li>
              <li><Link to="/gallery" className="hover:text-pink-400 transition-colors">Wedding Gallery</Link></li>
              <li><Link to="/blog" className="hover:text-pink-400 transition-colors">Wedding Blog</Link></li>
              <li><Link to="/contact" className="hover:text-pink-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-2 text-gray-300">
              <p>📍 123 Wedding Street, Mumbai, India</p>
              <p>📞 +91 9876543210</p>
              <p>✉️ hello@wedplanner.in</p>
              <p className="text-sm pt-2">
                Mon - Sat: 9:00 AM - 6:00 PM<br />
                Sunday: Closed
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 WedPlanner. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
