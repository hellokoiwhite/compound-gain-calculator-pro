
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, FileSpreadsheet } from 'lucide-react';
import { CalculationResult } from '@/lib/types';
import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

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
  const totalReinvested = results.reduce((sum, result) => sum + result.reinvested, 0);
  const totalNetProfit = (finalAmount - initialCapital) + totalWithdrawals;
  const endDate = results[results.length - 1]?.date || format(startDate, 'MM/dd/yyyy');
  const businessDays = results.length;
  const totalReturn = ((totalNetProfit / initialCapital) * 100);

  // Pie chart data
  const pieData = [
    {
      name: 'Initial Capital',
      value: initialCapital,
      color: '#ef4444', // red
    },
    {
      name: 'Total Reinvested',
      value: totalReinvested,
      color: '#3b82f6', // blue
    },
    {
      name: 'Total Withdrawals',
      value: totalWithdrawals,
      color: '#22c55e', // green
    },
  ];

  const chartConfig = {
    initialCapital: {
      label: "Initial Capital",
      color: "#ef4444",
    },
    totalReinvested: {
      label: "Total Reinvested", 
      color: "#3b82f6",
    },
    totalWithdrawals: {
      label: "Total Withdrawals",
      color: "#22c55e",
    },
  };

  return (
    <div className="container mx-auto p-6">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Enhanced Summary Card with gradient header */}
        <Card className="shadow-xl dark:bg-gray-800 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl">Calculation Summary</CardTitle>
          </CardHeader>
          
          <CardContent className="p-6">
            {/* Summary Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Initial Capital</div>
                <div className="text-2xl font-bold text-red-600">${initialCapital.toLocaleString()}</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Final Amount</div>
                <div className="text-2xl font-bold text-blue-600">${finalAmount.toLocaleString()}</div>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Return</div>
                <div className="text-2xl font-bold text-purple-600">{totalReturn.toFixed(2)}%</div>
              </div>
            </div>

            <div className="space-y-4 text-lg">
              <p>
                <span className="font-semibold">You started with an investment of:</span> <span className="text-red-600 font-bold">${initialCapital.toLocaleString()}</span> on {format(startDate, 'MM/dd/yyyy')}
              </p>
              <p>
                <span className="font-semibold">Your principal amount grew to:</span> <span className="text-blue-600 font-bold">${finalAmount.toLocaleString()}</span> by {endDate}
              </p>
              <p>
                <span className="font-semibold">Your total cash withdrawals were:</span> <span className="text-green-600 font-bold">${totalWithdrawals.toLocaleString()}</span> over the course of {businessDays} business days
              </p>
              <p>
                <span className="font-semibold">Your total NET profit for the {businessDays}-day period was:</span> <span className="text-green-600 font-bold">${totalNetProfit.toLocaleString()}</span>
              </p>
              <p>
                <span className="font-semibold">Reinvestment rate used:</span> <span className="text-blue-600 font-bold">{reinvestmentRate}%</span>
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

        {/* Daily Breakdown with optimized height */}
        <Card className="shadow-xl dark:bg-gray-800 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Daily Breakdown</CardTitle>
          </CardHeader>
          
          <CardContent>
            <ScrollArea className="h-64">
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

        {/* Pie Chart */}
        <Card className="shadow-xl dark:bg-gray-800 border-0 bg-white/90 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl">Investment Breakdown</CardTitle>
          </CardHeader>
          
          <CardContent className="flex flex-col items-center p-8">
            <div className="w-full max-w-xs mx-auto">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[250px] w-full"
              >
                <PieChart width={250} height={250}>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    innerRadius={35}
                    strokeWidth={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-sm">Initial Capital</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Reinvested</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm">Withdrawals</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
