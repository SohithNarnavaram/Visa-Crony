import React from 'react';
import { Plane, FileText, Clock, Shield, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Home = () => {
  const quickLinks = [
    { icon: Plane, title: 'Tourist Visa', href: '/visa-services' },
    { icon: FileText, title: 'Business Visa', href: '/visa-services' },
    { icon: FileText, title: 'Passport Services', href: '/passport-services' }
  ];

  const highlights = [
    { icon: Clock, title: 'Fast Processing', desc: '3-21 days processing time' },
    { icon: Shield, title: 'Trusted Partner', desc: '95% success rate' },
    { icon: Star, title: '24/7 Assistance', desc: 'Round-the-clock support' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center hero-bg">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-5xl md:text-7xl font-playfair font-bold mb-6 drop-shadow-lg">
              Your Trusted Travel & Visa Partner
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90 drop-shadow-md">
              Quick Enquiry, Seamless Booking
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 animate-fade-in animate-stagger-1">
              <Link to="/visa-services">
                <Button size="lg" className="bg-background text-foreground hover:bg-background/90 hover-scale">
                  Find Your Visa
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 hover-scale bg-transparent">
                  Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Bouncing Scroll Down Button */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button
            onClick={() => {
              document.getElementById('popular-services-section')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }}
            className="w-10 h-10 bg-white/20 backdrop-blur-sm border-2 border-white/40 rounded-full flex items-center justify-center hover:bg-white/30 hover:border-white/60 transition-all duration-300 hover:scale-110 shadow-lg hover:shadow-xl"
            aria-label="Scroll down"
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 16l-6-6h12z"/>
            </svg>
          </button>
        </div>
      </section>

      {/* Quick Links */}
      <section id="popular-services-section" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-playfair font-bold text-center mb-12">Popular Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {quickLinks.map((link, index) => (
                <Link key={index} to={link.href}>
                  <Card className="text-center group hover:shadow-lg transition-all duration-300 cursor-pointer">
                    <CardHeader>
                      <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <link.icon className="w-8 h-8 text-secondary-foreground" />
                      </div>
                      <CardTitle className="group-hover:text-secondary transition-colors">
                        {link.title}
                      </CardTitle>
                    </CardHeader>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 animate-fade-in animate-stagger-2">
              {highlights.map((item, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto">
                    <item.icon className="w-10 h-10 text-accent-foreground" />
                  </div>
                  <h3 className="text-xl font-playfair font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-secondary-foreground">
              Start Your Visa Journey Today
            </h2>
            <Link to="/visa-services">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Explore Visa Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;