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
import { Calendar, FileText, User, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EmailService } from '@/services/emailService';

const freshPassportSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  middleName: z.string().optional(),
  dateOfBirth: z.date({
    required_error: 'Date of birth is required',
  }),
  placeOfBirth: z.string().min(2, 'Place of birth is required'),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select your gender',
  }),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed'], {
    required_error: 'Please select your marital status',
  }),
  
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
  
  
  // Passport Details
  passportType: z.enum(['ordinary', 'official', 'diplomatic'], {
    required_error: 'Please select passport type',
  }),
  purposeOfTravel: z.string().min(5, 'Purpose of travel is required'),
  intendedTravelDate: z.date().optional(),
  
  // Documents
  hasBirthCertificate: z.boolean(),
  hasIdentityProof: z.boolean(),
  hasAddressProof: z.boolean(),
  hasPhoto: z.boolean(),
  
  // Additional Information
  previousPassport: z.boolean(),
  previousPassportNumber: z.string().optional(),
  criminalRecord: z.boolean(),
  criminalRecordDetails: z.string().optional(),
  
  // Communication Preference
  preferredContact: z.enum(['email', 'whatsapp', 'phone'], {
    required_error: 'Please select your preferred contact method',
  }),
  
  // Additional Message
  additionalMessage: z.string().optional(),
});

type FreshPassportFormData = z.infer<typeof freshPassportSchema>;

const FreshPassportForm: React.FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [intendedTravelDate, setIntendedTravelDate] = useState<Date>();
  const [dateOfBirth, setDateOfBirth] = useState<Date>();
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
  } = useForm<FreshPassportFormData>({
    resolver: zodResolver(freshPassportSchema),
    defaultValues: {
      passportType: 'ordinary',
      preferredContact: 'email',
      hasBirthCertificate: false,
      hasIdentityProof: false,
      hasAddressProof: false,
      hasPhoto: false,
      previousPassport: false,
      criminalRecord: false,
    }
  });

  const onSubmit = async (data: FreshPassportFormData) => {
    console.log('Form submitted with data:', data);
    console.log('Form errors:', errors);
    setIsSubmitting(true);

    try {
      const formSubmissionData = {
        ...data,
        dateOfBirth: dateOfBirth?.toISOString(),
        intendedTravelDate: intendedTravelDate?.toISOString(),
        timestamp: new Date().toISOString(),
        serviceType: 'Fresh Passport Application'
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
          selectedCountry: 'Fresh Passport Application',
          name: `${data.firstName} ${data.lastName}`
        });
        const emailBody = emailService.generateEmailBody(formSubmissionData);
        
        console.log('Email subject:', emailSubject);
        console.log('Email body:', emailBody);
        
        await emailService.openGmailWithPrefilledEmail({
          to: 'sohithnr29@gmail.com',
          subject: emailSubject,
          body: emailBody
        });
      }

      toast({
        title: "Fresh Passport Application Submitted!",
        description: `Your fresh passport application has been submitted! ` + 
          (submissionMethod === 'gmail'
            ? "Gmail compose window has been opened with your application details ready to send."
            : submissionMethod === 'whatsapp'
            ? "WhatsApp chat has been opened with your application details ready to send."
            : "Please select a submission method."),
      });

      // Reset form
      reset();
      setDateOfBirth(undefined);
      setIntendedTravelDate(undefined);
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

    return `🛂 Fresh Passport Application\n\n` +
      `Personal Information:\n` +
      `• Full Name: ${formData.firstName} ${formData.middleName || ''} ${formData.lastName}\n` +
      `• Date of Birth: ${formatDate(formData.dateOfBirth)}\n` +
      `• Place of Birth: ${formData.placeOfBirth || 'Not provided'}\n` +
      `• Gender: ${formData.gender || 'Not specified'}\n` +
      `• Marital Status: ${formData.maritalStatus || 'Not specified'}\n\n` +
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
      `Passport Details:\n` +
      `• Passport Type: ${formData.passportType || 'Not specified'}\n` +
      `• Purpose of Travel: ${formData.purposeOfTravel || 'Not specified'}\n` +
      `${formData.intendedTravelDate ? `• Intended Travel Date: ${formatDate(formData.intendedTravelDate)}\n` : ''}` +
      `\nDocuments Available:\n` +
      `✓ Birth Certificate: ${formData.hasBirthCertificate ? 'Yes' : 'No'}\n` +
      `✓ Identity Proof: ${formData.hasIdentityProof ? 'Yes' : 'No'}\n` +
      `✓ Address Proof: ${formData.hasAddressProof ? 'Yes' : 'No'}\n` +
      `✓ Photo: ${formData.hasPhoto ? 'Yes' : 'No'}\n\n` +
      `Additional Information:\n` +
      `• Previous Passport: ${formData.previousPassport ? 'Yes' : 'No'}\n` +
      `${formData.previousPassportNumber ? `• Previous Passport Number: ${formData.previousPassportNumber}\n` : ''}` +
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
          <FileText className="w-6 h-6 text-primary" />
          Fresh Passport Application Form
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Complete this form to apply for your first passport. Our experts will guide you through the process.
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

            <div className="space-y-2">
              <Label htmlFor="placeOfBirth">Place of Birth *</Label>
              <Input
                id="placeOfBirth"
                placeholder="Enter your place of birth"
                {...register('placeOfBirth')}
              />
              {errors.placeOfBirth && (
                <p className="text-sm text-destructive">{errors.placeOfBirth.message}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Gender *</Label>
                <Select
                  value={watch('gender')}
                  onValueChange={(value) => setValue('gender', value as 'male' | 'female' | 'other')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.gender && (
                  <p className="text-sm text-destructive">{errors.gender.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="maritalStatus">Marital Status *</Label>
                <Select
                  value={watch('maritalStatus')}
                  onValueChange={(value) => setValue('maritalStatus', value as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="divorced">Divorced</SelectItem>
                    <SelectItem value="widowed">Widowed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.maritalStatus && (
                  <p className="text-sm text-destructive">{errors.maritalStatus.message}</p>
                )}
              </div>
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





          {/* Passport Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold border-b pb-2">
              Passport Details
            </h3>
            
            <div className="grid md:grid-cols-2 gap-4">
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

              <div className="space-y-2">
                <Label>Intended Travel Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !intendedTravelDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {intendedTravelDate ? format(intendedTravelDate, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={intendedTravelDate}
                      onSelect={(date) => {
                        setIntendedTravelDate(date);
                        setValue('intendedTravelDate', date || undefined);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="purposeOfTravel">Purpose of Travel *</Label>
              <Textarea
                id="purposeOfTravel"
                placeholder="Describe the purpose of your travel"
                {...register('purposeOfTravel')}
              />
              {errors.purposeOfTravel && (
                <p className="text-sm text-destructive">{errors.purposeOfTravel.message}</p>
              )}
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
                    id="hasBirthCertificate"
                    checked={watch('hasBirthCertificate')}
                    onCheckedChange={(checked) => setValue('hasBirthCertificate', !!checked)}
                  />
                  <Label htmlFor="hasBirthCertificate">Birth Certificate</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasIdentityProof"
                    checked={watch('hasIdentityProof')}
                    onCheckedChange={(checked) => setValue('hasIdentityProof', !!checked)}
                  />
                  <Label htmlFor="hasIdentityProof">Identity Proof (Aadhaar/Voter ID)</Label>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasAddressProof"
                    checked={watch('hasAddressProof')}
                    onCheckedChange={(checked) => setValue('hasAddressProof', !!checked)}
                  />
                  <Label htmlFor="hasAddressProof">Address Proof</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="hasPhoto"
                    checked={watch('hasPhoto')}
                    onCheckedChange={(checked) => setValue('hasPhoto', !!checked)}
                  />
                  <Label htmlFor="hasPhoto">Passport Size Photo</Label>
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
                  id="previousPassport"
                  checked={watch('previousPassport')}
                  onCheckedChange={(checked) => setValue('previousPassport', !!checked)}
                />
                <Label htmlFor="previousPassport">I have had a previous passport</Label>
              </div>

              {watch('previousPassport') && (
                <div className="space-y-2">
                  <Label htmlFor="previousPassportNumber">Previous Passport Number</Label>
                  <Input
                    id="previousPassportNumber"
                    placeholder="Enter previous passport number"
                    {...register('previousPassportNumber')}
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
                    : "Submit Fresh Passport Application"
              }
            </Button>
          </div>

          {/* Disclaimer */}
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>
              By submitting this form, you agree to be contacted by VisaCrony regarding your passport application.
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

export default FreshPassportForm;
