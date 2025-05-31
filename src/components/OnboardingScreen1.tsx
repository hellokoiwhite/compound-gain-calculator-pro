
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp } from 'lucide-react';

interface OnboardingScreen1Props {
  onNext: () => void;
  onSkip: () => void;
}

export function OnboardingScreen1({ onNext, onSkip }: OnboardingScreen1Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 dark:from-gray-800 dark:via-green-800 dark:to-blue-800 flex items-center justify-center p-6">
      <div className="text-center text-white max-w-md mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <Calculator size={64} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold mb-4">
          Powerful Calculations
        </h2>
        
        <p className="text-lg mb-8 text-green-100 leading-relaxed">
          Calculate compound interest with daily precision. Input your capital, daily gain percentage, and watch your money grow!
        </p>
        
        <div className="space-y-4">
          <Button 
            onClick={onNext}
            className="w-full bg-white text-green-600 hover:bg-green-50 font-semibold py-3 px-8 rounded-xl"
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
