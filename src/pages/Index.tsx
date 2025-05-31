import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { ThemeToggle } from '@/components/ThemeToggle';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { OnboardingScreen1 } from '@/components/OnboardingScreen1';
import { OnboardingScreen2 } from '@/components/OnboardingScreen2';
import { OnboardingScreen3 } from '@/components/OnboardingScreen3';
import { CalculatorForm } from '@/components/CalculatorForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { calculateCompoundInterest } from '@/utils/calculationUtils';
import { generatePDF, sendEmailWithResults } from '@/utils/pdfUtils';
import { CalculationInput, CalculationResult } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

type Screen = 'welcome' | 'onboarding1' | 'onboarding2' | 'onboarding3' | 'calculator' | 'results';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [lastInput, setLastInput] = useState<CalculationInput | null>(null);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (hasSeenOnboarding) {
      setCurrentScreen('calculator');
    }
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setCurrentScreen('calculator');
  };

  const handleSkipOnboarding = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setCurrentScreen('calculator');
  };

  const handleCalculate = (input: CalculationInput) => {
    try {
      const calculationResults = calculateCompoundInterest(input);
      setResults(calculationResults);
      setLastInput(input);
      setCurrentScreen('results');
      toast({
        title: "Calculation Complete",
        description: `Generated ${calculationResults.length} days of compound interest data.`,
      });
    } catch (error) {
      toast({
        title: "Calculation Error",
        description: "Please check your inputs and try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadPDF = () => {
    if (results.length > 0 && lastInput) {
      generatePDF(results, lastInput.capital);
      toast({
        title: "PDF Downloaded",
        description: "Your calculation report has been downloaded.",
      });
    }
  };

  const handleSendEmail = (email: string) => {
    if (results.length > 0 && lastInput) {
      sendEmailWithResults(results, lastInput.capital, email);
      toast({
        title: "Email Client Opened",
        description: `Email prepared and sent to ${email}`,
      });
    }
  };

  const handleBackToCalculator = () => {
    setCurrentScreen('calculator');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen onNext={() => setCurrentScreen('onboarding1')} />;
      case 'onboarding1':
        return (
          <OnboardingScreen1 
            onNext={() => setCurrentScreen('onboarding2')}
            onSkip={handleSkipOnboarding}
          />
        );
      case 'onboarding2':
        return (
          <OnboardingScreen2 
            onNext={() => setCurrentScreen('onboarding3')}
            onSkip={handleSkipOnboarding}
          />
        );
      case 'onboarding3':
        return <OnboardingScreen3 onComplete={handleOnboardingComplete} />;
      case 'calculator':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 flex items-center justify-center">
            <div className="w-full">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                  Compound Calculator Pro
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Calculate your daily compound interest with precision
                </p>
              </div>
              <CalculatorForm onCalculate={handleCalculate} />
            </div>
          </div>
        );
      case 'results':
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Your Calculation Results
              </h1>
              <button 
                onClick={handleBackToCalculator}
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline"
              >
                ← Back to Calculator
              </button>
            </div>
            <ResultsDisplay
              results={results}
              initialCapital={lastInput?.capital || 0}
              onDownloadPDF={handleDownloadPDF}
              onSendEmail={handleSendEmail}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="relative">
        <ThemeToggle />
        {renderScreen()}
      </div>
    </ThemeProvider>
  );
};

export default Index;
