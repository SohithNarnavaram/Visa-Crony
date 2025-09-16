import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, MessageCircle, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EmailService } from '@/services/emailService';

interface EnquiryFormProps {
  selectedCountry?: {
    name: string;
    category?: string;
    visaType?: string;
  };
}

const EnquiryForm: React.FC<EnquiryFormProps> = ({ selectedCountry }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const emailService = new EmailService();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredContact: 'email'
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Prepare form data for submission
      const formSubmissionData = {
        ...formData,
        selectedCountry: selectedCountry?.name || '',
        selectedVisaType: selectedCountry?.visaType || '',
        selectedCategory: selectedCountry?.category || '',
        timestamp: new Date().toISOString()
      };
      
      // Here you would typically send the data to your backend
      // console.log('Form Data:', formSubmissionData); // Removed for production

      // Handle communication preference
      const communicationPreference = formData.preferredContact;
      
      // Handle WhatsApp opening
      if (communicationPreference === 'whatsapp' || communicationPreference === 'both') {
        const whatsappMessage = `Passport Services Enquiry

Personal Information:
• Full Name: ${formData.name}
• Email: ${formData.email}
• Phone: ${formData.phone}
• Additional Message: ${formData.message || 'None'}

Selected Service: ${selectedCountry?.name || 'Passport Services'} - ${selectedCountry?.category || 'General'}

Communication Preference: ${formData.preferredContact}

Submitted on: ${new Date(formSubmissionData.timestamp).toLocaleString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}

Thank you for your enquiry! We will get back to you soon.`;
        
        const whatsappUrl = `https://wa.me/917337728776?text=${encodeURIComponent(whatsappMessage)}`;
        window.open(whatsappUrl, '_blank');
      }
      
      // Handle Email opening with delay if both are selected
      if (communicationPreference === 'email' || communicationPreference === 'both') {
        const emailSubject = emailService.generateEmailSubject(formSubmissionData);
        const emailBody = emailService.generateEmailBody(formSubmissionData);
        
        // Add small delay if both WhatsApp and Email are selected to avoid popup blocking
        if (communicationPreference === 'both') {
          setTimeout(async () => {
            await emailService.openGmailWithPrefilledEmail({
              to: 'sohithnr29@gmail.com',
              subject: emailSubject,
              body: emailBody
            });
          }, 500); // 500ms delay
        } else {
          await emailService.openGmailWithPrefilledEmail({
            to: 'sohithnr29@gmail.com',
            subject: emailSubject,
            body: emailBody
          });
        }
      }

      toast({
        title: "Enquiry Submitted Successfully!",
        description: `Your ${selectedCountry?.name || 'passport'} enquiry has been submitted! ` + 
          (communicationPreference === 'email'
            ? "Gmail compose window has been opened with your enquiry details ready to send."
            : communicationPreference === 'whatsapp'
            ? "WhatsApp chat has been opened."
            : communicationPreference === 'both'
            ? "Gmail compose window and WhatsApp have been opened with your enquiry details."
            : "Please select a communication preference."),
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: '',
        preferredContact: 'email'
      });

    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-playfair text-center">
          Passport Services Enquiry Form
        </CardTitle>
        {selectedCountry && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/10 px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="text-sm">
                {selectedCountry.name} - {selectedCountry.category}
              </span>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Personal Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Additional Message */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
            
            <div className="space-y-2">
              <Label htmlFor="message">Additional Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your passport requirements, any specific questions, or additional information..."
                rows={4}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
              />
            </div>
          </div>

          {/* Communication Preference */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Communication Preference</h3>
            
            <div className="space-y-2">
              <Label>How would you like us to contact you?</Label>
              <Select 
                value={formData.preferredContact} 
                onValueChange={(value) => handleInputChange('preferredContact', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="email">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </div>
                  </SelectItem>
                  <SelectItem value="whatsapp">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </div>
                  </SelectItem>
                  <SelectItem value="both">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <MessageCircle className="w-4 h-4" />
                      Both Email & WhatsApp
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
          </Button>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>
              By submitting this form, you agree to be contacted by VisaCrony regarding your visa enquiry.
            </p>
            <p>
              We typically respond within 24 hours during business days.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EnquiryForm;