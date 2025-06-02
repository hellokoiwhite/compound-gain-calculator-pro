
import { CalculationResult } from '@/lib/types';

export function generateCSV(results: CalculationResult[], initialCapital: number, reinvestmentRate: number) {
  const finalAmount = results[results.length - 1]?.cumulativeAmount || 0;
  const totalWithdrawals = results.reduce((sum, result) => sum + result.withdrawal, 0);
  const totalNetProfit = (finalAmount - initialCapital) + totalWithdrawals;
  
  // Create CSV header
  const headers = ['Day', 'Date', 'Daily Gain', 'Withdrawal', 'Reinvested', 'Cumulative Amount'];
  
  // Create CSV rows
  const rows = results.map(result => [
    result.day,
    result.date,
    result.dailyGain.toFixed(2),
    result.withdrawal.toFixed(2),
    result.reinvested.toFixed(2),
    result.cumulativeAmount.toFixed(2)
  ]);
  
  // Add summary at the end
  rows.push([]);
  rows.push(['Summary']);
  rows.push(['Initial Capital', initialCapital.toFixed(2)]);
  rows.push(['Final Amount', finalAmount.toFixed(2)]);
  rows.push(['Total Withdrawals', totalWithdrawals.toFixed(2)]);
  rows.push(['Total Net Profit', totalNetProfit.toFixed(2)]);
  rows.push(['Reinvestment Rate', `${reinvestmentRate}%`]);
  
  // Convert to CSV format
  const csvContent = [headers, ...rows]
    .map(row => row.map(cell => `"${cell}"`).join(','))
    .join('\n');
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'compound-interest-calculation.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
