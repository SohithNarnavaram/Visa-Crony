import axios from 'axios';
import { sanitizeTextInput } from '../utils/sanitize';

interface WhatsAppMessage {
  to: string;
  message: string;
}

export class WhatsAppService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    // Using a WhatsApp API service like Twilio or WhatsApp Business API
    // For demo purposes, we'll use a simple approach
    this.apiUrl = process.env.NEXT_PUBLIC_WHATSAPP_API_URL || '';
    this.apiKey = process.env.NEXT_PUBLIC_WHATSAPP_API_KEY || '';
  }

  async sendMessage(messageData: WhatsAppMessage): Promise<boolean> {
    try {
      // For now, we'll open WhatsApp Web with the message
      // In production, you'd use a proper WhatsApp Business API
      const whatsappUrl = `https://wa.me/${messageData.to}?text=${encodeURIComponent(messageData.message)}`;
      window.open(whatsappUrl, '_blank');
      
      // If you have a WhatsApp API service, uncomment the following:
      /*
      const response = await axios.post(this.apiUrl, {
        to: messageData.to,
        message: messageData.message
      }, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      return response.status === 200;
      */
      
      return true; // For the WhatsApp Web approach
    } catch (error) {
      console.error('Failed to send WhatsApp message:', error);
      return false;
    }
  }

  generateMessage(formData: any): string {
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
      email: sanitizeTextInput(formData.email || ''),
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

    return `**Visa Enquiry Form Submission**

**Personal Information:**
• Full Name: ${sanitizedData.name}
• Email: ${sanitizedData.email}
• Phone: ${sanitizedData.phone}
• Passport Number: ${sanitizedData.passportNumber || 'Not provided'}
• Nationality: ${sanitizedData.nationality}
• Date of Birth: ${formatDate(formData.dateOfBirth)}
• Gender: ${sanitizedData.gender || 'Not specified'}

**Address:**
• Street Address: ${sanitizedData.address}
• State/Province: ${sanitizedData.state}
• Country: ${sanitizedData.country}
• Postal Code: ${sanitizedData.postalCode}

**Travel Information:**
• Selected Country: ${sanitizedData.selectedCountry}
• Visa Type: ${sanitizedData.selectedVisaType}
• Category: ${sanitizedData.selectedCategory}
• Purpose of Visit: ${sanitizedData.purposeOfVisit}
• Number of Travelers: ${sanitizedData.numberOfTravelers}
• Travel Dates: ${formData.fromDate ? formatDate(formData.fromDate) : 'Not specified'}${formData.toDate ? ` to ${formatDate(formData.toDate)}` : ''}
• Additional Message: ${sanitizedData.message || 'None'}

**Additional Information:**
• Previous Travel History: ${sanitizedData.previousTravelHistory || 'None provided'}
• Previous Visa Application: ${sanitizedData.previousVisaApplication || 'Not specified'}

**Communication Preference:** ${sanitizedData.preferredContact}

**Submitted on:** ${new Date(formData.timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })}

Thank you for your enquiry! We will get back to you soon.`;
  }
}

