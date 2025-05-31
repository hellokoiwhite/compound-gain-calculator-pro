
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Mail } from 'lucide-react';
import { CalculationResult } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ResultsDisplayProps {
  results: CalculationResult[];
  initialCapital: number;
  onDownloadPDF: () => void;
  onSendEmail: () => void;
}

export function ResultsDisplay({ results, initialCapital, onDownloadPDF, onSendEmail }: ResultsDisplayProps) {
  const finalAmount = results[results.length - 1]?.cumulativeAmount || 0;
  const totalGain = finalAmount - initialCapital;
  const totalReturnPercent = ((totalGain / initialCapital) * 100);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      <Card className="shadow-xl dark:bg-gray-800 border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-2xl">Calculation Summary</CardTitle>
        </CardHeader>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-300">Initial Capital</h3>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${initialCapital.toLocaleString()}
              </p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300">Final Amount</h3>
              <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                ${finalAmount.toLocaleString()}
              </p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-800 dark:text-purple-300">Total Return</h3>
              <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {totalReturnPercent.toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <Button 
              onClick={onDownloadPDF}
              className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
            
            <Button 
              onClick={onSendEmail}
              variant="outline"
              className="flex-1"
            >
              <Mail className="w-4 h-4 mr-2" />
              Send via Email
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-xl dark:bg-gray-800 border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl">Daily Breakdown</CardTitle>
        </CardHeader>
        
        <CardContent>
          <ScrollArea className="h-96">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Day</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Daily Gain</TableHead>
                  <TableHead>Cumulative Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {results.map((result, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{result.day}</TableCell>
                    <TableCell>{result.date}</TableCell>
                    <TableCell className="text-green-600 dark:text-green-400">
                      ${result.dailyGain.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-semibold">
                      ${result.cumulativeAmount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
