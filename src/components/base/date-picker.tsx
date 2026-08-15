import * as React from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  isSameDay,
  isToday,
  getDay
} from "date-fns";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/base/button.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/base/popover.tsx";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
}

export function Calendar({ selected, onSelect, className }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(selected || new Date());

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <div className={cn("p-3 w-64 bg-white text-xs select-none", className)}>
      {/* Month & Nav Controls */}
      <div className="flex items-center justify-between pb-3">
        <button
          type="button"
          onClick={handlePrevMonth}
          className="h-7 w-7 flex items-center justify-center rounded-md border border-slate-200 hover:bg-slate-50 text-slate-655"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span className="font-bold text-slate-800">
          {format(currentMonth, "MMMM yyyy")}
        </span>
        <button
          type="button"
          onClick={handleNextMonth}
          className="h-7 w-7 flex items-center justify-center rounded-md border border-slate-200 hover:bg-slate-50 text-slate-655"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Weekday headers */}
      <div className="grid grid-cols-7 text-center font-bold text-slate-400 pb-2">
        {weekDays.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-y-1 text-center font-semibold">
        {days.map((day, idx) => {
          const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
          const isSel = selected ? isSameDay(day, selected) : false;
          const isTod = isToday(day);

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onSelect?.(day)}
              className={cn(
                "h-7 w-7 mx-auto flex items-center justify-center rounded-md transition-colors",
                !isCurrentMonth && "text-slate-300 pointer-events-none opacity-40",
                isCurrentMonth && "text-slate-700 hover:bg-slate-100",
                isTod && "border border-blue-500 font-extrabold text-blue-600",
                isSel && "bg-blue-600 text-white font-extrabold hover:bg-blue-755"
              )}
            >
              {day.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface DatePickerProps {
  value?: Date;
  onChange?: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({ value, onChange, placeholder = "Pick a date", className }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "flex items-center gap-1.5 border border-slate-200 bg-slate-50/50 hover:bg-white text-xs font-semibold text-slate-700 cursor-pointer h-8",
            className
          )}
        >
          <CalendarIcon className="h-3.5 w-3.5 text-slate-400" />
          <span>{value ? format(value, "PPP") : placeholder}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 bg-white border border-slate-200 shadow-md rounded-lg w-auto" align="start">
        <Calendar
          selected={value}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
