
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label className="text-lg font-semibold">Theme Preference</Label>
            <div className="flex items-center gap-4">
              <Button
                variant={theme === 'light' ? 'default' : 'outline'}
                onClick={theme === 'dark' ? toggleTheme : undefined}
                className="flex items-center gap-2"
              >
                <Sun className="h-4 w-4" />
                Light Mode
              </Button>
              <Button
                variant={theme === 'dark' ? 'default' : 'outline'}
                onClick={theme === 'light' ? toggleTheme : undefined}
                className="flex items-center gap-2"
              >
                <Moon className="h-4 w-4" />
                Dark Mode
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-lg font-semibold">About</Label>
            <p className="text-gray-600 dark:text-gray-300">
              Daily Compound Interest Calculator v1.0
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Built for educational and planning purposes. Always consult financial advisors for investment decisions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
