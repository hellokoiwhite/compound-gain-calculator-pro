
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, TrendingUp, Calendar, Download } from 'lucide-react';

export function UsageTipsPage() {
  const tips = [
    {
      icon: TrendingUp,
      title: "Start Conservative",
      description: "Begin with realistic daily gain percentages (0.5% - 2%) rather than extreme values."
    },
    {
      icon: Calendar,
      title: "Consider Time Frames",
      description: "Use shorter time periods initially to understand the compound effect before projecting long-term."
    },
    {
      icon: Download,
      title: "Track Your Progress",
      description: "Download your calculations as PDF or CSV to compare with actual results over time."
    }
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-blue-500" />
            Usage Tips & Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {tips.map((tip, index) => {
              const Icon = tip.icon;
              return (
                <div key={index} className="flex gap-4 p-4 border rounded-lg">
                  <Icon className="h-8 w-8 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">{tip.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{tip.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="text-lg font-semibold">Understanding Reinvestment Rate</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The reinvestment rate determines what percentage of your daily gains are reinvested into your principal. 
              A 100% rate means all gains compound, while 0% means you withdraw all gains daily.
            </p>
            
            <h3 className="text-lg font-semibold">Weekend Exclusions</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Enable weekend exclusions for calculations that reflect business days only, which is common 
              in trading and business scenarios.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
