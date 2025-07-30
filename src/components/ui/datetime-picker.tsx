'use client';

import { format } from 'date-fns';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface DateTimePickerProps {
  date?: Date;
  onDateTimeChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  min?: string; // For minimum date/time validation
}

export function DateTimePicker({
  date,
  onDateTimeChange,
  placeholder = 'Pick a date and time',
  disabled = false,
  className,
  error = false,
  min,
}: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    date
  );
  const [timeValue, setTimeValue] = React.useState<string>(() => {
    if (date) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    return '';
  });

  // Update internal state when external date changes
  React.useEffect(() => {
    setSelectedDate(date);
    if (date) {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      setTimeValue(`${hours}:${minutes}`);
    } else {
      setTimeValue('');
    }
  }, [date]);

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      // If we have a time value, apply it to the new date
      if (timeValue) {
        const [hours, minutes] = timeValue.split(':').map(Number);
        newDate.setHours(hours, minutes, 0, 0);
      }
      setSelectedDate(newDate);
      onDateTimeChange?.(newDate);
    } else {
      setSelectedDate(undefined);
      onDateTimeChange?.(undefined);
    }
  };

  const handleTimeChange = (newTime: string) => {
    setTimeValue(newTime);

    if (selectedDate && newTime) {
      const [hours, minutes] = newTime.split(':').map(Number);
      const newDateTime = new Date(selectedDate);
      newDateTime.setHours(hours, minutes, 0, 0);
      onDateTimeChange?.(newDateTime);
    }
  };

  const formatDateTime = (date: Date) => {
    return format(date, "PPP 'at' p");
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !selectedDate && 'text-muted-foreground',
            error && 'border-destructive',
            className
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? (
            formatDateTime(selectedDate)
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="p-3 space-y-3">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateSelect}
            disabled={(date) => {
              if (min) {
                const minDate = new Date(min);
                return date < minDate;
              }
              return false;
            }}
          />
          <div className="flex flex-col gap-2 border-t pt-3">
            <Label
              htmlFor="time-input"
              className="text-sm font-medium text-primary flex items-center gap-2"
            >
              <ClockIcon className="h-4 w-4" />
              Time
            </Label>
            <Input
              id="time-input"
              type="time"
              step="1"
              value={timeValue}
              defaultValue="10:30:00"
              onChange={(e) => handleTimeChange(e.target.value)}
              className="mt-1 text-center appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
