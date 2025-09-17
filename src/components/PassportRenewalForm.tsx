import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar, RefreshCw, User, MapPin, Phone, Mail, FileText, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EmailService } from '@/services/emailService';

const passportRenewalSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  middleName: z.string().optional(),
  dateOfBirth: z.date({
    required_error: 'Date of birth is required',
  }),
  
  // Current Passport Information
  currentPassportNumber: z.string().min(8, 'Current passport number is required'),
  currentPassportIssueDate: z.date({
    required_error: 'Current passport issue date is required',
  }),
  currentPassportExpiryDate: z.date({
    required_error: 'Current passport expiry date is required',
  }),
  currentPassportPlaceOfIssue: z.string().min(2, 'Place of issue is required'),
  
  // Contact Information
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  alternatePhone: z.string().optional(),
  
  // Address Information
  currentAddress: z.string().min(10, 'Current address is required'),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  postalCode: z.string().min(5, 'Postal code is required'),
  nationality: z.string().min(2, 'Nationality is required'),
  
  // Renewal Details
  renewalReason: z.enum(['expired', 'expiring', 'damaged', 'lost', 'name_change', 'other'], {
    required_error: 'Please select renewal reason',
  }),
  otherReason: z.string().optional(),
  
  // Passport Details
  passportType: z.enum(['ordinary', 'official', 'diplomatic'], {
    required_error: 'Please select passport type',
  }),
  pagesRequired: z.enum(['36', '60'], {
    required_error: 'Please select number of pages',
  }),
  
  // Travel Information
  hasUpcomingTravel: z.boolean(),
  upcomingTravelDate: z.date().optional(),
  travelDestination: z.string().optional(),
  purposeOfTravel: z.string().optional(),
  
  // Documents
  hasCurrentPassport: z.boolean(),
  hasOldPassport: z.boolean(),
  hasAddressProof: z.boolean(),
  hasPhoto: z.boolean(),
  hasNameChangeDocument: z.boolean(),
  
  // Additional Information
  nameChange: z.boolean(),
  nameChangeDetails: z.string().optional(),
  criminalRecord: z.boolean(),
  criminalRecordDetails: z.string().optional(),
  
  // Communication Preference
  preferredContact: z.enum(['email', 'whatsapp', 'phone'], {
    required_error: 'Please select your preferred contact method',
  }),
  
  // Additional Message
  additionalMessage: z.string().optional(),
});

type PassportRenewalFormData = z.infer<typeof passportRenewalSchema>;

const PassportRenewalForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
  const [currentPassportIssueDate, setCurrentPassportIssueDate] = useState<Date>();
  const [currentPassportExpiryDate, setCurrentPassportExpiryDate] = useState<Date>();
  const [upcomingTravelDate, setUpcomingTravelDate] = useState<Date>();
  const [birthYear, setBirthYear] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const [submissionMethod, setSubmissionMethod] = useState<'whatsapp' | 'gmail'>('whatsapp');
  
  const emailService = new EmailService();

  // Function to construct date from year, month, day
  const constructDateOfBirth = () => {
    if (birthYear && birthMonth && birthDay) {
      const date = new Date(parseInt(birthYear), parseInt(birthMonth) - 1, parseInt(birthDay));
      setDateOfBirth(date);
      setValue('dateOfBirth', date);
    }
  };

  // Update date when any component changes
  React.useEffect(() => {
    constructDateOfBirth();
  }, [birthYear, birthMonth, birthDay]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<PassportRenewalFormData>({
    resolver: zodResolver(passportRenewalSchema),
    defaultValues: {
      passportType: 'ordinary',
      pagesRequired: '36',
      preferredContact: 'email',
      renewalReason: 'expired',
      hasCurrentPassport: true,
      hasOldPassport: false,
      hasAddressProof: false,
      hasPhoto: false,
      hasNameChangeDocument: false,
      nameChange: false,
      criminalRecord: false,
      hasUpcomingTravel: false,
    }
  });

  const onSubmit = async (data: PassportRenewalFormData) => {
    console.log('Form submitted with data:', data);
    console.log('Form errors:', errors);
    setIsSubmitting(true);

    try {
      const formSubmissionData = {
        ...data,
        dateOfBirth: dateOfBirth?.toISOString(),
        currentPassportIssueDate: currentPassportIssueDate?.toISOString(),
        currentPassportExpiryDate: currentPassportExpiryDate?.toISOString(),
        upcomingTravelDate: upcomingTravelDate?.toISOString(),
        timestamp: new Date().toISOString(),
        serviceType: 'Passport Renewal'
      };

      // Generate WhatsApp message
      const whatsappMessage = generateWhatsAppMessage(formSubmissionData);
      
      // Handle submission method
      console.log('Submission method selected:', submissionMethod);
      
      // Handle WhatsApp opening
      if (submissionMethod === 'whatsapp') {
        const whatsappUrl = `https://wa.me/917337728776?text=${encodeURIComponent(whatsappMessage)}`;
        console.log('Opening WhatsApp with URL:', whatsappUrl);
        window.open(whatsappUrl, '_blank');
      }
      
      // Handle Email opening
      if (submissionMethod === 'gmail') {
        console.log('Opening Gmail for submission method:', submissionMethod);
        const emailSubject = emailService.generateEmailSubject({
          ...formSubmissionData,
          selectedCountry: 'Passport Renewal',
          name: `${data.firstName} ${data.lastName}`
        });
        const emailBody = emailService.generateEmailBody(formSubmissionData);
        
        console.log('Email subject:', emailSubject);
        console.log('Email body:', emailBody);
        
        await emailService.openGmailWithPrefilledEmail({
          to: 'visacrony@gmail.com',
          subject: emailSubject,
          body: emailBody
        });
      }

      toast({
        title: "Passport Renewal Application Submitted!",
        description: `Your passport renewal application has been submitted! ` + 
          (submissionMethod === 'gmail'
            ? "Gmail compose window has been opened with your application details ready to send."
            : submissionMethod === 'whatsapp'
            ? "WhatsApp chat has been opened with your application details ready to send."
            : "Please select a submission method."),
      });

      // Reset form
      reset();
      setDateOfBirth(undefined);
      setCurrentPassportIssueDate(undefined);
      setCurrentPassportExpiryDate(undefined);
      setUpcomingTravelDate(undefined);
      setBirthYear('');
      setBirthMonth('');
      setBirthDay('');

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

  const generateWhatsAppMessage = (formData: any) => {
    const formatDate = (dateString: string) => {
      if (!dateString) return 'Not specified';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    return `🔄 Passport Renewal Application\n\n` +
      `Personal Information:\n` +
      `• Full Name: ${formData.firstName} ${formData.middleName || ''} ${formData.lastName}\n` +
      `• Date of Birth: ${formatDate(formData.dateOfBirth)}\n\n` +
      `Current Passport Details:\n` +
      `• Passport Number: ${formData.currentPassportNumber}\n` +
      `• Issue Date: ${formatDate(formData.currentPassportIssueDate)}\n` +
      `• Expiry Date: ${formatDate(formData.currentPassportExpiryDate)}\n` +
      `• Place of Issue: ${formData.currentPassportPlaceOfIssue || 'Not provided'}\n\n` +
      `Contact Information:\n` +
      `• Email: ${formData.email}\n` +
      `• Phone: ${formData.phone}\n` +
      `${formData.alternatePhone ? `• Alternate Phone: ${formData.alternatePhone}\n` : ''}` +
      `\nAddress:\n` +
      `• Street Address: ${formData.currentAddress}\n` +
      `• City: ${formData.city}\n` +
      `• State: ${formData.state}\n` +
      `• Postal Code: ${formData.postalCode}\n` +
      `• Nationality: ${formData.nationality}\n\n` +
      `Renewal Details:\n` +
      `• Reason: ${formData.renewalReason || 'Not specified'}\n` +
      `${formData.otherReason ? `• Other Reason: ${formData.otherReason}\n` : ''}` +
      `• Passport Type: ${formData.passportType || 'Not specified'}\n` +
      `• Pages Required: ${formData.pagesRequired || 'Not specified'}\n\n` +
      `Travel Information:\n` +
      `• Upcoming Travel: ${formData.hasUpcomingTravel ? 'Yes' : 'No'}\n` +
      `${formData.upcomingTravelDate ? `• Travel Date: ${formatDate(formData.upcomingTravelDate)}\n` : ''}` +
      `${formData.travelDestination ? `• Destination: ${formData.travelDestination}\n` : ''}` +
      `${formData.purposeOfTravel ? `• Purpose: ${formData.purposeOfTravel}\n` : ''}` +
      `\nDocuments Available:\n` +
      `✓ Current Passport: ${formData.hasCurrentPassport ? 'Yes' : 'No'}\n` +
      `✓ Old Passport: ${formData.hasOldPassport ? 'Yes' : 'No'}\n` +
      `✓ Address Proof: ${formData.hasAddressProof ? 'Yes' : 'No'}\n` +
      `✓ Photo: ${formData.hasPhoto ? 'Yes' : 'No'}\n` +
      `✓ Name Change Document: ${formData.hasNameChangeDocument ? 'Yes' : 'No'}\n\n` +
      `Additional Information:\n` +
      `• Name Change: ${formData.nameChange ? 'Yes' : 'No'}\n` +
      `${formData.nameChangeDetails ? `• Name Change Details: ${formData.nameChangeDetails}\n` : ''}` +
      `• Criminal Record: ${formData.criminalRecord ? 'Yes' : 'No'}\n` +
      `${formData.criminalRecordDetails ? `• Criminal Record Details: ${formData.criminalRecordDetails}\n` : ''}` +
      `\nCommunication Preference: ${formData.preferredContact}\n` +
      `${formData.additionalMessage ? `Additional Message: ${formData.additionalMessage}\n` : ''}` +
      `\nSubmitted on: ${new Date(formData.timestamp).toLocaleString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
      })}`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-playfair text-center flex items-center justify-center gap-2">
          <RefreshCw className="w-6 h-6 text-primary" />
          Passport Renewal Application Form
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Complete this form to renew your passport. Our experts will guide you through the renewal process.
        </p>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              <User className="w-5 h-5" />
              Personal Information
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p className="text-sm text-destructive">{errors.firstName.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="middleName">Middle Name</Label>
                <Input
                  id="middleName"
                  placeholder="Enter your middle name"
                  {...register('middleName')}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <p className="text-sm text-destructive">{errors.lastName.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Date of Birth *</Label>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="birthDay" className="text-xs text-muted-foreground">Day</Label>
                  <Select value={birthDay} onValueChange={setBirthDay}>
                    <SelectTrigger>
                      <SelectValue placeholder="Day" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 31 }, (_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="birthMonth" className="text-xs text-muted-foreground">Month</Label>
                  <Select value={birthMonth} onValueChange={setBirthMonth}>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">January</SelectItem>
                      <SelectItem value="2">February</SelectItem>
                      <SelectItem value="3">March</SelectItem>
                      <SelectItem value="4">April</SelectItem>
                      <SelectItem value="5">May</SelectItem>
                      <SelectItem value="6">June</SelectItem>
                      <SelectItem value="7">July</SelectItem>
                      <SelectItem value="8">August</SelectItem>
                      <SelectItem value="9">September</SelectItem>
                      <SelectItem value="10">October</SelectItem>
                      <SelectItem value="11">November</SelectItem>
                      <SelectItem value="12">December</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="birthYear" className="text-xs text-muted-foreground">Year</Label>
                  <Select value={birthYear} onValueChange={setBirthYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {Array.from({ length: 100 }, (_, i) => {
                        const year = new Date().getFullYear() - i;
                        return (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {errors.dateOfBirth && (
                <p className="text-sm text-destructive">{errors.dateOfBirth.message}</p>
              )}
            </div>
          </div>

          {/* Current Passport Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Current Passport Information
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="currentPassportNumber">Current Passport Number *</Label>
              <Input
                id="currentPassportNumber"
                placeholder="Enter your current passport number"
                {...register('currentPassportNumber')}
              />
              {errors.currentPassportNumber && (
                <p className="text-sm text-destructive">{errors.currentPassportNumber.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Passport Issue Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !currentPassportIssueDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {currentPassportIssueDate ? format(currentPassportIssueDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={currentPassportIssueDate}
                      onSelect={(date) => {
                        setCurrentPassportIssueDate(date);
                        setValue('currentPassportIssueDate', date || new Date());
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.currentPassportIssueDate && (
                  <p className="text-sm text-destructive">{errors.currentPassportIssueDate.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Passport Expiry Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !currentPassportExpiryDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {currentPassportExpiryDate ? format(currentPassportExpiryDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={currentPassportExpiryDate}
                      onSelect={(date) => {
                        setCurrentPassportExpiryDate(date);
                        setValue('currentPassportExpiryDate', date || new Date());
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {errors.currentPassportExpiryDate && (
                  <p className="text-sm text-destructive">{errors.currentPassportExpiryDate.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="currentPassportPlaceOfIssue">Place of Issue *</Label>
              <Input
                id="currentPassportPlaceOfIssue"
                placeholder="Enter place where passport was issued"
                {...register('currentPassportPlaceOfIssue')}
              />
              {errors.currentPassportPlaceOfIssue && (
                <p className="text-sm text-destructive">{errors.currentPassportPlaceOfIssue.message}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Contact Information
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="Enter your phone number"
                  {...register('phone')}
                />
                {errors.phone && (
                  <p className="text-sm text-destructive">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
              <Input
                id="alternatePhone"
                placeholder="Enter alternate phone number"
                {...register('alternatePhone')}
              />
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Address Information
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="currentAddress">Current Address *</Label>
              <Textarea
                id="currentAddress"
                placeholder="Enter your complete current address"
                {...register('currentAddress')}
              />
              {errors.currentAddress && (
                <p className="text-sm text-destructive">{errors.currentAddress.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input
                  id="city"
                  placeholder="Enter your city"
                  {...register('city')}
                />
                {errors.city && (
                  <p className="text-sm text-destructive">{errors.city.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">State *</Label>
                <Input
                  id="state"
                  placeholder="Enter your state"
                  {...register('state')}
                />
                {errors.state && (
                  <p className="text-sm text-destructive">{errors.state.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code *</Label>
                <Input
                  id="postalCode"
                  placeholder="Enter postal code"
                  {...register('postalCode')}
                />
                {errors.postalCode && (
                  <p className="text-sm text-destructive">{errors.postalCode.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nationality">Nationality *</Label>
              <Select
                value={watch('nationality')}
                onValueChange={(value) => setValue('nationality', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your nationality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Indian">Indian</SelectItem>
                  <SelectItem value="American">American</SelectItem>
                  <SelectItem value="British">British</SelectItem>
                  <SelectItem value="Canadian">Canadian</SelectItem>
                  <SelectItem value="Australian">Australian</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="Italian">Italian</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="Dutch">Dutch</SelectItem>
                  <SelectItem value="Swedish">Swedish</SelectItem>
                  <SelectItem value="Norwegian">Norwegian</SelectItem>
                  <SelectItem value="Danish">Danish</SelectItem>
                  <SelectItem value="Finnish">Finnish</SelectItem>
                  <SelectItem value="Swiss">Swiss</SelectItem>
                  <SelectItem value="Austrian">Austrian</SelectItem>
                  <SelectItem value="Belgian">Belgian</SelectItem>
                  <SelectItem value="Portuguese">Portuguese</SelectItem>
                  <SelectItem value="Greek">Greek</SelectItem>
                  <SelectItem value="Polish">Polish</SelectItem>
                  <SelectItem value="Czech">Czech</SelectItem>
                  <SelectItem value="Hungarian">Hungarian</SelectItem>
                  <SelectItem value="Romanian">Romanian</SelectItem>
                  <SelectItem value="Bulgarian">Bulgarian</SelectItem>
                  <SelectItem value="Croatian">Croatian</SelectItem>
                  <SelectItem value="Slovak">Slovak</SelectItem>
                  <SelectItem value="Slovenian">Slovenian</SelectItem>
                  <SelectItem value="Estonian">Estonian</SelectItem>
                  <SelectItem value="Latvian">Latvian</SelectItem>
                  <SelectItem value="Lithuanian">Lithuanian</SelectItem>
                  <SelectItem value="Russian">Russian</SelectItem>
                  <SelectItem value="Ukrainian">Ukrainian</SelectItem>
                  <SelectItem value="Belarusian">Belarusian</SelectItem>
                  <SelectItem value="Moldovan">Moldovan</SelectItem>
                  <SelectItem value="Japanese">Japanese</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Korean">Korean</SelectItem>
                  <SelectItem value="Thai">Thai</SelectItem>
                  <SelectItem value="Vietnamese">Vietnamese</SelectItem>
                  <SelectItem value="Filipino">Filipino</SelectItem>
                  <SelectItem value="Indonesian">Indonesian</SelectItem>
                  <SelectItem value="Malaysian">Malaysian</SelectItem>
                  <SelectItem value="Singaporean">Singaporean</SelectItem>
                  <SelectItem value="Brazilian">Brazilian</SelectItem>
                  <SelectItem value="Argentinian">Argentinian</SelectItem>
                  <SelectItem value="Chilean">Chilean</SelectItem>
                  <SelectItem value="Mexican">Mexican</SelectItem>
                  <SelectItem value="South African">South African</SelectItem>
                  <SelectItem value="Egyptian">Egyptian</SelectItem>
                  <SelectItem value="Nigerian">Nigerian</SelectItem>
                  <SelectItem value="Kenyan">Kenyan</SelectItem>
                  <SelectItem value="Moroccan">Moroccan</SelectItem>
                  <SelectItem value="Tunisian">Tunisian</SelectItem>
                  <SelectItem value="Algerian">Algerian</SelectItem>
                  <SelectItem value="Turkish">Turkish</SelectItem>
                  <SelectItem value="Israeli">Israeli</SelectItem>
                  <SelectItem value="Lebanese">Lebanese</SelectItem>
                  <SelectItem value="Jordanian">Jordanian</SelectItem>
                  <SelectItem value="Saudi Arabian">Saudi Arabian</SelectItem>
                  <SelectItem value="Emirati">Emirati</SelectItem>
                  <SelectItem value="Qatari">Qatari</SelectItem>
                  <SelectItem value="Kuwaiti">Kuwaiti</SelectItem>
                  <SelectItem value="Bahraini">Bahraini</SelectItem>
                  <SelectItem value="Omani">Omani</SelectItem>
                  <SelectItem value="Pakistani">Pakistani</SelectItem>
                  <SelectItem value="Bangladeshi">Bangladeshi</SelectItem>
                  <SelectItem value="Sri Lankan">Sri Lankan</SelectItem>
                  <SelectItem value="Nepalese">Nepalese</SelectItem>
                  <SelectItem value="Bhutanese">Bhutanese</SelectItem>
                  <SelectItem value="Afghan">Afghan</SelectItem>
                  <SelectItem value="Iranian">Iranian</SelectItem>
                  <SelectItem value="Iraqi">Iraqi</SelectItem>
                  <SelectItem value="Syrian">Syrian</SelectItem>
                  <SelectItem value="Yemeni">Yemeni</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.nationality && (
                <p className="text-sm text-destructive">{errors.nationality.message}</p>
              )}
            </div>
          </div>

          {/* Renewal Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Renewal Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="renewalReason">Reason for Renewal *</Label>
                <Select
                  value={watch('renewalReason')}
                  onValueChange={(value) => setValue('renewalReason', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select renewal reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expired">Passport Expired</SelectItem>
                    <SelectItem value="expiring">Passport Expiring Soon</SelectItem>
                    <SelectItem value="damaged">Passport Damaged</SelectItem>
                    <SelectItem value="lost">Passport Lost</SelectItem>
                    <SelectItem value="name_change">Name Change</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.renewalReason && (
                  <p className="text-sm text-destructive">{errors.renewalReason.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="passportType">Passport Type *</Label>
                <Select
                  value={watch('passportType')}
                  onValueChange={(value) => setValue('passportType', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select passport type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ordinary">Ordinary Passport</SelectItem>
                    <SelectItem value="official">Official Passport</SelectItem>
                    <SelectItem value="diplomatic">Diplomatic Passport</SelectItem>
                  </SelectContent>
                </Select>
                {errors.passportType && (
                  <p className="text-sm text-destructive">{errors.passportType.message}</p>
                )}
              </div>
            </div>

            {watch('renewalReason') === 'other' && (
              <div className="space-y-2">
                <Label htmlFor="otherReason">Please specify other reason</Label>
                <Input
                  id="otherReason"
                  placeholder="Enter other reason for renewal"
                  {...register('otherReason')}
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="pagesRequired">Number of Pages Required *</Label>
              <RadioGroup
                value={watch('pagesRequired')}
                onValueChange={(value) => setValue('pagesRequired', value as '36' | '60')}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="36" id="pages-36" />
                  <Label htmlFor="pages-36">36 Pages</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="60" id="pages-60" />
                  <Label htmlFor="pages-60">60 Pages</Label>
                </div>
              </RadioGroup>
              {errors.pagesRequired && (
                <p className="text-sm text-destructive">{errors.pagesRequired.message}</p>
              )}
            </div>
          </div>

          {/* Travel Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Travel Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hasUpcomingTravel"
                  checked={watch('hasUpcomingTravel')}
                  onCheckedChange={(checked) => setValue('hasUpcomingTravel', !!checked)}
                />
                <Label htmlFor="hasUpcomingTravel">I have upcoming travel plans</Label>
              </div>

              {watch('hasUpcomingTravel') && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Upcoming Travel Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !upcomingTravelDate && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          {upcomingTravelDate ? format(upcomingTravelDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <CalendarComponent
                          mode="single"
                          selected={upcomingTravelDate}
                          onSelect={(date) => {
                            setUpcomingTravelDate(date);
                            setValue('upcomingTravelDate', date || undefined);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="travelDestination">Travel Destination</Label>
                    <Input
                      id="travelDestination"
                      placeholder="Enter travel destination"
                      {...register('travelDestination')}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="purposeOfTravel">Purpose of Travel</Label>
                <Textarea
                  id="purposeOfTravel"
                  placeholder="Describe the purpose of your travel"
                  {...register('purposeOfTravel')}
                />
              </div>
            </div>
          </div>

          {/* Documents Checklist */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Required Documents Checklist
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasCurrentPassport"
                    checked={watch('hasCurrentPassport')}
                    onCheckedChange={(checked) => setValue('hasCurrentPassport', !!checked)}
                  />
                  <Label htmlFor="hasCurrentPassport">Current Passport</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasOldPassport"
                    checked={watch('hasOldPassport')}
                    onCheckedChange={(checked) => setValue('hasOldPassport', !!checked)}
                  />
                  <Label htmlFor="hasOldPassport">Old Passport (if any)</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasAddressProof"
                    checked={watch('hasAddressProof')}
                    onCheckedChange={(checked) => setValue('hasAddressProof', !!checked)}
                  />
                  <Label htmlFor="hasAddressProof">Address Proof</Label>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasPhoto"
                    checked={watch('hasPhoto')}
                    onCheckedChange={(checked) => setValue('hasPhoto', !!checked)}
                  />
                  <Label htmlFor="hasPhoto">Passport Size Photo</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasNameChangeDocument"
                    checked={watch('hasNameChangeDocument')}
                    onCheckedChange={(checked) => setValue('hasNameChangeDocument', !!checked)}
                  />
                  <Label htmlFor="hasNameChangeDocument">Name Change Document</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Additional Information
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="nameChange"
                  checked={watch('nameChange')}
                  onCheckedChange={(checked) => setValue('nameChange', !!checked)}
                />
                <Label htmlFor="nameChange">I have changed my name</Label>
              </div>

              {watch('nameChange') && (
                <div className="space-y-2">
                  <Label htmlFor="nameChangeDetails">Name Change Details</Label>
                  <Textarea
                    id="nameChangeDetails"
                    placeholder="Please provide details of your name change"
                    {...register('nameChangeDetails')}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="criminalRecord"
                  checked={watch('criminalRecord')}
                  onCheckedChange={(checked) => setValue('criminalRecord', !!checked)}
                />
                <Label htmlFor="criminalRecord">I have a criminal record</Label>
              </div>

              {watch('criminalRecord') && (
                <div className="space-y-2">
                  <Label htmlFor="criminalRecordDetails">Criminal Record Details</Label>
                  <Textarea
                    id="criminalRecordDetails"
                    placeholder="Please provide details of your criminal record"
                    {...register('criminalRecordDetails')}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Communication Preference */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2 flex items-center gap-2">
              <Mail className="w-5 h-5" />
              Communication Preference
            </h3>
            
            <div className="space-y-2">
              <Label>How would you like us to contact you? *</Label>
              <Select
                value={watch('preferredContact')}
                onValueChange={(value) => setValue('preferredContact', value as any)}
                defaultValue="email"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your preferred contact method" />
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
                  <SelectItem value="phone">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Call
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.preferredContact && (
                <p className="text-sm text-destructive">{errors.preferredContact.message}</p>
              )}
            </div>
          </div>

          {/* Additional Message */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Additional Information
            </h3>
            
            <div className="space-y-2">
              <Label htmlFor="additionalMessage">Additional Message or Special Requirements</Label>
              <Textarea
                id="additionalMessage"
                placeholder="Any additional information or special requirements..."
                {...register('additionalMessage')}
              />
            </div>
          </div>

          {/* Submission Method Selector */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Submit Application Via
            </h3>
            
            <div className="space-y-2">
              <Label>Choose how you want to submit your application *</Label>
              <Select
                value={submissionMethod}
                onValueChange={(value) => setSubmissionMethod(value as 'whatsapp' | 'gmail')}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select submission method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="whatsapp">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4" />
                      WhatsApp
                    </div>
                  </SelectItem>
                  <SelectItem value="gmail">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Gmail
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-6">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-md"
            >
              {isSubmitting 
                ? "Submitting Application..." 
                : submissionMethod === 'whatsapp'
                  ? "Submit via WhatsApp"
                  : submissionMethod === 'gmail'
                    ? "Submit via Gmail"
                    : "Submit Passport Renewal Application"
              }
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>
              By submitting this form, you agree to be contacted by VisaCrony regarding your passport renewal.
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

export default PassportRenewalForm;
