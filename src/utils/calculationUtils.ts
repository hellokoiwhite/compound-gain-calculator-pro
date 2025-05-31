
import { addDays, format, isWeekend } from 'date-fns';
import { CalculationInput, CalculationResult } from '@/lib/types';

export function calculateCompoundInterest(input: CalculationInput): CalculationResult[] {
  const { capital, dailyGainPercent, startDate, numberOfDays, excludeWeekends } = input;
  const results: CalculationResult[] = [];
  
  let currentAmount = capital;
  let currentDate = startDate;
  let actualDays = 0;
  let dayCounter = 0;

  while (actualDays < numberOfDays) {
    // Skip weekends if option is enabled
    if (excludeWeekends && isWeekend(currentDate)) {
      currentDate = addDays(currentDate, 1);
      continue;
    }

    const dailyGain = currentAmount * (dailyGainPercent / 100);
    currentAmount += dailyGain;
    actualDays++;
    dayCounter++;

    results.push({
      date: format(currentDate, 'yyyy-MM-dd'),
      day: dayCounter,
      dailyGain: dailyGain,
      cumulativeAmount: currentAmount,
    });

    currentDate = addDays(currentDate, 1);
  }

  return results;
}
