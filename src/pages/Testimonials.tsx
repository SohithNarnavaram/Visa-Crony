import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Sarah Mitchell",
      role: "Business Executive",
      location: "New York, USA",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "VisaCrony made my UK business visa application incredibly smooth. Their team guided me through every step, and I received my visa in just 3 weeks. Highly recommended for anyone seeking professional visa assistance!",
      visaType: "UK Business Visa"
    },
    {
      name: "Rajesh Patel",
      role: "Software Engineer",
      location: "Mumbai, India",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Exceptional service! I was worried about my US tourist visa application, but VisaCrony's experts made it stress-free. Clear communication, transparent pricing, and fast processing. Will definitely use their services again.",
      visaType: "US Tourist Visa"
    },
    {
      name: "Maria Rodriguez",
      role: "Travel Blogger",
      location: "Madrid, Spain",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "I've used VisaCrony for multiple visa applications - Australia, Canada, and Japan. Each time, they exceeded my expectations. Their attention to detail and personalized service is unmatched.",
      visaType: "Multiple Visas"
    },
    {
      name: "David Chen",
      role: "Marketing Manager",
      location: "Singapore",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The team at VisaCrony helped me with my Schengen visa for a European business trip. The process was seamless, and their follow-up was excellent. I got my visa approved without any hassles.",
      visaType: "Schengen Visa"
    },
    {
      name: "Lisa Thompson",
      role: "Photographer",
      location: "Sydney, Australia",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Professional, reliable, and efficient! VisaCrony helped me get my Indian e-visa quickly for a photography assignment. Their online portal made tracking the application progress easy and convenient.",
      visaType: "India e-Visa"
    },
    {
      name: "Ahmed Hassan",
      role: "Business Owner",
      location: "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "I needed a Canada visitor visa for a family wedding, and time was running out. VisaCrony expedited my application and kept me informed throughout. They saved the day! Excellent customer service.",
      visaType: "Canada Visitor Visa"
    },
    {
      name: "Emily Watson",
      role: "Teacher",
      location: "London, UK",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "My passport renewal was handled perfectly by VisaCrony. They picked up my documents, handled everything, and delivered my new passport on time. Stress-free experience from start to finish.",
      visaType: "Passport Renewal"
    },
    {
      name: "Michael Chang",
      role: "Consultant",
      location: "Toronto, Canada",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Outstanding service! The VisaCrony team helped me navigate the complex German business visa requirements. Their expertise and guidance made all the difference. Highly professional throughout.",
      visaType: "Germany Business Visa"
    },
    {
      name: "Priya Sharma",
      role: "Student",
      location: "Delhi, India",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "I was nervous about my first international visa application for Australia. VisaCrony's team was patient, helpful, and made sure I understood every step. Got my visa approved on the first try!",
      visaType: "Australia Tourist Visa"
    }
  ];

  const stats = [
    { number: "1500+", label: "Visas Processed" },
    { number: "95%", label: "Success Rate" },
    { number: "4.9/5", label: "Customer Rating" },
    { number: "50+", label: "Countries Covered" }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-secondary text-secondary' : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-accent to-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 animate-fade-in-down text-primary-foreground">
              Client Stories
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up text-primary-foreground/90">
              See what our clients say about their VisaCrony experience
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-secondary mb-2">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                What Our Clients Say
              </h2>
              <p className="text-lg text-muted-foreground">
                Real experiences from real people who trusted us with their visa journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="h-full group hover:shadow-lg transition-all duration-300">
                  <CardHeader className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {renderStars(testimonial.rating)}
                      </div>
                      <span className="text-xs bg-secondary/10 text-secondary px-2 py-1 rounded-full">
                        {testimonial.visaType}
                      </span>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="relative">
                      <Quote className="w-6 h-6 text-secondary/20 absolute -top-2 -left-1" />
                      <p className="text-muted-foreground italic pl-4">
                        "{testimonial.text}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-foreground">
              Ready to Start Your Visa Journey?
            </h2>
            <p className="text-lg mb-8 text-foreground/80">
              Join thousands of satisfied customers who trusted VisaCrony with their visa applications
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                Start Your Application
              </Button>
              <Link to="/contact">
                <Button variant="outline" size="lg" className="border-foreground text-foreground hover:bg-foreground hover:text-background">
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;