
import { CalculationResult } from '@/lib/types';
import { format } from 'date-fns';

export function generatePDF(results: CalculationResult[], initialCapital: number, reinvestmentRate: number, startDate: Date) {
  const finalAmount = results[results.length - 1]?.cumulativeAmount || 0;
  const totalWithdrawals = results.reduce((sum, result) => sum + result.withdrawal, 0);
  const totalNetProfit = (finalAmount - initialCapital) + totalWithdrawals;
  const endDate = results[results.length - 1]?.date || format(startDate, 'MM/dd/yyyy');
  const businessDays = results.length;
  
  // Create a simple HTML content for PDF generation
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Compound Interest Calculation</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { margin-bottom: 30px; line-height: 1.6; }
        .summary p { margin: 10px 0; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        .highlight { font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Compound Interest Calculation Report</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div class="summary">
        <h2>Summary</h2>
        <p><span class="highlight">You started with an investment of:</span> $${initialCapital.toLocaleString()} on ${format(startDate, 'MM/dd/yyyy')}</p>
        <p><span class="highlight">Your principal amount grew to:</span> $${finalAmount.toLocaleString()} by ${endDate}</p>
        <p><span class="highlight">Your total cash withdrawals were:</span> $${totalWithdrawals.toLocaleString()} over the course of ${businessDays} business days</p>
        <p><span class="highlight">Your total NET profit for the ${businessDays}-day period was:</span> $${totalNetProfit.toLocaleString()}</p>
        <p><span class="highlight">Reinvestment rate used:</span> ${reinvestmentRate}%</p>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Daily Gain</th>
            <th>Withdrawal</th>
            <th>Reinvested</th>
            <th>Cumulative Amount</th>
          </tr>
        </thead>
        <tbody>
          ${results.map(result => `
            <tr>
              <td>${result.day}</td>
              <td>${result.date}</td>
              <td>$${result.dailyGain.toLocaleString()}</td>
              <td>$${result.withdrawal.toLocaleString()}</td>
              <td>$${result.reinvested.toLocaleString()}</td>
              <td>$${result.cumulativeAmount.toLocaleString()}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;

  // Create a blob and download
  const blob = new Blob([htmlContent], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'compound-interest-calculation.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
