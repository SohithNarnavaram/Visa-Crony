import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

const ContactUs = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Our Office",
      details: [
        "Office No. 304, Preet Vihar",
        "New Delhi - 110092",
        "India"
      ]
    },
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [
        "+91 98765 43210 (Main)",
        "+91 98765 43211 (Support)",
        "+91 98765 43212 (Emergency)"
      ]
    },
    {
      icon: Mail,
      title: "Email Address",
      details: [
        "info@visacrony.in",
        "support@visacrony.in",
        "urgent@visacrony.in"
      ]
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: [
        "Monday - Friday: 9:00 AM - 6:00 PM",
        "Saturday: 10:00 AM - 4:00 PM",
        "Sunday: Closed"
      ]
    }
  ];

  const handleWhatsAppClick = () => {
    const phoneNumber = "919876543210"; // Replace with actual WhatsApp business number
    const message = "Hi! I'd like to inquire about visa services.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Contact form submitted');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 animate-fade-in-down">
              Contact Us
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up opacity-90">
              Get in touch with our visa experts today
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Get in Touch
              </h2>
              <p className="text-lg text-muted-foreground">
                Multiple ways to reach us for your convenience
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactInfo.map((info, index) => (
                <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <info.icon className="w-8 h-8 text-secondary-foreground" />
                    </div>
                    <CardTitle className="text-lg">{info.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* WhatsApp Quick Chat */}
            <div className="text-center mb-16">
              <Card className="max-w-md mx-auto bg-green-50 border-green-200">
                <CardHeader>
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-green-700">Quick WhatsApp Chat</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-green-600 mb-4">
                    Get instant support via WhatsApp
                  </p>
                  <Button 
                    onClick={handleWhatsAppClick}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    Chat on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h3 className="text-2xl font-playfair font-bold mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input 
                        id="firstName" 
                        placeholder="Enter your first name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input 
                        id="lastName" 
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      type="tel"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input 
                      id="subject" 
                      placeholder="What is this regarding?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us how we can help you..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Map & Additional Info */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-playfair font-bold mb-6">Find Our Office</h3>
                  
                  {/* Google Map Placeholder */}
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center mb-6">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-muted-foreground">
                        Interactive Google Map
                      </p>
                      <p className="text-sm text-muted-foreground">
                        (Map integration will be added with backend)
                      </p>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        Office Hours
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span className="font-medium">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span className="font-medium">10:00 AM - 4:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span className="font-medium text-red-500">Closed</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Emergency Contact */}
                <Card className="bg-red-50 border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-700">Emergency Contact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-red-600 mb-2">
                      For urgent visa matters outside business hours:
                    </p>
                    <p className="font-semibold text-red-700">
                      +91 98765 43212
                    </p>
                    <p className="text-sm text-red-600 mt-2">
                      *Emergency services may incur additional charges
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-6 text-left">
              <div className="space-y-4">
                <h4 className="font-semibold">How long does visa processing take?</h4>
                <p className="text-muted-foreground">
                  Processing times vary by country and visa type, typically ranging from 3-30 days. 
                  We provide specific timelines for each application.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Do you guarantee visa approval?</h4>
                <p className="text-muted-foreground">
                  While we can't guarantee approval, our expert guidance significantly increases 
                  your chances of success with a 95% approval rate.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">What documents do I need?</h4>
                <p className="text-muted-foreground">
                  Required documents vary by destination and visa type. We provide a 
                  comprehensive checklist after your consultation.
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">Can I track my application status?</h4>
                <p className="text-muted-foreground">
                  Yes! We provide regular updates and you can track your application 
                  status through our online portal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;