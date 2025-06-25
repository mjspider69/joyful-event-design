
import React from 'react';
import { Heart, Mail, Phone, MapPin, Calendar, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SocialLinks } from './ui/social-links';
import { Button } from './ui/button';

const ModernFooter = () => {
  return (
    <footer className="bg-charcoal-900 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-coral-500 rounded-2xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white animate-pulse" />
              </div>
              <span className="font-playfair font-bold text-3xl text-white">Aaroham</span>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-md">
              Creating unforgettable moments and magical celebrations across India. 
              Your dream event is our passion, and perfection is our promise.
            </p>
            
            {/* Contact info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sage-500 rounded-xl flex items-center justify-center">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <a href="tel:+919176988931" className="text-gray-300 hover:text-white transition-colors text-lg">
                  +91 9176988931
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-coral-500 rounded-xl flex items-center justify-center">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <a href="mailto:aaroham.net@gmail.com" className="text-gray-300 hover:text-white transition-colors text-lg">
                  aaroham.net@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-cream-500 rounded-xl flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span className="text-gray-300 text-lg">Mumbai, India</span>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-white font-semibold mb-4 text-lg">Follow Our Journey</p>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                <SocialLinks variant="horizontal" size="lg" showLabels={false} />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-bold text-xl text-white mb-8">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="text-gray-300 hover:text-coral-400 transition-colors flex items-center gap-3 text-lg group">
                  <Heart className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-300 hover:text-coral-400 transition-colors flex items-center gap-3 text-lg group">
                  <Star className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  Services
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="text-gray-300 hover:text-coral-400 transition-colors flex items-center gap-3 text-lg group">
                  <Users className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  Vendors
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-coral-400 transition-colors flex items-center gap-3 text-lg group">
                  <Calendar className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  Plan Event
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-300 hover:text-coral-400 transition-colors text-lg">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-coral-400 transition-colors text-lg">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Careers */}
          <div>
            <h3 className="font-playfair font-bold text-xl text-white mb-8">Services</h3>
            <ul className="space-y-3 mb-8">
              <li><span className="text-gray-300 text-lg">Wedding Planning</span></li>
              <li><span className="text-gray-300 text-lg">Photography</span></li>
              <li><span className="text-gray-300 text-lg">Catering</span></li>
              <li><span className="text-gray-300 text-lg">Decoration</span></li>
              <li><span className="text-gray-300 text-lg">Entertainment</span></li>
            </ul>

            <h4 className="font-playfair font-bold text-lg text-white mb-6">Work With Us</h4>
            <div className="space-y-3">
              <a 
                href="mailto:withaaroham@aaroham" 
                className="text-gray-300 hover:text-sage-400 transition-colors block text-lg"
              >
                Jobs & Internships
              </a>
              <Link 
                to="/vendor-login" 
                className="text-gray-300 hover:text-sage-400 transition-colors block text-lg"
              >
                Join as Vendor
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="border-t border-gray-700 bg-charcoal-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-playfair font-bold text-xl text-white mb-2">Stay Updated</h3>
              <p className="text-gray-300 text-lg">Get latest updates on new vendors and special offers</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-6 py-3 bg-white border-2 border-gray-300 rounded-xl text-charcoal-800 placeholder:text-gray-500 focus:outline-none focus:border-coral-500 text-lg"
              />
              <Button className="btn-primary font-bold px-8 py-3 text-lg rounded-xl">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 bg-charcoal-950">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-400 text-center md:text-left text-lg">
              © 2024 Aaroham. All rights reserved. Made with ❤️ for unforgettable celebrations.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-lg">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-lg">
                Terms of Service
              </Link>
              <Link to="/refund" className="text-gray-400 hover:text-white transition-colors text-lg">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;
