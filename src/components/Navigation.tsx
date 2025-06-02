
import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Calculator, FileText, Lightbulb, Settings, Share } from 'lucide-react';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

const menuItems = [
  {
    id: 'calculator',
    label: 'Daily Compound Interest Calculator',
    icon: Calculator,
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
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="mt-6 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => handleNavigate(item.id)}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.label}
              </Button>
            );
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
