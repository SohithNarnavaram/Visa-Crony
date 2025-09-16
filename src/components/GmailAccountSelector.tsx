import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Mail, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react';

interface GmailAccountSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  recipientEmail: string;
}

const GmailAccountSelector: React.FC<GmailAccountSelectorProps> = ({
  isOpen,
  onClose,
  onProceed,
  recipientEmail
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5 text-blue-600" />
            Email Submission Process
          </DialogTitle>
          <DialogDescription className="text-left">
            Follow these steps to send your enquiry via email.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Step-by-step process */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <div className="flex-1">
                <p className="font-medium text-blue-900">Select Google Account</p>
                <p className="text-sm text-blue-700">Choose your preferred Gmail account from Google's account selection page</p>
              </div>
              <ArrowRight className="w-4 h-4 text-blue-600" />
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <div className="flex-1">
                <p className="font-medium text-green-900">Gmail Compose Ready</p>
                <p className="text-sm text-green-700">Gmail compose window opens immediately with your enquiry details pre-filled and ready to send</p>
              </div>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
            <p className="text-sm text-gray-700">
              <span className="font-medium">Email will be sent to:</span> {recipientEmail}
            </p>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Note:</span> Make sure to click the "Send" button in Gmail to actually send your enquiry.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onProceed} className="bg-blue-600 hover:bg-blue-700">
            <Mail className="w-4 h-4 mr-2" />
            Start Email Process
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GmailAccountSelector;
