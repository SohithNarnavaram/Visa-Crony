import React, { useState } from 'react';
import { ChevronDown, Clock, DollarSign, FileText, Plane, Search, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import EnquiryFormEnhanced from '@/components/EnquiryFormEnhanced';

const VisaServices = () => {
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [showEnquiryForm, setShowEnquiryForm] = useState(false);
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});
  const [selectedVisaType, setSelectedVisaType] = useState<string | null>(null);

  const visaTypes = {
    eVisa: {
      title: "E-Visas (Online)",
      icon: FileText,
      countries: [
        {
          name: "Australia",
          visaType: "e-Visa",
          processingDays: "20 Working Days",
          visaFees: "₹9400",
          serviceFees: "₹2499",
          description: "Electronic visa for Australia tourism and business."
        },
        {
          name: "Singapore",
          visaType: "e-Visa",
          processingDays: "6 Working Days",
          visaFees: "₹3000",
          serviceFees: "₹599",
          description: "Quick online visa for Singapore visits."
        },
        {
          name: "Dubai",
          visaType: "e-Visa",
          processingDays: "6 Working Days",
          visaFees: "₹7300",
          serviceFees: "₹599",
          description: "Electronic visa for Dubai tourism and business."
        },
        {
          name: "Russia",
          visaType: "e-Visa",
          processingDays: "15 Working Days",
          visaFees: "₹7300",
          serviceFees: "₹599",
          description: "Online visa for Russia tourism and business."
        },
        {
          name: "Azerbaijan",
          visaType: "e-Visa",
          processingDays: "7 Working Days",
          visaFees: "₹2400",
          serviceFees: "₹599",
          description: "Electronic visa for Azerbaijan visits."
        },
        {
          name: "Philippines",
          visaType: "e-Visa",
          processingDays: "15 Working Days",
          visaFees: "₹5820",
          serviceFees: "₹599",
          description: "Online visa for Philippines tourism."
        },
        {
          name: "Sri Lanka",
          visaType: "Electronic Travel Authorization",
          processingDays: "7 Working Days",
          visaFees: "₹0",
          serviceFees: "₹299",
          description: "Online authorization for Sri Lanka travel."
        },
        {
          name: "Indonesia",
          visaType: "e-Visa",
          processingDays: "7 Working Days",
          visaFees: "₹2900",
          serviceFees: "₹599",
          description: "Electronic visa for Indonesia tourism."
        },
        {
          name: "Cambodia",
          visaType: "e-Visa",
          processingDays: "4 Working Days",
          visaFees: "₹2900",
          serviceFees: "₹599",
          description: "Fast online visa for Cambodia visits."
        },
        {
          name: "Georgia",
          visaType: "e-Visa",
          processingDays: "6 Working Days",
          visaFees: "₹4200",
          serviceFees: "₹599",
          description: "Electronic visa for Georgia tourism."
        },
        {
          name: "South Korea",
          visaType: "e-Visa",
          processingDays: "17 Working Days",
          visaFees: "₹7800",
          serviceFees: "₹1999",
          description: "Online visa for South Korea tourism and business."
        },
        {
          name: "Turkey",
          visaType: "e-Visa (also has Sticker Visa option)",
          processingDays: "17 Working Days",
          visaFees: "₹20000",
          serviceFees: "₹2499",
          description: "Electronic visa for Turkey visits with sticker visa option."
        },
        {
          name: "Uganda",
          visaType: "e-Visa",
          processingDays: "5 Working Days",
          visaFees: "₹2400",
          serviceFees: "₹599",
          description: "Quick online visa for Uganda visits."
        },
        {
          name: "Bahrain",
          visaType: "e-Visa",
          processingDays: "6 Working Days",
          visaFees: "₹2800",
          serviceFees: "₹599",
          description: "Electronic visa for Bahrain business and tourism."
        },
        {
          name: "Armenia",
          visaType: "e-Visa",
          processingDays: "6 Working Days",
          visaFees: "₹1100",
          serviceFees: "₹599",
          description: "Online visa for Armenia tourism."
        },
        {
          name: "Hong Kong",
          visaType: "e-Visa",
          processingDays: "24 hrs",
          visaFees: "₹0",
          serviceFees: "₹299",
          description: "Ultra-fast online visa for Hong Kong visits."
        },
        {
          name: "Thailand",
          visaType: "e-Visa",
          processingDays: "24 hrs",
          visaFees: "₹0",
          serviceFees: "₹299",
          description: "Same-day online visa for Thailand tourism."
        },
        {
          name: "Malaysia",
          visaType: "e-Visa",
          processingDays: "24 hrs",
          visaFees: "₹0",
          serviceFees: "₹299",
          description: "Instant online visa for Malaysia visits."
        },
        {
          name: "New Zealand",
          visaType: "e-Visa",
          processingDays: "25 Working Days",
          visaFees: "₹17000",
          serviceFees: "₹2499",
          description: "Electronic visa for New Zealand tourism and business."
        }
      ]
    },
    stickerVisa: {
      title: "Sticker/Embassy Visas",
      icon: FileText,
      countries: [
        {
          name: "United States of America",
          visaType: "Sticker Visa",
          processingDays: "20 Working Days",
          visaFees: "₹16095",
          serviceFees: "₹2499",
          description: "Comprehensive visa services for USA tourism and business."
        },
        {
          name: "United Kingdom",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹15700",
          serviceFees: "₹2499",
          description: "Professional visa assistance for UK visits."
        },
        {
          name: "Canada",
          visaType: "Sticker Visa",
          processingDays: "20 Working Days",
          visaFees: "₹12000",
          serviceFees: "₹2499",
          description: "Complete visa services for Canada tourism and business."
        },
        {
          name: "Japan",
          visaType: "Sticker Visa",
          processingDays: "8 Working Days",
          visaFees: "₹2450",
          serviceFees: "₹699",
          description: "Fast processing for Japan tourism and business visits."
        },
        {
          name: "South Africa",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹2200",
          serviceFees: "₹1499",
          description: "Visa services for South Africa tourism and business."
        },
        {
          name: "France",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Professional visa assistance for France visits."
        },
        {
          name: "Switzerland",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Complete visa services for Switzerland tourism and business."
        },
        {
          name: "Germany",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Professional visa assistance for Germany visits."
        },
        {
          name: "Greece",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Visa services for Greece tourism and business."
        },
        {
          name: "Italy",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Complete visa services for Italy tourism and business."
        },
        {
          name: "Netherlands",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Professional visa assistance for Netherlands visits."
        },
        {
          name: "Poland",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Visa services for Poland tourism and business."
        },
        {
          name: "Denmark",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Complete visa services for Denmark tourism and business."
        },
        {
          name: "Slovakia",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Professional visa assistance for Slovakia visits."
        },
        {
          name: "Slovenia",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Visa services for Slovenia tourism and business."
        },
        {
          name: "Austria",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Complete visa services for Austria tourism and business."
        },
        {
          name: "Czech Republic",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Professional visa assistance for Czech Republic visits."
        },
        {
          name: "Hungary",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Visa services for Hungary tourism and business."
        },
        {
          name: "Iceland",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Complete visa services for Iceland tourism and business."
        },
        {
          name: "Bulgaria",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Professional visa assistance for Bulgaria visits."
        },
        {
          name: "Spain",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Complete visa services for Spain tourism and business."
        },
        {
          name: "Norway",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Professional visa assistance for Norway visits."
        },
        {
          name: "Finland",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Visa services for Finland tourism and business."
        },
        {
          name: "Portugal",
          visaType: "Sticker Visa",
          processingDays: "16 Working Days",
          visaFees: "₹11000",
          serviceFees: "₹1999",
          description: "Complete visa services for Portugal tourism and business."
        },
        {
          name: "Turkey",
          visaType: "Sticker Visa (also has E-Visa option)",
          processingDays: "17 Working Days",
          visaFees: "₹20000",
          serviceFees: "₹2499",
          description: "Sticker visa for Turkey with E-Visa option available."
        }
      ]
    }
  };

  const handleCountryClick = (country: any, visaType: string) => {
    setSelectedCountry({ ...country, category: visaType });
    setShowEnquiryForm(true);
    // Scroll to enquiry form
    setTimeout(() => {
      document.getElementById('enquiry-form')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  const handleSearch = (visaTypeKey: string, searchTerm: string) => {
    setSearchTerms(prev => ({
      ...prev,
      [visaTypeKey]: searchTerm
    }));
  };

  const clearSearch = (visaTypeKey: string) => {
    setSearchTerms(prev => ({
      ...prev,
      [visaTypeKey]: ''
    }));
  };

  const getFilteredCountries = (countries: any[], visaTypeKey: string) => {
    const searchTerm = searchTerms[visaTypeKey]?.toLowerCase() || '';
    if (!searchTerm) return countries;
    
    return countries.filter(country => 
      country.name.toLowerCase().includes(searchTerm) ||
      country.visaType.toLowerCase().includes(searchTerm) ||
      country.description.toLowerCase().includes(searchTerm) ||
      country.processingDays.toLowerCase().includes(searchTerm) ||
      country.visaFees.toLowerCase().includes(searchTerm) ||
      country.serviceFees.toLowerCase().includes(searchTerm)
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-accent to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6 animate-fade-in-down text-primary-foreground">
              Visa Services
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up text-primary-foreground/90">
              Professional visa assistance for your global journey
            </p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
                Choose Your Visa Type
              </h2>
              <p className="text-lg text-muted-foreground">
                Select a visa category to see available countries and pricing
              </p>
            </div>

            {/* Visa Type Cards Grid */}
            {!selectedVisaType ? (
              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {Object.entries(visaTypes).map(([key, category]) => (
                  <Card 
                    key={key}
                    className="cursor-pointer hover:shadow-xl transition-all duration-300 group hover:scale-105 border-2 hover:border-secondary bg-gradient-to-br from-card to-card/50"
                    onClick={() => setSelectedVisaType(key)}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <category.icon className="w-10 h-10 text-secondary-foreground" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-secondary transition-colors duration-200">
                        {category.title}
                      </h3>
                      <p className="text-lg text-muted-foreground mb-6">
                        {category.countries.length} Countries Available
                      </p>
                      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground group-hover:text-secondary transition-colors duration-200">
                        <span>Click to explore</span>
                        <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-200" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              /* Selected Visa Type Countries */
              <div className="space-y-6">
                {/* Back Button and Header */}
                <div className="flex items-center gap-4 mb-8">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedVisaType(null)}
                    className="hover:bg-secondary hover:text-secondary-foreground"
                  >
                    ← Back to Visa Types
                  </Button>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {visaTypes[selectedVisaType as keyof typeof visaTypes].title}
                    </h3>
                    <p className="text-muted-foreground">
                      {visaTypes[selectedVisaType as keyof typeof visaTypes].countries.length} countries available
                    </p>
                  </div>
                </div>

                {/* Search Toolbar */}
                <div className="mb-6">
                  <div className="relative max-w-md mx-auto group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground transition-all duration-200 group-focus-within:text-secondary group-focus-within:scale-110" />
                    <Input
                      type="text"
                      placeholder={`Search ${visaTypes[selectedVisaType as keyof typeof visaTypes].title.toLowerCase()}...`}
                      value={searchTerms[selectedVisaType] || ''}
                      onChange={(e) => handleSearch(selectedVisaType, e.target.value)}
                      className="pl-10 pr-10 bg-background border-border hover:border-secondary focus:border-secondary focus:ring-0 focus-visible:ring-0 transition-all duration-300 ease-out shadow-sm hover:shadow-md focus:shadow-lg group-focus-within:scale-[1.02] group-focus-within:shadow-xl"
                    />
                    {searchTerms[selectedVisaType] && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => clearSearch(selectedVisaType)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0 hover:bg-muted/80 transition-all duration-200 hover:scale-110 hover:bg-secondary hover:text-secondary-foreground"
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                  {searchTerms[selectedVisaType] && (
                    <div className="text-center mt-2 animate-fade-in">
                      <p className="text-sm text-muted-foreground">
                        Showing {getFilteredCountries(visaTypes[selectedVisaType as keyof typeof visaTypes].countries, selectedVisaType).length} of {visaTypes[selectedVisaType as keyof typeof visaTypes].countries.length} countries
                      </p>
                    </div>
                  )}
                </div>

                {/* Countries Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 transition-all duration-300 ease-out">
                  {getFilteredCountries(visaTypes[selectedVisaType as keyof typeof visaTypes].countries, selectedVisaType).map((country, index) => (
                    <Card 
                      key={`${country.name}-${index}`} 
                      className="h-full cursor-pointer hover:shadow-lg transition-all duration-300 group hover:scale-105 hover-lift animate-fade-in flex flex-col"
                      style={{ animationDelay: `${index * 50}ms` }}
                      onClick={() => handleCountryClick(country, visaTypes[selectedVisaType as keyof typeof visaTypes].title)}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg group-hover:text-secondary transition-colors duration-200">
                          {country.name}
                        </CardTitle>
                        <Badge variant="outline" className="w-fit group-hover:border-secondary group-hover:text-secondary transition-all duration-200">
                          {country.visaType}
                        </Badge>
                      </CardHeader>
                      <CardContent className="flex flex-col flex-grow space-y-3">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-accent transition-colors duration-200 group-hover:text-secondary" />
                          <span className="text-sm">{country.processingDays}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-accent transition-colors duration-200 group-hover:text-secondary" />
                          <span className="text-sm">
                            Visa: {country.visaFees} + Service: {country.serviceFees}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground flex-grow">
                          {country.description}
                        </p>
                        <Button 
                          size="sm" 
                          className="w-full mt-auto hover-scale transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCountryClick(country, visaTypes[selectedVisaType as keyof typeof visaTypes].title);
                          }}
                        >
                          Start Enquiry
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* No Results Message */}
                {searchTerms[selectedVisaType] && getFilteredCountries(visaTypes[selectedVisaType as keyof typeof visaTypes].countries, selectedVisaType).length === 0 && (
                  <div className="text-center py-8">
                    <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium text-muted-foreground mb-2">No countries found</p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Try adjusting your search terms or browse all available countries
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => clearSearch(selectedVisaType)}
                      className="hover:bg-secondary hover:text-secondary-foreground"
                    >
                      Clear Search
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enquiry Form Section */}
      {showEnquiryForm && (
        <section id="enquiry-form" className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-playfair font-bold mb-4">
                  Start Your Visa Application
                </h2>
                {selectedCountry && (
                  <div className="inline-flex items-center gap-2 bg-card px-4 py-2 rounded-lg border">
                    <span className="font-medium">Selected:</span>
                    <span className="text-secondary">{selectedCountry.name}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{selectedCountry.visaType}</span>
                  </div>
                )}
              </div>
              <EnquiryFormEnhanced selectedCountry={selectedCountry} />
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-12">
              Why Choose VisaCrony?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Fast Processing</h3>
                <p className="text-muted-foreground">
                  Quick turnaround times with transparent tracking throughout the process.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Expert Guidance</h3>
                <p className="text-muted-foreground">
                  Professional visa consultants to help you through every step.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                  <DollarSign className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold">Transparent Pricing</h3>
                <p className="text-muted-foreground">
                  No hidden fees. Clear pricing structure with competitive rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VisaServices;