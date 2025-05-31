
import React from 'react';
import { Button } from '@/components/ui/button';
import { TrendingUp } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
}

export function WelcomeScreen({ onNext }: WelcomeScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 dark:from-gray-900 dark:via-blue-900 dark:to-indigo-900 flex items-center justify-center p-6">
      <div className="text-center text-white max-w-md mx-auto">
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <TrendingUp size={48} className="text-white" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
          Compound Calculator Pro
        </h1>
        
        <p className="text-lg mb-8 text-blue-100 leading-relaxed">
          Track your daily compound interest gains with precision and style
        </p>
        
        <Button 
          onClick={onNext}
          className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
