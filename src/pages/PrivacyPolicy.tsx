import React from 'react';
import { Shield, Lock, Eye, FileText, Mail, Phone, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary via-accent to-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <div className="w-20 h-20 bg-primary-foreground/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your privacy and data protection are our top priorities
            </p>
            <div className="text-sm opacity-80">
              <p>Effective Date: December 2024</p>
              <p>Last Updated: December 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {/* Introduction */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-secondary" />
                  Introduction
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  VisaCrony ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard the personal information you provide when using our website and services related to passports, visas, and travel documentation.
                </p>
              </CardContent>
            </Card>

            {/* Information We Collect */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-secondary" />
                  1. Information We Collect
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We may collect the following types of information when you use our services:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Personal Identification Information:</strong> Full name, date of birth, gender, nationality, passport details, visa details, photographs, and government-issued identification numbers.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Contact Information:</strong> Email address, phone number, residential address.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Travel Information:</strong> Travel history, intended travel dates, itinerary details.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Payment Information:</strong> Billing address and payment transaction details (processed securely through third-party payment providers).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Website Usage Data:</strong> IP address, browser type, device information, and cookies to improve user experience.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* How We Use Your Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-secondary" />
                  2. How We Use Your Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We use your personal information for purposes including:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Processing passport and visa applications.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Communicating updates, requirements, or status of your applications.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Compliance with government regulations and legal requirements.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Improving website performance, services, and customer support.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Fraud prevention and security.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Sharing of Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-secondary" />
                  3. Sharing of Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell, rent, or trade your personal information.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We may share your information only with:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Government Authorities & Embassies/Consulates:</strong> For processing passport and visa applications.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Trusted Service Providers:</strong> For payment processing, courier services, IT support, and customer assistance.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span><strong>Legal Compliance:</strong> If required by law, regulation, or legal process.</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Data Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-secondary" />
                  4. Data Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We take reasonable technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no online transmission is 100% secure, and we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            {/* Data Retention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-secondary" />
                  5. Data Retention
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We retain your personal information only as long as necessary to provide services, comply with legal obligations, and resolve disputes.
                </p>
              </CardContent>
            </Card>

            {/* Your Rights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-secondary" />
                  6. Your Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Depending on applicable law, you may have rights to:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Access, update, or correct your personal information.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Request deletion of your information (subject to legal and contractual restrictions).</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0"></span>
                    <span>Withdraw consent where processing is based on consent.</span>
                  </li>
                </ul>
                <p className="text-muted-foreground leading-relaxed">
                  To exercise these rights, please contact us using the information provided in the Contact Us section below.
                </p>
              </CardContent>
            </Card>

            {/* Cookies and Tracking */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Eye className="w-6 h-6 text-secondary" />
                  7. Cookies and Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Our website may use cookies and similar technologies to enhance user experience, analyze website traffic, and improve services. You may disable cookies through your browser settings, but some features of the site may not function properly.
                </p>
              </CardContent>
            </Card>

            {/* Third-Party Links */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-secondary" />
                  8. Third-Party Links
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those external sites.
                </p>
              </CardContent>
            </Card>

            {/* Changes to Privacy Policy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="w-6 h-6 text-secondary" />
                  9. Changes to Privacy Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
                </p>
              </CardContent>
            </Card>

            {/* Contact Us */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-secondary" />
                  10. Contact Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-secondary" />
                    <span className="text-muted-foreground">Email: info@visacrony.com</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-secondary" />
                    <span className="text-muted-foreground">Phone: +1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-secondary" />
                    <span className="text-muted-foreground">Address: 123 Visa Street, Travel City, TC 12345</span>
                  </div>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
