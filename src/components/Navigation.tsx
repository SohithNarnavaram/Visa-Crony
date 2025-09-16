import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Visa Services', href: '/visa-services' },
    { name: 'Passport Services', href: '/passport-services' },
    { name: 'Testimonials', href: '/testimonials' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main Navigation */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
              <span className="text-lg font-bold text-white">V</span>
            </div>
            <div>
              <h1 className="text-xl font-playfair font-bold">VisaCrony</h1>
              <p className="text-xs text-muted-foreground">Premium Visa Partner</p>
            </div>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors story-link ${
                    isActive 
                      ? 'text-secondary after:scale-x-100 after:bg-secondary/60' 
                      : 'text-foreground hover:text-secondary'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Theme Toggle & CTA Button & Mobile Menu */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button className="hidden md:inline-flex">
              Get Started
            </Button>
            
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors story-link ${
                      isActive 
                        ? 'text-secondary after:scale-x-100 after:bg-secondary/60' 
                        : 'text-foreground hover:text-secondary'
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              <Button className="w-fit mt-4">
                Get Started
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navigation;