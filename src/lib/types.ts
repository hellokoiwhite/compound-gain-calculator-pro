
export interface CalculationResult {
  date: string;
  day: number;
  dailyGain: number;
  cumulativeAmount: number;
}

export interface CalculationInput {
  capital: number;
  dailyGainPercent: number;
  startDate: Date;
  numberOfDays: number;
  excludeWeekends: boolean;
}
