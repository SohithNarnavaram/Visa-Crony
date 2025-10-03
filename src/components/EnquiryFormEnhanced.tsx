import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, MapPin, MessageCircle, Mail, User, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { EmailService } from '@/services/emailService';
// Note: Keep this component browser-only. Avoid importing Node-only libraries here.

interface EnquiryFormProps {
  selectedCountry?: {
    name: string;
    category?: string;
    visaType?: string;
  };
}

interface FormData {
  // Personal Information
  name: string;
  email: string;
  phone: string;
  passportNumber: string;
  nationality: string;
  dateOfBirth: string;
  address: string;
  state: string;
  country: string;
  postalCode: string;
  gender: string;
  
  // Travel Information
  travelDates: {
    fromDate: Date | undefined;
    toDate: Date | undefined;
  };
  purposeOfVisit: string;
  numberOfTravelers: string;
  message: string;
  
  // Additional Information
  previousTravelHistory: string;
  previousVisaApplication: string;
  
  // Communication
  preferredContact: string;
}

const nationalities = [
  'Indian', 'American', 'British', 'Canadian', 'Australian', 'German', 'French', 'Italian', 'Spanish', 'Japanese',
  'Chinese', 'Brazilian', 'Mexican', 'Russian', 'South African', 'Nigerian', 'Egyptian', 'Pakistani', 'Bangladeshi',
  'Sri Lankan', 'Nepalese', 'Bhutanese', 'Maldivian', 'Afghan', 'Other'
];

const purposeOptions = [
  'Tourism', 'Business', 'Family Visit'
];

const EnquiryFormEnhanced: React.FC<EnquiryFormProps> = ({ selectedCountry }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  
  const emailService = new EmailService();
  
  // Helper to build a WhatsApp-friendly message
  const generateWhatsAppMessage = (formData: any) => {
    const formatDate = (dateString: string) => {
      if (!dateString) return 'Not specified';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    return `Visa Enquiry Form Submission\n\n` +
      `🌍 COUNTRY: ${formData.selectedCountry}\n` +
      `📋 VISA TYPE: ${formData.selectedVisaType}\n` +
      `📂 CATEGORY: ${formData.selectedCategory}\n\n` +
      `Personal Information:\n` +
      `• Full Name: ${formData.name}\n` +
      `• Email: ${formData.email}\n` +
      `• Phone: ${formData.phone}\n` +
      `• Passport Number: ${formData.passportNumber || 'Not provided'}\n` +
      `• Nationality: ${formData.nationality}\n` +
      `• Date of Birth: ${formatDate(formData.dateOfBirth)}\n` +
      `• Gender: ${formData.gender || 'Not specified'}\n\n` +
      `Address:\n` +
      `• Street Address: ${formData.address}\n` +
      `• State/Province: ${formData.state}\n` +
      `• Country: ${formData.country}\n` +
      `• Postal Code: ${formData.postalCode}\n\n` +
      `Travel Information:\n` +
      `• Selected Country: ${formData.selectedCountry}\n` +
      `• Visa Type: ${formData.selectedVisaType}\n` +
      `• Category: ${formData.selectedCategory}\n` +
      `• Purpose of Visit: ${formData.purposeOfVisit}\n` +
      `• Number of Travelers: ${formData.numberOfTravelers}\n` +
      `• Travel Dates: ${formData.fromDate ? formatDate(formData.fromDate) : 'Not specified'}${formData.toDate ? ` to ${formatDate(formData.toDate)}` : ''}\n` +
      `• Additional Message: ${formData.message || 'None'}\n\n` +
      `Additional Information:\n` +
      `• Previous Travel History: ${formData.previousTravelHistory || 'None provided'}\n` +
      `• Previous Visa Application: ${formData.previousVisaApplication || 'Not specified'}\n\n` +
      `Communication Preference: ${formData.preferredContact}\n` +
      `Submitted on: ${new Date(formData.timestamp).toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      })}`;
  };
  
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<FormData>({
    defaultValues: {
      preferredContact: 'email',
      numberOfTravelers: '1',
      gender: '',
      nationality: '',
      purposeOfVisit: '',
      previousVisaApplication: '',
      travelDates: {
        fromDate: undefined,
        toDate: undefined
      }
    }
  });



  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      // Prepare form data for submission
      const formSubmissionData = {
        // Personal Information
        name: data.name,
        email: data.email,
        phone: data.phone,
        passportNumber: data.passportNumber || '',
        nationality: data.nationality,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        state: data.state,
        country: data.country,
        postalCode: data.postalCode,
        gender: data.gender,
        
        // Travel Information
        purposeOfVisit: data.purposeOfVisit,
        numberOfTravelers: data.numberOfTravelers,
        fromDate: data.travelDates.fromDate ? format(data.travelDates.fromDate, 'yyyy-MM-dd') : '',
        toDate: data.travelDates.toDate ? format(data.travelDates.toDate, 'yyyy-MM-dd') : '',
        message: data.message || '',
        
        // Additional Information
        previousTravelHistory: data.previousTravelHistory || '',
        previousVisaApplication: data.previousVisaApplication || '',
        
        // Communication
        preferredContact: data.preferredContact,
        
        // Selected Country Information
        selectedCountry: selectedCountry?.name || '',
        selectedVisaType: selectedCountry?.visaType || '',
        selectedCategory: selectedCountry?.category || '',
        
        // Timestamp
        timestamp: new Date().toISOString()
      };

      // Send data to Google Apps Script (handles saving to Sheets and sending HTML email)
      const GOOGLE_APPS_SCRIPT_URL = (import.meta as any).env?.VITE_GOOGLE_APPS_SCRIPT_URL || (window as any)?.env?.VITE_GOOGLE_APPS_SCRIPT_URL;

      if (GOOGLE_APPS_SCRIPT_URL) {
        const response = await fetch(GOOGLE_APPS_SCRIPT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formSubmissionData)
        });

        if (!response.ok) {
          console.error('Apps Script responded with error status:', response.status);
        }
      } else {
        console.warn('VITE_GOOGLE_APPS_SCRIPT_URL not configured. Skipping Apps Script POST.');
      }

      // Handle communication preference
      const communicationPreference = data.preferredContact;
      
      // Handle WhatsApp opening
      if (communicationPreference === 'whatsapp' || communicationPreference === 'both') {
        const whatsappMessage = generateWhatsAppMessage(formSubmissionData);
        const whatsappUrl = `https://wa.me/919113895297?text=${encodeURIComponent(whatsappMessage)}`;
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
              to: 'visacrony@gmail.com',
              subject: emailSubject,
              body: emailBody
            });
          }, 500); // 500ms delay
        } else {
          await emailService.openGmailWithPrefilledEmail({
            to: 'visacrony@gmail.com',
            subject: emailSubject,
            body: emailBody
          });
        }
      }

      toast({
        title: "Enquiry Submitted Successfully!",
        description: `Your ${selectedCountry?.name || 'visa'} enquiry has been submitted! ` + 
          (communicationPreference === 'whatsapp'
            ? "WhatsApp chat has been opened."
            : communicationPreference === 'email'
            ? "Gmail compose window has been opened with your enquiry details ready to send."
            : communicationPreference === 'both'
            ? "Gmail compose window and WhatsApp have been opened with your enquiry details."
            : "Please select a communication preference."),
      });

      // Reset form
      reset();
      setFromDate(undefined);
      setToDate(undefined);

    } catch (error) {
      console.error('Form submission error:', error);
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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-playfair text-center">
          Visa Enquiry Form
        </CardTitle>
        {selectedCountry && (
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-secondary/10 px-4 py-2 rounded-full border border-secondary/20">
              <MapPin className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium">
                {selectedCountry.name} - {selectedCountry.category}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              This form is specifically for {selectedCountry.name} visa application
            </p>
          </div>
        )}
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter your full name as per passport"
                  {...register('name', { required: 'Full name is required' })}
                />
                {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.email@example.com"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address'
                      }
                    })}
                  />
                  {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+91 91138 95297"
                    {...register('phone', { required: 'Phone number is required' })}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="passportNumber" className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Passport Number (Optional)
                  </Label>
                  <Input
                    id="passportNumber"
                    placeholder="Enter passport number"
                    {...register('passportNumber')}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Nationality *</Label>
                  <Select onValueChange={(value) => setValue('nationality', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your nationality" />
                    </SelectTrigger>
                    <SelectContent>
                      {nationalities.map((nationality) => (
                        <SelectItem key={nationality} value={nationality}>
                          {nationality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-foreground font-medium">
                    <Calendar className="w-4 h-4 text-secondary" />
                    Date of Birth *
                  </Label>
                  <Input
                    type="date"
                    placeholder="Select your date of birth"
                    {...register('dateOfBirth', { required: 'Date of birth is required' })}
                    max={new Date().toISOString().split('T')[0]}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Gender</Label>
                  <Select onValueChange={(value) => setValue('gender', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Current Residential Address *</Label>
                <div className="space-y-3">
                  <Input
                    placeholder="Street address"
                    {...register('address', { required: 'Address is required' })}
                  />
                  <div className="grid md:grid-cols-3 gap-3">
                    <Input
                      placeholder="State/Province"
                      {...register('state', { required: 'State is required' })}
                    />
                    <Input
                      placeholder="Country"
                      {...register('country', { required: 'Country is required' })}
                    />
                    <Input
                      placeholder="Postal Code"
                      {...register('postalCode', { required: 'Postal code is required' })}
                    />
                  </div>
                </div>
                {(errors.address || errors.state || errors.country || errors.postalCode) && (
                  <p className="text-sm text-destructive">All address fields are required</p>
                )}
              </div>
            </div>
          </div>

          {/* Travel Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Travel Information
            </h3>
            
            {selectedCountry && (
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span className="font-medium text-accent">Selected Destination</span>
                </div>
                <div className="grid md:grid-cols-3 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Country:</span>
                    <span className="ml-2 font-medium">{selectedCountry.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Visa Type:</span>
                    <span className="ml-2 font-medium">{selectedCountry.visaType}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Category:</span>
                    <span className="ml-2 font-medium">{selectedCountry.category}</span>
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Purpose of Visit *</Label>
                <Select onValueChange={(value) => setValue('purposeOfVisit', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select purpose of visit" />
                  </SelectTrigger>
                  <SelectContent>
                    {purposeOptions.map((purpose) => (
                      <SelectItem key={purpose} value={purpose}>
                        {purpose}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="numberOfTravelers">Number of Travelers</Label>
                <Select onValueChange={(value) => setValue('numberOfTravelers', value)} defaultValue="1">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Person' : 'People'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="travelDates" className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Intended Travel Dates
              </Label>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">From Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                                             <Button
                         variant="outline"
                         className={cn(
                           "w-full justify-start text-left font-normal",
                           !fromDate && "text-muted-foreground"
                         )}
                       >
                         <Calendar className="mr-2 h-4 w-4" />
                         {fromDate ? format(fromDate, "PPP") : "Select start date"}
                       </Button>
                    </PopoverTrigger>
                                                              <PopoverContent className="w-auto p-0 border border-border shadow-lg bg-popover" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={fromDate}
                          onSelect={(date) => {
                            setFromDate(date);
                            setValue('travelDates.fromDate', date);
                          }}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">To Date (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                                             <Button
                         variant="outline"
                         className={cn(
                           "w-full justify-start text-left font-normal",
                           !toDate && "text-muted-foreground"
                         )}
                       >
                         <Calendar className="mr-2 h-4 w-4" />
                         {toDate ? format(toDate, "PPP") : "Select end date"}
                       </Button>
                    </PopoverTrigger>
                                                              <PopoverContent className="w-auto p-0 border border-border shadow-lg bg-popover" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={toDate}
                          onSelect={(date) => {
                            setToDate(date);
                            setValue('travelDates.toDate', date);
                          }}
                          disabled={(date) => date < new Date() || (fromDate && date < fromDate)}
                          initialFocus
                        />
                      </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Additional Message</Label>
              <Textarea
                id="message"
                placeholder="Tell us about your travel plans, any specific requirements, or questions you have..."
                rows={4}
                {...register('message')}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Additional Information</h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Previous Travel History</Label>
                <Textarea
                  placeholder="Briefly mention countries you've visited in the last 5 years (optional)"
                  rows={2}
                  {...register('previousTravelHistory')}
                />
              </div>

              <div className="space-y-2">
                <Label>Have you applied for a visa to this country before?</Label>
                <Select onValueChange={(value) => setValue('previousVisaApplication', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no">No, this is my first application</SelectItem>
                    <SelectItem value="yes-approved">Yes, and it was approved</SelectItem>
                    <SelectItem value="yes-rejected">Yes, but it was rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Communication Preference */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">Communication Preference</h3>
            
            <div className="space-y-2">
              <Label>How would you like us to contact you?</Label>
              <Select 
                onValueChange={(value) => setValue('preferredContact', value)}
                defaultValue="email"
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

export default EnquiryFormEnhanced;