
import React from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Mail } from 'lucide-react';

interface OnboardingScreen2Props {
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingScreen2({ onNext, onSkip }: OnboardingScreen2Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 dark:from-gray-800 dark:via-purple-800 dark:to-pink-800 flex items-center justify-center p-6">
      <div className="text-center text-white max-w-md mx-auto">
        <div className="mb-8 flex justify-center space-x-4">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <FileText size={40} className="text-white" />
          </div>
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Mail size={40} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">
          Export & Share
        </h2>
        
        <p className="text-lg mb-8 text-pink-100 leading-relaxed">
          Download your calculations as PDF or send them directly to your email. Keep track of your financial progress!
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={onNext}
            className="w-full bg-white text-purple-600 hover:bg-purple-50 font-semibold py-3 px-8 rounded-xl"
          >
            Next
          </Button>
          
          <Button 
            onClick={onSkip}
            variant="ghost"
            className="w-full text-white hover:bg-white/10 font-medium"
          >
            Skip Tour
          </Button>
        </div>
      </div>
    </div>
  );
}
