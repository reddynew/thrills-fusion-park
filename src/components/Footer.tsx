
import React from 'react';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-10">
      <div className="section-container1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold mb-6">THRILLS<span className="text-secondary">FUSION</span></h3>
            <p className="text-white/80 mb-6">
              Experience the ultimate adventure with our thrilling rides and attractions designed for everyone seeking excitement and fun.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-300 hover:bg-white/20">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-300 hover:bg-white/20">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors duration-300 hover:bg-white/20">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <a href="#home" className="text-white/80 hover:text-white transition-colors duration-200">Home</a>
              </li>
              <li>
                <a href="#thrilling-zones" className="text-white/80 hover:text-white transition-colors duration-200">Thrilling Zones</a>
              </li>
              <li>
                <a href="#reviews" className="text-white/80 hover:text-white transition-colors duration-200">Reviews</a>
              </li>
              <li>
                <a href="#social" className="text-white/80 hover:text-white transition-colors duration-200">Social</a>
              </li>
              <li>
                <a href="#about" className="text-white/80 hover:text-white transition-colors duration-200">About Us</a>
              </li>
            </ul>
          </div>
          
          {/* Operating Hours */}
          <div>
            <h3 className="text-xl font-semibold mb-6">Operating Hours</h3>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span className="text-white/80">Monday - Friday</span>
                <span>10:00 AM - 9:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/80">Saturday</span>
                <span>9:00 AM - 10:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span className="text-white/80">Sunday</span>
                <span>9:00 AM - 8:00 PM</span>
              </li>
              <li className="pt-2">
                <span className="text-secondary">* Holiday hours may vary</span>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div id="location">
            <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-1 text-secondary" />
                <span className="text-white/80">Thrills Fusion opening soon</span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-secondary" />
                <span className="text-white/80">+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-secondary" />
                <a href="mailto:info@thrillsfusion.com">
                  <span className="text-white/80">info@thrillsfusion.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-white/10 mt-12 py-6">
        <div className="container mx-auto px-6 text-center text-white/60">
          <p>&copy; {new Date().getFullYear()} Thrills Fusion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
