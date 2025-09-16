import React, { useState, useRef } from 'react';
import { FileText, RefreshCw, Clock, CheckCircle, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import EnquiryForm from '@/components/EnquiryForm';
import FreshPassportForm from '@/components/FreshPassportForm';
import PassportRenewalForm from '@/components/PassportRenewalForm';

const PassportServices = () => {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const formSectionRef = useRef<HTMLDivElement>(null);

  const handleServiceSelection = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    
    // Smooth scroll to form section after a brief delay to allow state update
    setTimeout(() => {
      if (formSectionRef.current) {
        formSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  const handleEnquiryClick = () => {
    setSelectedService(null); // Show enquiry form
    
    // Smooth scroll to form section
    setTimeout(() => {
      if (formSectionRef.current) {
        formSectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }, 100);
  };

  const services = [
    {
      icon: FileText,
      title: "Fresh Passport Application",
      description: "Apply for your first passport with our comprehensive assistance",
      features: [
        "Document verification and guidance",
        "Form filling assistance",
        "Appointment booking support",
        "Status tracking",
        "Delivery coordination"
      ],
      processingTime: "30-45 days",
      fee: "$150"
    },
    {
      icon: RefreshCw,
      title: "Passport Renewal",
      description: "Renew your expired or expiring passport hassle-free",
      features: [
        "Quick renewal process",
        "Document review",
        "Online application support",
        "Priority processing available",
        "Home pickup & delivery"
      ],
      processingTime: "15-30 days",
      fee: "$120"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Submit Enquiry",
      description: "Fill out our simple enquiry form with your requirements"
    },
    {
      step: "2", 
      title: "Document Review",
      description: "Our experts review your documents and provide guidance"
    },
    {
      step: "3",
      title: "Application Submission",
      description: "We assist with form filling and submit your application"
    },
    {
      step: "4",
      title: "Track & Receive",
      description: "Track your application status and receive your passport"
    }
  ];

  const benefits = [
    "Expert guidance throughout the process",
    "Document verification and assistance",
    "Appointment booking support",
    "Status tracking and updates",
    "Home pickup and delivery service",
    "Priority processing options available"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary to-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 animate-fade-in-down text-primary-foreground">
              Passport Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up text-primary-foreground/90">
              Professional passport assistance for your travel needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section data-services-section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Our Passport Services
              </h2>
              <p className="text-lg text-muted-foreground">
                Choose the service that best fits your passport needs
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-16">
              {services.map((service, index) => (
                <Card key={index} className="h-full group hover:shadow-lg transition-all duration-300 flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <service.icon className="w-8 h-8 text-secondary-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-xl group-hover:text-secondary transition-colors">
                          {service.title}
                        </CardTitle>
                        <p className="text-muted-foreground mt-1">{service.description}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col">
                    {/* Features */}
                    <div className="flex-1">
                      <h4 className="font-semibold mb-3">What's Included:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-secondary" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Pricing & Timeline */}
                    <div className="border-t pt-4 mt-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent" />
                          <span className="text-sm font-medium">{service.processingTime}</span>
                        </div>
                        <div className="text-lg font-bold text-secondary">{service.fee}</div>
                      </div>
                      <Button 
                        className="w-full" 
                        size="lg"
                        onClick={() => handleServiceSelection(service.title)}
                      >
                        Start Application
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Enquiry Tile */}
            <div className="max-w-4xl mx-auto">
              <Card className="group hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-secondary/5 to-accent/5 border-secondary/20">
                <CardContent className="p-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <HelpCircle className="w-8 h-8 text-secondary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-secondary transition-colors">
                          Quick Passport Enquiry
                        </h3>
                        <p className="text-muted-foreground">
                          Have questions? Get instant answers from our passport experts
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="lg"
                      className="group-hover:bg-secondary group-hover:text-secondary-foreground transition-colors"
                      onClick={handleEnquiryClick}
                    >
                      Quick Enquiry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                How It Works
              </h2>
              <p className="text-lg text-muted-foreground">
                Simple 4-step process to get your passport
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {process.map((item, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto text-2xl font-bold text-secondary-foreground">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Why Choose Our Passport Services?
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section ref={formSectionRef} className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-playfair font-bold mb-4">
                {selectedService ? `${selectedService} Form` : "Start Your Passport Application"}
              </h2>
              <p className="text-muted-foreground">
                {selectedService 
                  ? "Complete the form below and our passport experts will guide you through the process"
                  : "Choose a service above or fill out the general enquiry form below"
                }
              </p>
              {selectedService && (
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedService(null);
                    // Scroll back to services section
                    setTimeout(() => {
                      const servicesSection = document.querySelector('[data-services-section]');
                      if (servicesSection) {
                        servicesSection.scrollIntoView({
                          behavior: 'smooth',
                          block: 'start',
                        });
                      }
                    }, 100);
                  }}
                  className="mt-4"
                >
                  ← Back to Services
                </Button>
              )}
            </div>
            
            <div className={`transition-all duration-500 ${selectedService ? 'opacity-100 transform translate-y-0' : 'opacity-100'}`}>
              {selectedService === "Fresh Passport Application" ? (
                <FreshPassportForm />
              ) : selectedService === "Passport Renewal" ? (
                <PassportRenewalForm />
              ) : (
                <EnquiryForm selectedCountry={{ name: "Passport Service", category: "Passport Services" }} />
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PassportServices;