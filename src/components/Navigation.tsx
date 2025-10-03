import React, { useState } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavLink } from 'react-router-dom';
import ThemeToggle from '@/components/ThemeToggle';
import Logo from '@/components/Logo';

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
    <header className="relative sticky top-0 z-50">
      {/* Background Image - Desktop */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat hidden sm:block"
        style={{
          backgroundImage: 'url(/mainworldmap.jpg)',
          backgroundPosition: 'center top'
        }}
      />
      {/* Background Image - Mobile */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat block sm:hidden"
        style={{
          backgroundImage: 'url(/phoneworldmap.jpg)',
          backgroundPosition: 'center top',
          backgroundColor: 'rgba(255, 0, 0, 0.1)' // Temporary red tint to verify mobile div is active
        }}
      />
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      
      {/* Navigation Content */}
      <div className="relative z-10 bg-background/95 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4">
        {/* Main Navigation */}
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <NavLink to="/" className="transition-opacity hover:opacity-80">
            <Logo size="md" />
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
          <div className="lg:hidden py-4 border-t bg-background/95 backdrop-blur-md">
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
      </div>
    </header>
  );
};

export default Navigation;