
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Home, FileText, Lightbulb, Settings, Share } from 'lucide-react';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  {
    id: 'calculator',
    label: 'Home',
    icon: Home,
  },
  {
    id: 'disclaimer',
    label: 'Disclaimer',
    icon: FileText,
  },
  {
    id: 'usage-tips',
    label: 'Usage Tips',
    icon: Lightbulb,
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
  },
  {
    id: 'share',
    label: 'Share App',
    icon: Share,
  },
];

export function Navigation({ isOpen, onClose, currentPage, onNavigate }: NavigationProps) {
  const handleNavigate = (page: string) => {
    if (page === 'share') {
      handleShare();
    } else {
      onNavigate(page);
    }
    onClose();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Daily Compound Interest Calculator',
        text: 'Check out this amazing compound interest calculator!',
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('App URL copied to clipboard!');
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-[70vw] max-w-sm bg-gradient-to-b from-slate-800 to-slate-900 border-slate-700">
        <SheetHeader className="border-b border-slate-700 pb-4">
          <SheetTitle className="text-white text-left">Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={`w-full justify-start text-left py-4 px-4 min-h-[60px] ${
                  isActive 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "text-slate-300 hover:bg-slate-700 hover:text-white"
                }`}
                onClick={() => handleNavigate(item.id)}
              >
                <div className="flex items-center w-full">
                  <Icon className="mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="text-sm leading-relaxed flex-1 break-words">{item.label}</span>
                </div>
              </Button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
