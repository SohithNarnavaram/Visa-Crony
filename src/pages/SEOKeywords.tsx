import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Globe, Tag, Search, TrendingUp, Users, Clock, Shield, Award, MapPin } from 'lucide-react';

const SEOKeywords = () => {
  const keywordCategories = {
    'Visa Types': [
      'Tourist Visa', 'Business Visa', 'Student Visa', 'Work Visa', 'Transit Visa', 'Medical Visa',
      'E-Visa', 'Visa on Arrival', 'Sticker Visa', 'Visa Extension', 'Visa Renewal', 'Urgent Visa',
      'Express Visa', 'Premium Visa', 'Family Visa', 'Diplomatic Visa', 'Official Visa'
    ],
    'Countries & Destinations': [
      'USA Visa', 'UK Visa', 'Canada Visa', 'Australia Visa', 'Schengen Visa', 'Dubai Visa',
      'Singapore Visa', 'Thailand Visa', 'Turkey Visa', 'South Korea Visa', 'Malaysia Visa',
      'Japan Visa', 'New Zealand Visa', 'France Visa', 'Germany Visa', 'Italy Visa', 'Spain Visa',
      'Netherlands Visa', 'Switzerland Visa', 'Norway Visa', 'Sweden Visa', 'Denmark Visa',
      'Hong Kong Visa', 'Indonesia Visa', 'Philippines Visa', 'Vietnam Visa', 'Cambodia Visa',
      'Myanmar Visa', 'Laos Visa', 'Nepal Visa', 'Bhutan Visa', 'Sri Lanka Visa', 'Maldives Visa'
    ],
    'Passport Services': [
      'Passport Services', 'Passport Renewal', 'Fresh Passport', 'Tatkal Passport', 'Police Verification',
      'Passport Application', 'Passport Correction', 'Passport Reissue', 'Lost Passport', 'Damaged Passport',
      'Passport Status Check', 'Passport Fee', 'Passport Office', 'PSK Appointment', 'Passport Photos'
    ],
    'Documentation': [
      'Document Attestation', 'Document Verification', 'Birth Certificate', 'Marriage Certificate',
      'Educational Certificates', 'Employment Certificate', 'Bank Statements', 'ITR Documents',
      'Property Documents', 'Travel Insurance', 'Hotel Booking', 'Flight Booking', 'Travel Itinerary'
    ],
    'Services & Consultation': [
      'Visa Consultation', 'Visa Processing', 'Visa Assistance', 'Document Preparation',
      'Embassy Appointment', 'Visa Interview', 'Visa Rejection', 'Visa Appeal', 'Visa Status Check',
      'Travel Planning', 'Immigration Services', 'Study Abroad', 'Work Abroad', 'Settlement Services'
    ],
    'Location-Based Services': [
      'Visa Services in Bangalore', 'Visa Services in Mumbai', 'Visa Services in Delhi', 'Visa Services in Chennai',
      'Visa Services in Hyderabad', 'Visa Services in Pune', 'Visa Services in Kolkata', 'Visa Services in Ahmedabad',
      'Visa Services in Gurgaon', 'Visa Services in Noida', 'Visa Services in Jaipur', 'Visa Services in Kochi'
    ]
  };

  const longTailKeywords = [
    'best visa consultant in bangalore',
    'cheap visa services near me',
    'urgent visa processing bangalore',
    'visa rejection appeal services',
    'passport renewal bangalore same day',
    'student visa consultant bangalore',
    'work visa assistance india',
    'family visa processing services',
    'business visa consultant bangalore',
    'tourist visa expert bangalore',
    'canada visa consultant bangalore',
    'australia visa processing bangalore',
    'usa visa interview preparation',
    'schengen visa bangalore consultant',
    'dubai visa processing bangalore',
    'singapore visa consultant bangalore',
    'thailand visa bangalore services',
    'turkey visa processing bangalore',
    'south korea visa consultant',
    'malaysia visa bangalore services',
    'japan visa consultant bangalore',
    'new zealand visa processing',
    'france visa bangalore consultant',
    'germany visa processing services',
    'italy visa consultant bangalore',
    'spain visa bangalore services',
    'netherlands visa consultant',
    'switzerland visa processing',
    'norway visa bangalore services',
    'sweden visa consultant bangalore',
    'denmark visa processing services',
    'hong kong visa bangalore',
    'indonesia visa consultant',
    'philippines visa bangalore services',
    'vietnam visa processing bangalore',
    'cambodia visa consultant',
    'myanmar visa bangalore services',
    'laos visa processing bangalore',
    'nepal visa consultant bangalore',
    'bhutan visa bangalore services',
    'sri lanka visa consultant',
    'maldives visa bangalore services'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-secondary to-accent text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
            SEO Keywords & Services
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            Comprehensive keyword database for visa services, passport assistance, and travel documentation. 
            Optimized for search engines to help customers find our services easily.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* SEO Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <Search className="w-6 h-6 text-secondary" />
              <h3 className="font-semibold">Total Keywords</h3>
            </div>
            <p className="text-3xl font-bold text-secondary">500+</p>
            <p className="text-sm text-muted-foreground">Optimized terms</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <Globe className="w-6 h-6 text-secondary" />
              <h3 className="font-semibold">Countries</h3>
            </div>
            <p className="text-3xl font-bold text-secondary">50+</p>
            <p className="text-sm text-muted-foreground">Destinations covered</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-secondary" />
              <h3 className="font-semibold">Success Rate</h3>
            </div>
            <p className="text-3xl font-bold text-secondary">95%</p>
            <p className="text-sm text-muted-foreground">Visa approvals</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-6 h-6 text-secondary" />
              <h3 className="font-semibold">Processing</h3>
            </div>
            <p className="text-3xl font-bold text-secondary">3-21</p>
            <p className="text-sm text-muted-foreground">Days average</p>
          </div>
        </div>

        {/* Keyword Categories */}
        <div className="space-y-12">
          {Object.entries(keywordCategories).map(([category, keywords]) => (
            <div key={category} className="bg-card p-6 rounded-lg border">
              <div className="flex items-center gap-3 mb-6">
                <Tag className="w-6 h-6 text-secondary" />
                <h2 className="text-2xl font-playfair font-bold text-secondary">{category}</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm hover:bg-secondary hover:text-white transition-colors cursor-pointer"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Long Tail Keywords */}
        <div className="bg-card p-6 rounded-lg border mt-12">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-6 h-6 text-secondary" />
            <h2 className="text-2xl font-playfair font-bold text-secondary">Long Tail Keywords</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            Location-specific and service-specific keywords that customers commonly search for:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            {longTailKeywords.map((keyword, index) => (
              <div 
                key={index}
                className="p-3 bg-muted rounded-lg text-sm hover:bg-secondary hover:text-white transition-colors cursor-pointer"
              >
                {keyword}
              </div>
            ))}
          </div>
        </div>

        {/* SEO Benefits */}
        <div className="bg-gradient-to-r from-secondary/10 to-accent/10 p-8 rounded-lg mt-12">
          <h2 className="text-2xl font-playfair font-bold text-secondary mb-6">SEO Benefits</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">For Customers</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Easy discovery of visa services</li>
                <li>• Location-specific search results</li>
                <li>• Service-specific information</li>
                <li>• Quick access to relevant content</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">For Business</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Higher search engine rankings</li>
                <li>• Increased organic traffic</li>
                <li>• Better user engagement</li>
                <li>• Enhanced online visibility</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <h2 className="text-3xl font-playfair font-bold mb-4">Need Visa Services?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our comprehensive keyword database ensures you can easily find the visa and passport services you need. 
            Contact us for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="bg-secondary text-secondary-foreground px-8 py-3 rounded-lg hover:bg-secondary/90 transition-colors"
            >
              Get Free Consultation
            </Link>
            <Link 
              to="/visa-services"
              className="border border-secondary text-secondary px-8 py-3 rounded-lg hover:bg-secondary hover:text-white transition-colors"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOKeywords;

