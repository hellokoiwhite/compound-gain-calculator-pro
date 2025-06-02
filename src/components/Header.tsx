
import React from 'react';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
}

export function Header({ title, onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-gradient-to-r from-blue-600 to-indigo-700 backdrop-blur supports-[backdrop-filter]:bg-gradient-to-r supports-[backdrop-filter]:from-blue-600/95 supports-[backdrop-filter]:to-indigo-700/95">
      <div className="flex h-16 items-center px-4 max-w-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="mr-4 text-white hover:bg-white/20 hover:text-white"
        >
          <Menu className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold text-white truncate">{title}</h1>
      </div>
    </header>
  );
}
