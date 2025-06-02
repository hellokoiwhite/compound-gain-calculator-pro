
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileSpreadsheet } from 'lucide-react';
import { CalculationResult } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';

interface ResultsDisplayProps {
  results: CalculationResult[];
  initialCapital: number;
  reinvestmentRate: number;
  startDate: Date;
  onDownloadPDF: () => void;
  onDownloadCSV: () => void;
}

export function ResultsDisplay({ 
  results, 
  initialCapital, 
  reinvestmentRate, 
  startDate, 
  onDownloadPDF, 
  onDownloadCSV 
}: ResultsDisplayProps) {
  const finalAmount = results[results.length - 1]?.cumulativeAmount || 0;
  const totalWithdrawals = results.reduce((sum, result) => sum + result.withdrawal, 0);
  const totalNetProfit = (finalAmount - initialCapital) + totalWithdrawals;
  const endDate = results[results.length - 1]?.date || format(startDate, 'MM/dd/yyyy');
  const businessDays = results.length;

  return (
    <div className="container mx-auto p-6">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <Card className="shadow-xl dark:bg-gray-800 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Summary</CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            <div className="space-y-4 text-lg">
              <p>
                <span className="font-semibold">You started with an investment of:</span> ${initialCapital.toLocaleString()} on {format(startDate, 'MM/dd/yyyy')}
              </p>
              <p>
                <span className="font-semibold">Your principal amount grew to:</span> ${finalAmount.toLocaleString()} by {endDate}
              </p>
              <p>
                <span className="font-semibold">Your total cash withdrawals were:</span> ${totalWithdrawals.toLocaleString()} over the course of {businessDays} business days
              </p>
              <p>
                <span className="font-semibold">Your total NET profit for the {businessDays}-day period was:</span> ${totalNetProfit.toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Reinvestment rate used:</span> {reinvestmentRate}%
              </p>
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
                onClick={onDownloadCSV}
                variant="outline"
                className="flex-1"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                Download CSV
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
                    <TableHead>Withdrawal</TableHead>
                    <TableHead>Reinvested</TableHead>
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
                      <TableCell className="text-orange-600 dark:text-orange-400">
                        ${result.withdrawal.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-blue-600 dark:text-blue-400">
                        ${result.reinvested.toLocaleString()}
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
    </div>
  );
}
