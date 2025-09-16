import { sanitizeTextInput, sanitizeEmail } from '../utils/sanitize';

interface EmailData {
  to: string;
  subject: string;
  body: string;
}

interface EmailServiceCallbacks {
  onAccountSelectionRequired?: (emailData: EmailData) => void;
}

export class EmailService {
  private recipientEmail: string;
  private callbacks: EmailServiceCallbacks;

  constructor(callbacks?: EmailServiceCallbacks) {
    // Set the recipient email address
    this.recipientEmail = 'sohithnr29@gmail.com';
    this.callbacks = callbacks || {};
  }

  async openGmailWithPrefilledEmail(emailData: EmailData): Promise<boolean> {
    try {
      // Open Gmail compose directly with pre-filled data
      return this.openGmailDirectly(emailData);
    } catch (error) {
      console.error('Failed to open Gmail:', error);
      return false;
    }
  }

  async openGmailDirectly(emailData: EmailData): Promise<boolean> {
    try {
      // Open Gmail compose URL directly with pre-filled data
      const gmailUrl = this.createGmailComposeUrl(emailData);
      const gmailWindow = window.open(gmailUrl, '_blank');
      
      // Focus on the Gmail window to ensure user sees the pre-filled email
      if (gmailWindow) {
        gmailWindow.focus();
      }
      
      return true;
    } catch (error) {
      console.error('Failed to open Gmail:', error);
      return false;
    }
  }

  private createGmailComposeUrl(emailData: EmailData): string {
    // Create Gmail compose URL with pre-filled data
    // This will open Gmail compose window with all details ready to send
    const to = emailData.to || this.recipientEmail;
    const subject = emailData.subject || '';
    const body = emailData.body || '';

    // Enhanced Gmail compose URL with additional parameters for better reliability
    const params = new URLSearchParams({
      view: 'cm',
      fs: '1',
      to: to,
      su: subject,
      body: body,
      tf: 'cm' // Force compose mode
    });

    return `https://mail.google.com/mail/?${params.toString()}`;
  }

  generateEmailBody(formData: any): string {
    const formatDate = (dateString: string) => {
      if (!dateString) return 'Not specified';
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };

    // Sanitize all user inputs
    const sanitizedData = {
      name: sanitizeTextInput(formData.name || ''),
      email: sanitizeEmail(formData.email || ''),
      phone: sanitizeTextInput(formData.phone || ''),
      passportNumber: sanitizeTextInput(formData.passportNumber || ''),
      nationality: sanitizeTextInput(formData.nationality || ''),
      address: sanitizeTextInput(formData.address || ''),
      state: sanitizeTextInput(formData.state || ''),
      country: sanitizeTextInput(formData.country || ''),
      postalCode: sanitizeTextInput(formData.postalCode || ''),
      selectedCountry: sanitizeTextInput(formData.selectedCountry || ''),
      selectedVisaType: sanitizeTextInput(formData.selectedVisaType || ''),
      selectedCategory: sanitizeTextInput(formData.selectedCategory || ''),
      purposeOfVisit: sanitizeTextInput(formData.purposeOfVisit || ''),
      numberOfTravelers: sanitizeTextInput(formData.numberOfTravelers || ''),
      message: sanitizeTextInput(formData.message || ''),
      previousTravelHistory: sanitizeTextInput(formData.previousTravelHistory || ''),
      previousVisaApplication: sanitizeTextInput(formData.previousVisaApplication || ''),
      preferredContact: sanitizeTextInput(formData.preferredContact || ''),
      gender: sanitizeTextInput(formData.gender || '')
    };

    return `Visa Enquiry Form Submission

Dear VisaCrony Team,

I am writing to inquire about visa services for ${sanitizedData.selectedCountry || 'my travel destination'}. Please find my details below:

PERSONAL INFORMATION:
• Full Name: ${sanitizedData.name}
• Email: ${sanitizedData.email}
• Phone: ${sanitizedData.phone}
• Passport Number: ${sanitizedData.passportNumber || 'Not provided'}
• Nationality: ${sanitizedData.nationality}
• Date of Birth: ${formatDate(formData.dateOfBirth)}
• Gender: ${sanitizedData.gender || 'Not specified'}

ADDRESS:
• Street Address: ${sanitizedData.address}
• State/Province: ${sanitizedData.state}
• Country: ${sanitizedData.country}
• Postal Code: ${sanitizedData.postalCode}

TRAVEL INFORMATION:
• Selected Country: ${sanitizedData.selectedCountry}
• Visa Type: ${sanitizedData.selectedVisaType}
• Category: ${sanitizedData.selectedCategory}
• Purpose of Visit: ${sanitizedData.purposeOfVisit}
• Number of Travelers: ${sanitizedData.numberOfTravelers}
• Travel Dates: ${formData.fromDate ? formatDate(formData.fromDate) : 'Not specified'}${formData.toDate ? ` to ${formatDate(formData.toDate)}` : ''}
• Additional Message: ${sanitizedData.message || 'None'}

ADDITIONAL INFORMATION:
• Previous Travel History: ${sanitizedData.previousTravelHistory || 'None provided'}
• Previous Visa Application: ${sanitizedData.previousVisaApplication || 'Not specified'}

COMMUNICATION PREFERENCE: ${sanitizedData.preferredContact}

Submitted on: ${new Date(formData.timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}

I look forward to hearing from you soon.

Best regards,
${sanitizedData.name}`;
  }

  generateEmailSubject(formData: any): string {
    const sanitizedCountry = sanitizeTextInput(formData.selectedCountry || 'Travel');
    const sanitizedName = sanitizeTextInput(formData.name || '');
    return `Visa Enquiry - ${sanitizedCountry} - ${sanitizedName}`;
  }
}

