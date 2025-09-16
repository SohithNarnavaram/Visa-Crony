import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m here to help you with your visa and passport needs. How can I assist you today?',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getResponseMessage = (userMessage: string): string => {
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getResponseMessage(inputMessage),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover-scale",
            "bg-secondary text-secondary-foreground hover:bg-secondary/90",
            "border-2 border-secondary/20",
            isOpen && "rotate-180"
          )}
          aria-label="Open chat"
        >
          {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </Button>
      </div>

      {/* Chat Interface */}
      <div
        className={cn(
          "fixed bottom-24 right-6 w-80 h-96 bg-card rounded-lg shadow-2xl border transition-all duration-300 z-40",
          "transform origin-bottom-right",
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-2 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="bg-secondary text-secondary-foreground p-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-secondary-foreground/10 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">VisaCrony Assistant</h3>
              <p className="text-xs opacity-80">Online now</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 h-64 overflow-y-auto space-y-3 bg-background">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-2 animate-fade-in",
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
                    ? "bg-muted text-muted-foreground rounded-bl-none"
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
        <div className="p-3 border-t bg-background rounded-b-lg">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-secondary/50 bg-input text-foreground"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 px-3"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;