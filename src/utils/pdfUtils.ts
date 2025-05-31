
import { CalculationResult } from '@/lib/types';

export function generatePDF(results: CalculationResult[], initialCapital: number) {
  const finalAmount = results[results.length - 1]?.cumulativeAmount || 0;
  const totalGain = finalAmount - initialCapital;
  
  // Create a simple HTML content for PDF generation
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Compound Interest Calculation</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .summary { margin-bottom: 30px; }
        .summary-item { display: inline-block; margin: 10px 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Compound Interest Calculation Report</h1>
        <p>Generated on ${new Date().toLocaleDateString()}</p>
      </div>
      
      <div class="summary">
        <div class="summary-item">
          <strong>Initial Capital:</strong> $${initialCapital.toLocaleString()}
        </div>
        <div class="summary-item">
          <strong>Final Amount:</strong> $${finalAmount.toLocaleString()}
        </div>
        <div class="summary-item">
          <strong>Total Gain:</strong> $${totalGain.toLocaleString()}
        </div>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>Daily Gain</th>
            <th>Cumulative Amount</th>
          </tr>
        </thead>
        <tbody>
          ${results.map(result => `
            <tr>
              <td>${result.day}</td>
              <td>${result.date}</td>
              <td>$${result.dailyGain.toLocaleString()}</td>
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

export function sendEmailWithResults(results: CalculationResult[], initialCapital: number, email: string) {
  const finalAmount = results[results.length - 1]?.cumulativeAmount || 0;
  const totalGain = finalAmount - initialCapital;
  
  const subject = encodeURIComponent('Compound Interest Calculation Results');
  const body = encodeURIComponent(`
Dear User,

Here are your compound interest calculation results:

Initial Capital: $${initialCapital.toLocaleString()}
Final Amount: $${finalAmount.toLocaleString()}
Total Gain: $${totalGain.toLocaleString()}
Number of Days: ${results.length}

Best regards,
Compound Calculator Pro
  `);
  
  window.open(`mailto:${email}?subject=${subject}&body=${body}`);
}
