
import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { OnboardingScreen1 } from '@/components/OnboardingScreen1';
import { OnboardingScreen2 } from '@/components/OnboardingScreen2';
import { OnboardingScreen3 } from '@/components/OnboardingScreen3';
import { CalculatorForm } from '@/components/CalculatorForm';
import { ResultsDisplay } from '@/components/ResultsDisplay';
import { DisclaimerPage } from '@/pages/DisclaimerPage';
import { UsageTipsPage } from '@/pages/UsageTipsPage';
import { SettingsPage } from '@/pages/SettingsPage';
import { calculateCompoundInterest } from '@/utils/calculationUtils';
import { generatePDF } from '@/utils/pdfUtils';
import { generateCSV } from '@/utils/csvUtils';
import { CalculationInput, CalculationResult } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

type Screen = 'welcome' | 'onboarding1' | 'onboarding2' | 'onboarding3' | 'calculator' | 'results' | 'disclaimer' | 'usage-tips' | 'settings';

const getPageTitle = (screen: Screen): string => {
  switch (screen) {
    case 'calculator':
    case 'results':
      return 'Daily Compound Interest Calculator';
    case 'disclaimer':
      return 'Disclaimer';
    case 'usage-tips':
      return 'Usage Tips';
    case 'settings':
      return 'Settings';
    default:
      return 'Daily Compound Interest Calculator';
  }
};

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
      generatePDF(results, lastInput.capital, lastInput.reinvestmentRate, lastInput.startDate);
      toast({
        title: "PDF Downloaded",
        description: "Your calculation report has been downloaded.",
      });
    }
  };

  const handleDownloadCSV = () => {
    if (results.length > 0 && lastInput) {
      generateCSV(results, lastInput.capital, lastInput.reinvestmentRate);
      toast({
        title: "CSV Downloaded",
        description: "Your calculation data has been downloaded.",
      });
    }
  };

  const handleBackToCalculator = () => {
    setCurrentScreen('calculator');
  };

  const handleNavigate = (page: string) => {
    setCurrentScreen(page as Screen);
  };

  const shouldShowHeaderAndMenu = !['welcome', 'onboarding1', 'onboarding2', 'onboarding3'].includes(currentScreen);

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
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <CalculatorForm onCalculate={handleCalculate} />
          </div>
        );
      case 'results':
        return (
          <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <ResultsDisplay
              results={results}
              initialCapital={lastInput?.capital || 0}
              reinvestmentRate={lastInput?.reinvestmentRate || 50}
              startDate={lastInput?.startDate || new Date()}
              onDownloadPDF={handleDownloadPDF}
              onDownloadCSV={handleDownloadCSV}
            />
          </div>
        );
      case 'disclaimer':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <DisclaimerPage />
          </div>
        );
      case 'usage-tips':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <UsageTipsPage />
          </div>
        );
      case 'settings':
        return (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <SettingsPage />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen w-full max-w-full overflow-x-hidden">
        {shouldShowHeaderAndMenu && (
          <>
            <Header 
              title={getPageTitle(currentScreen)} 
              onMenuClick={() => setIsMenuOpen(true)} 
            />
            <Navigation
              isOpen={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              currentPage={currentScreen}
              onNavigate={handleNavigate}
            />
          </>
        )}
        <div className="w-full">
          {renderScreen()}
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Index;
