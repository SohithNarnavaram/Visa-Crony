import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Circle } from 'lucide-react';

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
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-4">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="mb-3">
              <img 
                src="/image_2025-10-04_105951448-removebg-preview.png" 
                alt="VisaCrony Logo" 
                className="w-full max-w-48 object-contain"
              />
            </div>
            
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your trusted partner for seamless visa processing. Making your global journey possible with expert guidance and exceptional service.
            </p>

            {/* Social Media */}
            <div className="flex gap-3 mt-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: 'https://www.instagram.com/visacrony?igsh=MWxzbTMyNXp5cmZzdQ==', label: 'Instagram' },
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
          <div className="space-y-3">
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
          <div className="space-y-3">
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
          <div className="space-y-3">
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
              <div className="flex gap-4 items-center">
                <Link to="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
                <div className="flex items-center gap-2">
                  <Link to="/terms-of-service" className="hover:text-secondary transition-colors">Terms of Service</Link>
                  <Link 
                    to="/seo-keywords" 
                    className="hover:text-secondary transition-colors"
                    title="SEO Keywords & Services"
                  >
                    <Circle className="w-2 h-2 fill-current" />
                  </Link>
                </div>
              </div>
            </div>
            
              <div className="text-center md:text-right">
                <p className="text-xs">Licensed Travel Agent</p>
              </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;