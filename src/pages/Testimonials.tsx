import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Local Guide",
      location: "5 months ago",
      image: "",
      rating: 5,
      text: "I applied for Singapore visa with them and they did everything so smoothly. Visacrony was really helpful and got everything done really fast. Would definitely recommend this company for visa applications!",
      visaType: "Singapore Visa"
    },
    {
      name: "Arjun Patel",
      role: "Local Guide",
      location: "8 months ago",
      image: "",
      rating: 5,
      text: "Great experience with Visacrony. Visacrony from the team guided us through every step of the visa process and was very responsive. Definitely recommend using their services.",
      visaType: "Visa Services"
    },
    {
      name: "Kavya Reddy",
      role: "Customer",
      location: "a year ago",
      image: "",
      rating: 5,
      text: "I got the reference of Visacrony from one of my friends and applied for Singapore and Schengen visa with them. From start to end, Visacrony guided us for all the documents required, what will happen inside the embassy and also helped us with all the bookings. It was overall a very smooth experience. I will highly recommend connecting with Visacrony for visas related queries.",
      visaType: "Singapore & Schengen Visa"
    },
    {
      name: "Rahul Singh",
      role: "Customer",
      location: "2 years ago",
      image: "",
      rating: 5,
      text: "I highly recommend Visacrony for their exceptional visa advisory service. Their team demonstrated professionalism, attention to detail, and personalized assistance throughout the entire process. They were knowledgeable, responsive, and provided clear guidance, ensuring a smooth and successful visa application. With transparent pricing and timely service, Visacrony exceeded my expectations. I wholeheartedly recommend their services to anyone in need of a visa advisor. Also, a special shoutout to Visacrony for being amazing at what they do!!",
      visaType: "Visa Advisory"
    },
    {
      name: "Suresh Kumar",
      role: "Customer",
      location: "2 years ago",
      image: "",
      rating: 5,
      text: "I had an exceptional experience with Visacrony! From start to finish, their visa services exceeded my expectations. The team at Visacrony is not only highly professional but also incredibly knowledgeable about visa processes. Visacrony from the team guided me through every step with patience and clarity, making the otherwise complex procedure seem like a breeze. I highly recommend Visacrony to anyone in need of visa support.",
      visaType: "Visa Services"
    },
    {
      name: "Meera Iyer",
      role: "Customer",
      location: "a year ago",
      image: "",
      rating: 5,
      text: "Visacrony did a great job with helping me get my Schengen visa. Visacrony exceeded all expectations and was available to help throughout the visa process at all times, day or night. Definitely recommend using their services.",
      visaType: "Schengen Visa"
    },
    {
      name: "Deepika Agarwal",
      role: "Customer",
      location: "4 months ago",
      image: "",
      rating: 5,
      text: "Great service by Visacrony, they helped me out with all my queries.",
      visaType: "Visa Services"
    },
    {
      name: "Rajesh Gupta",
      role: "Customer",
      location: "a year ago",
      image: "",
      rating: 5,
      text: "We had a very smooth and hassle free service from them. Visacrony was very helpful and provided all the guidance also, made sure all our requirements are met.",
      visaType: "Visa Services"
    },
    {
      name: "Neha Joshi",
      role: "Customer",
      location: "6 months ago",
      image: "",
      rating: 5,
      text: "Excellent service from Visacrony! They helped me with my UK tourist visa application. The entire process was seamless and their team was very professional. Got my visa approved quickly without any issues. Highly recommended!",
      visaType: "UK Tourist Visa"
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