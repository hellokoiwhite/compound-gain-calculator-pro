
import React from 'react';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

interface OnboardingScreen3Props {
  onComplete: () => void;
}

export function OnboardingScreen3({ onComplete }: OnboardingScreen3Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 dark:from-gray-900 dark:via-indigo-900 dark:to-blue-900 flex items-center justify-center p-6">
      <div className="text-center text-white max-w-md mx-auto">
        <div className="mb-8 flex justify-center space-x-4">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Sun size={40} className="text-white" />
          </div>
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Moon size={40} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">
          Personalized Experience
        </h2>
        
        <p className="text-lg mb-8 text-blue-100 leading-relaxed">
          Choose between light and dark themes for comfortable viewing. Your perfect financial companion, day or night!
        </p>
        
        <Button 
          onClick={onComplete}
          className="w-full bg-white text-indigo-600 hover:bg-indigo-50 font-semibold py-3 px-8 rounded-xl transform hover:scale-105 transition-all duration-200"
        >
          Start Calculating
        </Button>
      </div>
    </div>
  );
}
