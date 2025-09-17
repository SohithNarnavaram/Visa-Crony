import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, Send, X, Bot, User, Mic, MicOff, Volume2, VolumeX, RotateCcw, Settings, Mail, Phone, ExternalLink, FileText, Calendar, CheckCircle, Globe, MapPin, Plane } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isError?: boolean;
  actions?: ActionButton[];
  type?: 'text' | 'action' | 'form_guide' | 'contact' | 'navigation';
}

interface ActionButton {
  id: string;
  label: string;
  action: string;
  icon?: React.ReactNode;
  variant?: 'default' | 'outline' | 'secondary';
}

interface ChatSettings {
  voiceEnabled: boolean;
  soundEnabled: boolean;
  autoScroll: boolean;
}

interface Country {
  name: string;
  visaType: string;
  processingDays: string;
  visaFees: string;
  serviceFees: string;
  description: string;
}

interface VisaType {
  title: string;
  icon: any;
  countries: Country[];
}

const Chatbot = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedVisaType, setSelectedVisaType] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  // Visa types and countries data (simplified version from VisaServices)
  const visaTypes: { [key: string]: VisaType } = {
    eVisa: {
      title: "E-Visas (Online)",
      icon: FileText,
      countries: [
        { name: "Australia", visaType: "e-Visa", processingDays: "20 Working Days", visaFees: "₹9400", serviceFees: "₹2499", description: "Electronic visa for Australia tourism and business." },
        { name: "Singapore", visaType: "e-Visa", processingDays: "6 Working Days", visaFees: "₹3000", serviceFees: "₹599", description: "Quick online visa for Singapore visits." },
        { name: "Dubai", visaType: "e-Visa", processingDays: "6 Working Days", visaFees: "₹7300", serviceFees: "₹599", description: "Electronic visa for Dubai tourism and business." },
        { name: "Thailand", visaType: "e-Visa", processingDays: "7 Working Days", visaFees: "₹2900", serviceFees: "₹599", description: "Electronic visa for Thailand tourism." },
        { name: "Turkey", visaType: "e-Visa", processingDays: "17 Working Days", visaFees: "₹20000", serviceFees: "₹2499", description: "Electronic visa for Turkey visits." },
        { name: "South Korea", visaType: "e-Visa", processingDays: "17 Working Days", visaFees: "₹7800", serviceFees: "₹1999", description: "Online visa for South Korea tourism and business." }
      ]
    },
    stickerVisa: {
      title: "Sticker Visas",
      icon: FileText,
      countries: [
        { name: "United States", visaType: "Sticker Visa", processingDays: "15 Working Days", visaFees: "₹16000", serviceFees: "₹2499", description: "Tourist and business visa for USA." },
        { name: "United Kingdom", visaType: "Sticker Visa", processingDays: "15 Working Days", visaFees: "₹16000", serviceFees: "₹2499", description: "Tourist and business visa for UK." },
        { name: "Canada", visaType: "Sticker Visa", processingDays: "15 Working Days", visaFees: "₹16000", serviceFees: "₹2499", description: "Tourist and business visa for Canada." },
        { name: "Schengen", visaType: "Sticker Visa", processingDays: "15 Working Days", visaFees: "₹16000", serviceFees: "₹2499", description: "Schengen visa for European countries." }
      ]
    },
    onArrival: {
      title: "Visa on Arrival",
      icon: Plane,
      countries: [
        { name: "Maldives", visaType: "Visa on Arrival", processingDays: "On Arrival", visaFees: "₹0", serviceFees: "₹299", description: "Visa available upon arrival in Maldives." },
        { name: "Nepal", visaType: "Visa on Arrival", processingDays: "On Arrival", visaFees: "₹0", serviceFees: "₹299", description: "Visa available upon arrival in Nepal." },
        { name: "Bhutan", visaType: "Visa on Arrival", processingDays: "On Arrival", visaFees: "₹0", serviceFees: "₹299", description: "Visa available upon arrival in Bhutan." }
      ]
    }
  };
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your VisaCrony assistant. I can help you with forms, contact our team, navigate our website, and provide follow-up support. What would you like to do?',
      isBot: true,
      timestamp: new Date(),
      type: 'action',
      actions: [
        { id: 'forms', label: 'Help with Forms', action: 'forms', icon: <FileText className="w-4 h-4" /> },
        { id: 'contact', label: 'Contact Support', action: 'contact', icon: <Phone className="w-4 h-4" /> },
        { id: 'navigate', label: 'Browse Services', action: 'navigate', icon: <ExternalLink className="w-4 h-4" /> },
        { id: 'followup', label: 'Follow-up Support', action: 'followup', icon: <Calendar className="w-4 h-4" /> }
      ]
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [settings, setSettings] = useState<ChatSettings>({
    voiceEnabled: false,
    soundEnabled: true,
    autoScroll: true,
  });
  const [showSettings, setShowSettings] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Google AI API Configuration
  const GOOGLE_AI_API_KEY = 'AIzaSyCCjlho9IsIvRCjLKOp3ZHdpkTv5idWAGY';
  const GOOGLE_AI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  const scrollToBottom = useCallback(() => {
    if (settings.autoScroll) {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [settings.autoScroll]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        toast({
          title: "Speech recognition error",
          description: "Could not process speech input. Please try typing instead.",
          variant: "destructive"
        });
      };
    }
  }, []);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Enhanced AI response with action detection
  const getAIResponse = async (userMessage: string): Promise<{ text: string; actions?: ActionButton[]; type?: string }> => {
    try {
      const context = `You are VisaCrony AI Assistant, a helpful chatbot for a visa and passport services company. 
      Analyze the user's message and determine if they need:
      1. Form assistance (passport/visa applications)
      2. Contact support (email/WhatsApp)
      3. Website navigation (services, pages)
      4. Follow-up support (appointment reminders, status updates)
      5. General information
      
      Website Structure:
      - Home page (/)
      - About Us (/about)
      - Visa Services (/visa-services) - with enquiry forms and country selection
      - Passport Services (/passport-services) - Fresh Passport & Renewal forms
      - Testimonials (/testimonials)
      - Contact Us (/contact)
      
      Available Forms:
      - Fresh Passport Application (comprehensive form with personal details, documents)
      - Passport Renewal (simplified renewal process)
      - Visa Enquiry Form (for visa applications and information)
      - General Enquiry Form (for general questions and support)
      
      Visa Types Available:
      - E-Visas (Online): Australia, Singapore, Dubai, Thailand, Turkey, South Korea
      - Sticker Visas: United States, United Kingdom, Canada, Schengen
      - Visa on Arrival: Maldives, Nepal, Bhutan
      
      Country Selection Process:
      - Users can browse visa types first
      - Then select specific countries within each visa type
      - Get detailed information about processing times, fees, and requirements
      - Direct navigation to application forms with pre-selected country data
      
      Company Services:
      - Visa services: tourist, business, student visas
      - Passport services: new applications, renewals, urgent processing
      - Processing times: 3-21 days typically
      - High success rate
      - Expert consultation available
      - Email: support@visacrony.com
      - Phone: +1 (234) 567-890
      - WhatsApp: Available for instant support
      
      User message: ${userMessage}
      
      Respond with helpful information and suggest relevant actions if appropriate.`;

      const response = await fetch(`${GOOGLE_AI_ENDPOINT}?key=${GOOGLE_AI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: context
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`AI API error: ${response.status}`);
      }

      const data = await response.json();
      const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
             'I apologize, but I\'m having trouble processing your request right now. Please try again or contact our support team for immediate assistance.';
      
      // Analyze user intent and add appropriate actions
      const actions = getActionsForIntent(userMessage, aiText);
      
      return { text: aiText, actions, type: actions.length > 0 ? 'action' : 'text' };
    } catch (error) {
      console.error('AI API Error:', error);
      const fallbackText = getFallbackResponse(userMessage);
      const actions = getActionsForIntent(userMessage, fallbackText);
      return { text: fallbackText, actions, type: actions.length > 0 ? 'action' : 'text' };
    }
  };

  // Determine actions based on user intent
  const getActionsForIntent = (userMessage: string, responseText: string): ActionButton[] => {
    const lowerMessage = userMessage.toLowerCase();
    const actions: ActionButton[] = [];

    // Form assistance - specific to actual forms
    if (lowerMessage.includes('form') || lowerMessage.includes('application') || lowerMessage.includes('apply')) {
      if (lowerMessage.includes('passport') || lowerMessage.includes('fresh') || lowerMessage.includes('new')) {
        actions.push(
          { id: 'fresh-passport', label: 'Fresh Passport Form', action: 'navigate_passport', icon: <FileText className="w-4 h-4" /> }
        );
      } else if (lowerMessage.includes('renewal') || lowerMessage.includes('renew')) {
        actions.push(
          { id: 'passport-renewal', label: 'Passport Renewal Form', action: 'navigate_passport', icon: <FileText className="w-4 h-4" /> }
        );
      } else if (lowerMessage.includes('visa')) {
        actions.push(
          { id: 'visa-types', label: 'Browse Visa Types', action: 'visa_types', icon: <Globe className="w-4 h-4" /> },
          { id: 'visa-enquiry', label: 'Visa Enquiry Form', action: 'navigate_visa', icon: <FileText className="w-4 h-4" /> }
        );
      } else {
        actions.push(
          { id: 'fresh-passport', label: 'Fresh Passport', action: 'navigate_passport', icon: <FileText className="w-4 h-4" /> },
          { id: 'passport-renewal', label: 'Passport Renewal', action: 'navigate_passport', icon: <FileText className="w-4 h-4" /> },
          { id: 'visa-types', label: 'Browse Visa Types', action: 'visa_types', icon: <Globe className="w-4 h-4" /> }
        );
      }
    }

    // Visa and country specific intents
    if (lowerMessage.includes('visa') || lowerMessage.includes('country') || lowerMessage.includes('travel') || lowerMessage.includes('destination')) {
      if (lowerMessage.includes('type') || lowerMessage.includes('kind') || lowerMessage.includes('category')) {
        actions.push(
          { id: 'visa-types', label: 'Browse Visa Types', action: 'visa_types', icon: <Globe className="w-4 h-4" /> }
        );
      } else {
        actions.push(
          { id: 'visa-types', label: 'Browse Visa Types', action: 'visa_types', icon: <Globe className="w-4 h-4" /> },
          { id: 'visa-services', label: 'Visa Services', action: 'navigate_visa', icon: <ExternalLink className="w-4 h-4" /> }
        );
      }
    }

    // Contact support
    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('email') || lowerMessage.includes('whatsapp') || lowerMessage.includes('support')) {
      actions.push(
        { id: 'email-contact', label: 'Send Email', action: 'email', icon: <Mail className="w-4 h-4" /> },
        { id: 'whatsapp-contact', label: 'WhatsApp Chat', action: 'whatsapp', icon: <Phone className="w-4 h-4" /> },
        { id: 'contact-page', label: 'Contact Page', action: 'navigate_contact', icon: <ExternalLink className="w-4 h-4" /> }
      );
    }

    // Navigation - specific to actual pages
    if (lowerMessage.includes('service') || lowerMessage.includes('page') || lowerMessage.includes('browse') || lowerMessage.includes('visit') || lowerMessage.includes('navigate')) {
      if (lowerMessage.includes('visa')) {
        actions.push(
          { id: 'visa-services', label: 'Visa Services', action: 'navigate_visa', icon: <ExternalLink className="w-4 h-4" /> }
        );
      } else if (lowerMessage.includes('passport')) {
        actions.push(
          { id: 'passport-services', label: 'Passport Services', action: 'navigate_passport', icon: <ExternalLink className="w-4 h-4" /> }
        );
      } else if (lowerMessage.includes('about')) {
        actions.push(
          { id: 'about-page', label: 'About Us', action: 'navigate_about', icon: <ExternalLink className="w-4 h-4" /> }
        );
      } else if (lowerMessage.includes('testimonial') || lowerMessage.includes('review')) {
        actions.push(
          { id: 'testimonials', label: 'Testimonials', action: 'navigate_testimonials', icon: <ExternalLink className="w-4 h-4" /> }
        );
      } else {
        actions.push(
          { id: 'home', label: 'Home', action: 'navigate_home', icon: <ExternalLink className="w-4 h-4" /> },
          { id: 'visa-services', label: 'Visa Services', action: 'navigate_visa', icon: <ExternalLink className="w-4 h-4" /> },
          { id: 'passport-services', label: 'Passport Services', action: 'navigate_passport', icon: <ExternalLink className="w-4 h-4" /> }
        );
      }
    }

    // Follow-up support
    if (lowerMessage.includes('follow') || lowerMessage.includes('reminder') || lowerMessage.includes('status') || lowerMessage.includes('update') || lowerMessage.includes('callback')) {
      actions.push(
        { id: 'schedule-callback', label: 'Schedule Callback', action: 'schedule_callback', icon: <Calendar className="w-4 h-4" /> },
        { id: 'status-check', label: 'Check Status', action: 'status_check', icon: <CheckCircle className="w-4 h-4" /> }
      );
    }

    return actions;
  };

  // Fallback response system
  const getFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('visa') || lowerMessage.includes('tourist') || lowerMessage.includes('business')) {
      return 'Great! We offer comprehensive visa services for tourist, business, and other visa types. Our processing time is typically 3-21 days with a 95% success rate. Would you like to know more about any specific visa type?';
    }
    
    if (lowerMessage.includes('passport')) {
      return 'We provide complete passport services including new applications, renewals, and urgent processing. Our team handles all the paperwork and ensures quick processing. What passport service do you need help with?';
    }
    
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fee')) {
      return 'Our pricing varies based on the service type and processing time. For accurate pricing, I\'d recommend booking a free consultation with our experts. Would you like me to help you schedule one?';
    }
    
    if (lowerMessage.includes('time') || lowerMessage.includes('processing') || lowerMessage.includes('duration')) {
      return 'Processing times vary: Tourist visas typically take 3-7 days, business visas 5-14 days, and passports 7-21 days. We also offer express services for urgent applications. What type of application are you planning?';
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('call') || lowerMessage.includes('phone')) {
      return 'You can reach us through our Contact page or book a free consultation directly. We provide 24/7 assistance and have experts ready to help with your application. Would you like me to direct you to our contact form?';
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return 'Hello! Welcome to VisaCrony. I\'m here to help you with all your visa and passport needs. What can I assist you with today?';
    }
    
    return 'I\'d be happy to help you with that! For detailed information about our services, pricing, or to get personalized assistance, I recommend booking a free consultation with our visa experts. They can provide you with accurate information based on your specific needs. Would you like me to help you get in touch?';
  };

  // Handle action button clicks
  const handleActionClick = (action: string) => {
    switch (action) {
      case 'forms':
        addMessage('I can help you with passport and visa application forms. Which service do you need assistance with?', 'action', [
          { id: 'fresh-passport', label: 'Fresh Passport', action: 'navigate_passport', icon: <FileText className="w-4 h-4" /> },
          { id: 'passport-renewal', label: 'Passport Renewal', action: 'navigate_passport', icon: <FileText className="w-4 h-4" /> },
          { id: 'visa-types', label: 'Browse Visa Types', action: 'visa_types', icon: <Globe className="w-4 h-4" /> },
          { id: 'visa-enquiry', label: 'Visa Enquiry', action: 'navigate_visa', icon: <FileText className="w-4 h-4" /> }
        ]);
        break;
      case 'contact':
        addMessage('I can help you contact our support team. Choose your preferred method:', 'action', [
          { id: 'email-contact', label: 'Send Email', action: 'email', icon: <Mail className="w-4 h-4" /> },
          { id: 'whatsapp-contact', label: 'WhatsApp Chat', action: 'whatsapp', icon: <Phone className="w-4 h-4" /> },
          { id: 'phone-contact', label: 'Call Us', action: 'phone', icon: <Phone className="w-4 h-4" /> },
          { id: 'contact-page', label: 'Contact Page', action: 'navigate_contact', icon: <ExternalLink className="w-4 h-4" /> }
        ]);
        break;
      case 'navigate':
        addMessage('I can help you navigate to different sections of our website:', 'action', [
          { id: 'home', label: 'Home', action: 'navigate_home', icon: <ExternalLink className="w-4 h-4" /> },
          { id: 'visa-services', label: 'Visa Services', action: 'navigate_visa', icon: <ExternalLink className="w-4 h-4" /> },
          { id: 'passport-services', label: 'Passport Services', action: 'navigate_passport', icon: <ExternalLink className="w-4 h-4" /> },
          { id: 'about-page', label: 'About Us', action: 'navigate_about', icon: <ExternalLink className="w-4 h-4" /> },
          { id: 'testimonials', label: 'Testimonials', action: 'navigate_testimonials', icon: <ExternalLink className="w-4 h-4" /> },
          { id: 'contact-page', label: 'Contact Us', action: 'navigate_contact', icon: <ExternalLink className="w-4 h-4" /> }
        ]);
        break;
      case 'followup':
        addMessage('I can help you with follow-up support and reminders:', 'action', [
          { id: 'schedule-callback', label: 'Schedule Callback', action: 'schedule_callback', icon: <Calendar className="w-4 h-4" /> },
          { id: 'status-check', label: 'Check Application Status', action: 'status_check', icon: <CheckCircle className="w-4 h-4" /> },
          { id: 'reminder-set', label: 'Set Reminder', action: 'set_reminder', icon: <Calendar className="w-4 h-4" /> }
        ]);
        break;
      // Navigation actions
      case 'navigate_home':
        navigate('/');
        addMessage('Taking you to our Home page where you can explore all our services.', 'text');
        break;
      case 'navigate_passport':
        navigate('/passport-services');
        addMessage('Taking you to our Passport Services page where you can find Fresh Passport and Renewal forms.', 'text');
        break;
      case 'navigate_visa':
        navigate('/visa-services');
        addMessage('Taking you to our Visa Services page where you can explore different visa types and application processes.', 'text');
        break;
      case 'navigate_about':
        navigate('/about');
        addMessage('Taking you to our About Us page to learn more about VisaCrony.', 'text');
        break;
      case 'navigate_testimonials':
        navigate('/testimonials');
        addMessage('Taking you to our Testimonials page to read reviews from our satisfied customers.', 'text');
        break;
      case 'navigate_contact':
        navigate('/contact');
        addMessage('Taking you to our Contact page where you can reach our support team directly.', 'text');
        break;
      // Contact actions
      case 'email':
        window.location.href = 'mailto:support@visacrony.com?subject=VisaCrony Support Request';
        addMessage('Opening your email client to contact our support team. You can also email us at support@visacrony.com', 'text');
        break;
      case 'whatsapp':
        window.open('https://wa.me/1234567890?text=Hi, I need help with my visa/passport application', '_blank');
        addMessage('Opening WhatsApp to chat with our support team. You can also reach us at +1 (234) 567-890', 'text');
        break;
      case 'phone':
        window.location.href = 'tel:+1234567890';
        addMessage('Calling our support line at +1 (234) 567-890. Our team is available 24/7 to assist you.', 'text');
        break;
      // Follow-up actions
      case 'schedule_callback':
        addMessage('I can help you schedule a callback. Please provide your phone number and preferred time, and our team will call you back within 24 hours.', 'text');
        break;
      case 'status_check':
        addMessage('To check your application status, please provide your application reference number or email address used during application.', 'text');
        break;
      case 'set_reminder':
        addMessage('I can help you set reminders for important dates. What would you like to be reminded about? (e.g., appointment dates, document expiry)', 'text');
        break;
      // Visa type and country selection
      case 'visa_types':
        addMessage('Choose the type of visa you need:', 'action', [
          { id: 'evisa', label: 'E-Visas (Online)', action: 'select_visa_type', icon: <FileText className="w-4 h-4" /> },
          { id: 'sticker', label: 'Sticker Visas', action: 'select_visa_type', icon: <FileText className="w-4 h-4" /> },
          { id: 'onarrival', label: 'Visa on Arrival', action: 'select_visa_type', icon: <Plane className="w-4 h-4" /> }
        ]);
        break;
      case 'select_visa_type':
        const visaTypeKey = action.split('_')[2] || 'eVisa';
        setSelectedVisaType(visaTypeKey);
        const visaType = visaTypes[visaTypeKey];
        const countryActions = visaType.countries.map(country => ({
          id: `country_${country.name.toLowerCase().replace(/\s+/g, '_')}`,
          label: country.name,
          action: 'select_country',
          icon: <MapPin className="w-4 h-4" />
        }));
        addMessage(`Great! You selected ${visaType.title}. Now choose your destination country:`, 'action', countryActions);
        break;
      case 'select_country':
        const countryName = action.split('_')[1]?.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        const visaTypeForCountry = selectedVisaType ? visaTypes[selectedVisaType] : visaTypes.eVisa;
        const country = visaTypeForCountry.countries.find(c => c.name.toLowerCase().replace(/\s+/g, '_') === action.split('_')[1]);
        if (country) {
          setSelectedCountry(country);
          addMessage(`Perfect! You selected ${country.name} (${country.visaType}). Here are the details:

📋 **Visa Details:**
• Processing Time: ${country.processingDays}
• Visa Fee: ${country.visaFees}
• Service Fee: ${country.serviceFees}
• Description: ${country.description}

Would you like to proceed with the application?`, 'action', [
            { id: 'apply_visa', label: 'Apply Now', action: 'apply_visa', icon: <FileText className="w-4 h-4" /> },
            { id: 'enquiry_visa', label: 'Make Enquiry', action: 'enquiry_visa', icon: <Mail className="w-4 h-4" /> },
            { id: 'contact_support', label: 'Contact Support', action: 'contact', icon: <Phone className="w-4 h-4" /> }
          ]);
        }
        break;
      case 'apply_visa':
        navigate('/visa-services');
        addMessage(`Taking you to our Visa Services page to apply for ${selectedCountry?.name} visa. The form will be pre-filled with your selected country information.`, 'text');
        break;
      case 'enquiry_visa':
        navigate('/visa-services');
        addMessage(`Taking you to our Visa Services page to make an enquiry about ${selectedCountry?.name} visa. You can ask specific questions about the application process.`, 'text');
        break;
      default:
        addMessage('I\'m not sure how to help with that action. Please try asking me something else or use the menu options.', 'text');
    }
  };

  // Helper function to add messages
  const addMessage = (text: string, type: string = 'text', actions?: ActionButton[]) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isBot: true,
      timestamp: new Date(),
      type: type as any,
      actions
    };
    setMessages(prev => [...prev, message]);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsTyping(true);
    setIsLoading(true);
    setError(null);

    try {
      const aiResponse = await getAIResponse(currentMessage);

      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.text,
        isBot: true,
        timestamp: new Date(),
        type: aiResponse.type as any,
        actions: aiResponse.actions
      };
      
      setMessages(prev => [...prev, botResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I\'m experiencing technical difficulties. Please try again or contact our support team for immediate assistance.',
        isBot: true,
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
      setError('Failed to get AI response');
    } finally {
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleVoiceInput = () => {
    if (!recognitionRef.current) {
      toast({
        title: "Voice input not supported",
        description: "Your browser doesn't support speech recognition. Please type your message instead.",
        variant: "destructive"
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: 'Hi! I\'m your VisaCrony assistant. I can help you with forms, contact our team, navigate our website, and provide follow-up support. What would you like to do?',
        isBot: true,
        timestamp: new Date(),
        type: 'action',
        actions: [
          { id: 'forms', label: 'Help with Forms', action: 'forms', icon: <FileText className="w-4 h-4" /> },
          { id: 'contact', label: 'Contact Support', action: 'contact', icon: <Phone className="w-4 h-4" /> },
          { id: 'navigate', label: 'Browse Services', action: 'navigate', icon: <ExternalLink className="w-4 h-4" /> },
          { id: 'followup', label: 'Follow-up Support', action: 'followup', icon: <Calendar className="w-4 h-4" /> }
        ]
      },
    ]);
    setError(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChatToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleEscapeKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && isOpen) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-20 right-6 md:bottom-24 md:right-8 z-50">
        <Button
          onClick={handleChatToggle}
          className={cn(
            "w-16 h-16 md:w-18 md:h-18 rounded-full shadow-lg transition-all duration-300 hover:scale-105",
            "bg-secondary text-secondary-foreground hover:bg-secondary/90",
            "border-2 border-secondary/20 focus:ring-2 focus:ring-secondary/50",
            isOpen && "rotate-180"
          )}
          aria-label={isOpen ? "Close chat" : "Open chat"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-7 h-7 md:w-8 md:h-8" /> : <MessageCircle className="w-7 h-7 md:w-8 md:h-8" />}
        </Button>
      </div>

      {/* Chat Interface */}
      <div
        className={cn(
          "fixed bottom-24 right-6 md:bottom-28 md:right-8 w-80 md:w-96 h-80 md:h-96 bg-card rounded-lg shadow-2xl border transition-all duration-300 z-40",
          "transform origin-bottom-right flex flex-col",
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-2 pointer-events-none"
        )}
        role="dialog"
        aria-label="Chat with VisaCrony Assistant"
        aria-modal="true"
        onKeyDown={handleEscapeKey}
      >
        {/* Header */}
        <div className="bg-secondary text-secondary-foreground p-3 md:p-4 rounded-t-lg flex-shrink-0">
          <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary-foreground/10 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">VisaCrony Assistant</h3>
              <p className="text-xs opacity-80">Online now</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="h-8 w-8 p-0"
                aria-label="Chat settings"
              >
                <Settings className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="h-8 w-8 p-0"
                aria-label="Clear chat"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="bg-muted p-3 border-b flex-shrink-0">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Voice Input</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSettings(prev => ({ ...prev, voiceEnabled: !prev.voiceEnabled }))}
                  className="h-6 w-6 p-0"
                >
                  {settings.voiceEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Sound Notifications</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSettings(prev => ({ ...prev, soundEnabled: !prev.soundEnabled }))}
                  className="h-6 w-6 p-0"
                >
                  {settings.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-3 bg-background min-h-0 max-h-48 md:max-h-56">
          {messages.map((message) => (
            <div key={message.id} className="animate-fade-in">
            <div
              className={cn(
                  "flex gap-2",
                message.isBot ? "justify-start" : "justify-end"
              )}
            >
              {message.isBot && (
                <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3 h-3 text-secondary-foreground" />
                </div>
              )}
              <div
                className={cn(
                  "max-w-xs p-3 rounded-lg text-sm",
                  message.isBot
                      ? message.isError
                        ? "bg-destructive/10 text-destructive border border-destructive/20"
                        : "bg-muted text-muted-foreground rounded-bl-none"
                    : "bg-secondary text-secondary-foreground rounded-br-none ml-auto"
                )}
              >
                {message.text}
              </div>
              {!message.isBot && (
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-3 h-3 text-accent-foreground" />
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              {message.actions && message.actions.length > 0 && (
                <div className="mt-2 ml-8 space-y-2">
                  <div className="grid grid-cols-2 gap-1.5">
                    {message.actions.map((action) => (
                      <Button
                        key={action.id}
                        variant={action.variant || "outline"}
                        size="sm"
                        onClick={() => handleActionClick(action.action)}
                        className="text-xs h-7 justify-start gap-1.5 px-2"
                      >
                        {action.icon}
                        <span className="truncate">{action.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-2 justify-start animate-fade-in">
              <div className="w-6 h-6 bg-secondary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3 h-3 text-secondary-foreground" />
              </div>
              <div className="bg-muted text-muted-foreground p-3 rounded-lg rounded-bl-none">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-background rounded-b-lg flex-shrink-0">
          <div className="flex gap-2">
            {settings.voiceEnabled && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleVoiceInput}
                disabled={isLoading}
                className={cn(
                  "px-3",
                  isListening && "bg-red-500 text-white hover:bg-red-600"
                )}
                aria-label={isListening ? "Stop listening" : "Start voice input"}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </Button>
            )}
            <input
              ref={inputRef}
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-input text-foreground"
              disabled={isLoading}
              aria-label="Type your message"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-3"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
          {error && (
            <p className="text-xs text-destructive mt-2" role="alert">
              {error}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Chatbot;
