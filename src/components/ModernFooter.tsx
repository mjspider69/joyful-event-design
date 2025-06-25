
import React from 'react';
import { Heart, Mail, Phone, MapPin, Calendar, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SocialLinks } from './ui/social-links';
import { Button } from './ui/button';

const ModernFooter = () => {
  return (
    <footer className="primary-gradient text-elegant-700">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="h-10 w-10 text-luxury-600 animate-pulse" />
              <span className="font-cinzel font-bold text-3xl metallic-luxury">Aaroham</span>
            </div>
            <p className="text-elegant-600 font-cormorant text-lg leading-relaxed mb-8 max-w-md">
              Creating unforgettable moments and magical celebrations across India. 
              Your dream event is our passion.
            </p>
            
            {/* Contact info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-luxury-600" />
                <a href="tel:+919176988931" className="text-elegant-600 hover:text-elegant-800 transition-colors font-cormorant">
                  +91 9176988931
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-luxury-600" />
                <a href="mailto:aaroham.net@gmail.com" className="text-elegant-600 hover:text-elegant-800 transition-colors font-cormorant">
                  aaroham.net@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-luxury-600" />
                <span className="text-elegant-600 font-cormorant">Mumbai, India</span>
              </div>
            </div>

            {/* Social links */}
            <div>
              <p className="text-primary-600 font-cormorant mb-4">Follow Our Journey</p>
              <SocialLinks variant="horizontal" size="lg" showLabels={false} />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-cinzel font-semibold text-xl metallic-primary mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-elegant-600 hover:text-elegant-800 transition-colors font-cormorant flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-elegant-600 hover:text-elegant-800 transition-colors font-cormorant flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Services
                </Link>
              </li>
              <li>
                <Link to="/vendors" className="text-elegant-600 hover:text-elegant-800 transition-colors font-cormorant flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Vendors
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-elegant-600 hover:text-elegant-800 transition-colors font-cormorant flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Plan Event
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-elegant-600 hover:text-elegant-800 transition-colors font-cormorant">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-elegant-600 hover:text-elegant-800 transition-colors font-cormorant">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services & Careers */}
          <div>
            <h3 className="font-cinzel font-semibold text-xl metallic-primary mb-6">Services</h3>
            <ul className="space-y-3 mb-8">
              <li><span className="text-elegant-600 font-cormorant">Wedding Planning</span></li>
              <li><span className="text-elegant-600 font-cormorant">Photography</span></li>
              <li><span className="text-elegant-600 font-cormorant">Catering</span></li>
              <li><span className="text-elegant-600 font-cormorant">Decoration</span></li>
              <li><span className="text-elegant-600 font-cormorant">Entertainment</span></li>
            </ul>

            <h4 className="font-cinzel font-semibold text-lg metallic-primary mb-4">Work With Us</h4>
            <div className="space-y-2">
              <a 
                href="mailto:withaaroham@aaroham" 
                className="text-elegant-600 hover:text-elegant-800 transition-colors font-cormorant text-sm block"
              >
                Jobs & Internships
              </a>
              <Link 
                to="/vendor-login" 
                className="text-elegant-600 hover:text-elegant-800 transition-colors font-cormorant text-sm block"
              >
                Join as Vendor
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter section */}
      <div className="border-t border-luxury-200 bg-primary-100/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-cinzel font-semibold text-xl metallic-primary mb-2">Stay Updated</h3>
              <p className="text-elegant-600 font-cormorant">Get latest updates on new vendors and special offers</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-2 bg-white border border-luxury-200 rounded-lg text-elegant-700 placeholder:text-elegant-400 focus:outline-none focus:border-luxury-500"
              />
              <Button className="bg-luxury-500 hover:bg-luxury-600 text-white font-cormorant font-semibold px-6">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-luxury-200 bg-primary-200/30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-elegant-600 font-cormorant text-center md:text-left">
              © 2024 Aaroham. All rights reserved. Made with ❤️ for unforgettable celebrations.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-elegant-600 hover:text-elegant-800 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-elegant-600 hover:text-elegant-800 transition-colors">
                Terms of Service
              </Link>
              <Link to="/refund" className="text-elegant-600 hover:text-elegant-800 transition-colors">
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
