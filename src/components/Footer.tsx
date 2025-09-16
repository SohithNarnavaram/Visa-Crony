import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Visa Services', href: '/visa-services' },
    { name: 'Passport Services', href: '/passport-services' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact Us', href: '/contact' }
  ];

  return (
    <footer className="bg-card border-t transition-colors duration-300">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">V</span>
              </div>
              <div>
                <h3 className="text-xl font-playfair font-bold">VisaCrony</h3>
                <p className="text-xs text-muted-foreground">Premium Visa Partner</p>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for seamless visa processing. Making your global journey possible with expert guidance and exceptional service.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 bg-muted hover:bg-secondary rounded-lg flex items-center justify-center text-muted-foreground hover:text-white transition-all duration-300"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-secondary">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href}
                    className="text-sm text-muted-foreground hover:text-secondary transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-secondary">Our Services</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-muted-foreground">Tourist Visa</span></li>
              <li><span className="text-sm text-muted-foreground">Business Visa</span></li>
              <li><span className="text-sm text-muted-foreground">E-Visa Services</span></li>
              <li><span className="text-sm text-muted-foreground">Visa Consultation</span></li>
              <li><span className="text-sm text-muted-foreground">Document Assistance</span></li>
            </ul>
          </div>

          {/* Popular Destinations */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-secondary">Popular Destinations</h4>
            <ul className="space-y-2">
              <li><span className="text-sm text-muted-foreground">United States</span></li>
              <li><span className="text-sm text-muted-foreground">United Kingdom</span></li>
              <li><span className="text-sm text-muted-foreground">Canada</span></li>
              <li><span className="text-sm text-muted-foreground">Australia</span></li>
              <li><span className="text-sm text-muted-foreground">Schengen Countries</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p>&copy; {currentYear} VisaCrony. All rights reserved.</p>
              <div className="flex gap-4">
                <Link to="#" className="hover:text-secondary transition-colors">Privacy Policy</Link>
                <Link to="#" className="hover:text-secondary transition-colors">Terms of Service</Link>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-xs">Licensed Travel Agent | IATA Certified</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;