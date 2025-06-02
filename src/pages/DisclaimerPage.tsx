
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export function DisclaimerPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
            Important Disclaimer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Investment Risk Warning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              This calculator is for educational and illustrative purposes only. The results shown are theoretical 
              projections based on the inputs provided and do not guarantee actual investment returns.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">No Financial Advice</h3>
            <p className="text-gray-600 dark:text-gray-300">
              This tool does not constitute financial, investment, or professional advice. Always consult with 
              qualified financial advisors before making investment decisions.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Market Volatility</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Real market conditions involve volatility, fees, taxes, and other factors that are not accounted 
              for in this simplified calculation. Actual results may vary significantly.
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold">Use at Your Own Risk</h3>
            <p className="text-gray-600 dark:text-gray-300">
              The developers of this application are not responsible for any financial losses or decisions 
              made based on the calculations provided by this tool.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
