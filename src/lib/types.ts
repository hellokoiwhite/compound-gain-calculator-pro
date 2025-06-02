
export interface CalculationInput {
  capital: number;
  dailyGainPercent: number;
  startDate: Date;
  numberOfDays: number;
  excludeWeekends: boolean;
  reinvestmentRate: number;
}

export interface CalculationResult {
  date: string;
  day: number;
  dailyGain: number;
  withdrawal: number;
  reinvested: number;
  cumulativeAmount: number;
}
