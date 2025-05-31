
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Calculator } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CalculationInput } from '@/lib/types';

interface CalculatorFormProps {
  onCalculate: (input: CalculationInput) => void;
}

export function CalculatorForm({ onCalculate }: CalculatorFormProps) {
  const [capital, setCapital] = useState<number>(1000);
  const [dailyGainPercent, setDailyGainPercent] = useState<number[]>([2]);
  const [dailyGainInput, setDailyGainInput] = useState<string>('2');
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [numberOfDays, setNumberOfDays] = useState<number>(30);
  const [excludeWeekends, setExcludeWeekends] = useState<boolean>(false);

  const handleSliderChange = (value: number[]) => {
    setDailyGainPercent(value);
    setDailyGainInput(value[0].toString());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDailyGainInput(value);
    
    const numValue = parseFloat(value);
    if (!isNaN(numValue) && numValue >= 0.1 && numValue <= 100) {
      setDailyGainPercent([numValue]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate({
      capital,
      dailyGainPercent: dailyGainPercent[0],
      startDate,
      numberOfDays,
      excludeWeekends,
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl dark:bg-gray-800 border-0 bg-white/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Calculator className="w-6 h-6" />
          Compound Interest Calculator
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="capital" className="text-lg font-semibold">Initial Capital ($)</Label>
            <Input
              id="capital"
              type="number"
              value={capital}
              onChange={(e) => setCapital(Number(e.target.value))}
              className="text-lg h-12"
              min="1"
              required
            />
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-semibold">Daily Gain Percentage</Label>
            
            <div className="flex items-center gap-4">
              <Input
                type="number"
                value={dailyGainInput}
                onChange={handleInputChange}
                className="w-24 h-10"
                min="0.1"
                max="100"
                step="0.1"
                placeholder="2.0"
              />
              <span className="text-sm text-gray-500">%</span>
            </div>
            
            <Slider
              value={dailyGainPercent}
              onValueChange={handleSliderChange}
              max={100}
              min={0.1}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>0.1%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-semibold">Start Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-12 justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => date && setStartDate(date)}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="days" className="text-lg font-semibold">Number of Days</Label>
            <Input
              id="days"
              type="number"
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(Number(e.target.value))}
              className="text-lg h-12"
              min="1"
              max="3650"
              required
            />
          </div>

          <div className="flex items-center space-x-3">
            <Checkbox
              id="weekends"
              checked={excludeWeekends}
              onCheckedChange={(checked) => setExcludeWeekends(!!checked)}
            />
            <Label htmlFor="weekends" className="text-lg font-medium cursor-pointer">
              Exclude Weekends
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200"
          >
            Calculate Returns
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
