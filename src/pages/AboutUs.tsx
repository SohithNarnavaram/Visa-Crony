import React from 'react';
import { Award, Shield, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const features = [
    {
      icon: Shield,
      title: "Trusted Partner",
      description: "Over 5 years of experience helping thousands of travelers"
    },
    {
      icon: Clock,
      title: "Fast Processing",
      description: "Quick visa processing with transparent timelines"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Dedicated visa specialists for personalized assistance"
    },
    {
      icon: Award,
      title: "Industry Leader",
      description: "Recognized for excellence in visa consultation services"
    }
  ];

  // Team section removed per latest content update

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 animate-fade-in-down">
              About VisaCrony
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up opacity-90">
              Your trusted partner in making global travel dreams come true
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At VisaCrony, we believe that everyone deserves the opportunity to explore the world. 
              Our mission is to simplify the visa application process, making international travel 
              accessible and stress-free for all our clients. We combine expertise, technology, 
              and personalized service to deliver exceptional results.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-secondary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">Our Story</h2>
            <div className="prose prose-lg max-w-none" style={{ textAlign: 'justify' }}>
              <p className="text-lg leading-relaxed mb-6 text-center">
                Every great journey begins with a single step, and ours began with a shared dream.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                After years of working in the travel and visa consultancy industry, our core team realized one simple truth: people don’t just need a visa service, they need clarity, guidance, and trust. Too often, applicants struggled with confusing paperwork, changing embassy rules, or hidden charges. We wanted to change that. That’s how our journey started.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                With a blend of experience, passion, and dedication, we built our own platform, an online space where visa solutions are made simple, transparent, and accessible. From tourist visas to business visas, we designed our services to guide clients step by step, ensuring a smooth and stress-free process.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                What sets us apart is not just our expertise, but our approach. We believe in personalized support, timely updates, and honest communication. For us, it’s not about processing applications—it’s about making travel dreams possible.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                Today, what began as a small idea has grown into a trusted partner for hundreds of clients. And this is just the beginning of our story.
              </p>
              <p className="text-lg leading-relaxed">
                At the heart of everything we do lies our promise: Your journey matters to us, and we’re here to make it happen.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Values Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12">Our Values</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-secondary">Transparency</h3>
                <p className="text-muted-foreground">
                  Clear pricing, honest timelines, and open communication throughout your journey.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-secondary">Excellence</h3>
                <p className="text-muted-foreground">
                  We strive for perfection in every application, ensuring the highest success rates.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-secondary">Innovation</h3>
                <p className="text-muted-foreground">
                  Continuously improving our processes and technology to serve you better.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-secondary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6 text-secondary-foreground">
              Ready to Start Your Journey?
            </h2>
            <p className="text-lg mb-8 text-secondary-foreground/90">
              Get in touch with our expert team for personalized visa assistance
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-background text-foreground hover:bg-background/90 transition-all duration-300 hover:scale-105 font-medium">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;