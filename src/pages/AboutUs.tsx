import React from 'react';
import { Award, Shield, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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

  const team = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "/placeholder.svg",
      description: "15+ years in immigration services"
    },
    {
      name: "Michael Chen",
      role: "Senior Visa Consultant",
      image: "/placeholder.svg",
      description: "Expert in business visa processing"
    },
    {
      name: "Priya Sharma",
      role: "Customer Success Manager",
      image: "/placeholder.svg", 
      description: "Ensures smooth client experience"
    }
  ];

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
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed mb-6">
                Founded in 2018, VisaCrony began as a small visa consultancy with a big vision: 
                to revolutionize how people approach international travel documentation. What started 
                as a passion project by travel enthusiasts has grown into a trusted platform serving 
                thousands of clients worldwide.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                We recognized the frustration and complexity that comes with visa applications - 
                the endless paperwork, uncertain timelines, and lack of transparency. Our founders 
                experienced these challenges firsthand during their own travels and decided to create 
                a solution that would change the industry forever.
              </p>
              <p className="text-lg leading-relaxed">
                Today, VisaCrony stands as a premium visa partner, combining cutting-edge technology 
                with human expertise to deliver unparalleled service. We've successfully processed 
                over 10,000 visa applications, helping families reunite, businesses expand globally, 
                and adventurers explore new horizons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {team.map((member, index) => (
              <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <p className="text-secondary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
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
    </div>
  );
};

export default AboutUs;