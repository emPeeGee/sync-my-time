import { DatePipe, NgClass } from '@angular/common';
import { Component, Input, OnInit, signal } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MenuItem } from '../../../core/models/menu.model';

interface CalendarOptions {
  startOnMonday: boolean;
}

const TOTAL_CELLS = 42;

@Component({
  selector: 'smt-calendar',
  standalone: true,
  imports: [DatePipe, NgClass, MenuComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  // NOTE: detect when options changes
  // TODO: try input() as signal
  private _options: CalendarOptions = { startOnMonday: true };
  @Input() set options(value: CalendarOptions) {
    this._options = value;
    this.daysOfTheWeek = getWeekDays(this._options.startOnMonday, 'en-US');
  }

  today = new Date();
  currentMonth = this.today;
  daysOfTheWeek = getWeekDays(this._options.startOnMonday, 'en-US');

  readonly VIEW_OPTIONS: MenuItem[] = [
    { id: 'day', label: 'Day view' },
    { id: 'work-day', label: 'Work day view' },
    { id: 'week', label: 'Week view' },
    { id: 'month', label: 'Month view' },
    { id: 'year', label: 'Year view' },
  ];
  viewMode = signal(this.VIEW_OPTIONS[0]);

  selectedDate: Date = new Date(); // Set the date you want to display
  hours: string[] = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Hours 00:00 to 23:00
  selectedRange: any = null;
  // selectedRange: { startHour: string; endHour?: string } = null;
  isDragging = false;

  onMouseDown(hour: string) {
    this.isDragging = true;
    this.selectedRange = { startHour: hour };
  }

  onMouseMove(hour: string) {
    if (this.isDragging) {
      this.selectedRange = { ...this.selectedRange, endHour: hour };
    }
  }

  onMouseUp(hour: string) {
    this.isDragging = false;
    this.selectedRange = { ...this.selectedRange, endHour: hour };
    console.log('Selected Range:', this.selectedRange);
  }

  isSelected(hour: string): boolean {
    if (!this.selectedRange) return false;

    const { startHour, endHour } = this.selectedRange;
    if (!endHour) return hour === startHour;

    return this.isWithinRange(hour);
  }

  isWithinRange(hour: string): boolean {
    const startIndex = this.hours.indexOf(this.selectedRange.startHour);
    const endIndex = this.hours.indexOf(this.selectedRange.endHour);
    const currentIndex = this.hours.indexOf(hour);

    return (
      (currentIndex >= startIndex && currentIndex <= endIndex) ||
      (currentIndex <= startIndex && currentIndex >= endIndex)
    );
  }

  getDaysInCurrentMonth() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const currentDate = new Date(year, month + 1, 0);
    const daysInMonth = currentDate.getDate();

    const firstDayOfTheMonth = new Date(currentDate);
    firstDayOfTheMonth.setDate(1);

    const daysLeftInWeekTillNewMonthBegin = getDayIndexMondaySunday(
      firstDayOfTheMonth,
      this._options.startOnMonday
    );
    const emptyDays = Array.from({ length: daysLeftInWeekTillNewMonthBegin }, (_, i) => {
      const day = new Date(year, month, -(daysLeftInWeekTillNewMonthBegin - (i + 1)));
      return {
        day: day.getDate(),
        date: day,
        name: '',
        isCurrentMonth: false,
        isToday: false,
      };
    });

    const monthDays = Array.from({ length: daysInMonth }, (_, i) => {
      const day = new Date(year, month, i + 1);
      return {
        day: day.getDate(),
        date: day,
        name: getDayName(day),
        isCurrentMonth: true,
        isToday: isSameDay(day, this.today),
      };
    });

    const daysRemainToFillRow = TOTAL_CELLS - (emptyDays.length + monthDays.length);
    const lastEmptyDays =
      daysRemainToFillRow === 0
        ? []
        : Array.from({ length: daysRemainToFillRow }, (_, i) => {
            return {
              day: new Date(year, month + 1, i + 1).getDate(),
              date: new Date(year, month + 1, i + 1),
              name: null,
              isCurrentMonth: false,
              isToday: false,
            };
          });

    return [...emptyDays, ...monthDays, ...lastEmptyDays];
  }

  onMonthChangeClick(type: 'next' | 'prev' | 'today') {
    if (type === 'today') {
      this.currentMonth = new Date(
        this.today.getFullYear(),
        this.today.getMonth(),
        this.today.getDate()
      );
      return;
    }
    this.currentMonth = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth() + (type === 'next' ? 1 : -1),
      this.currentMonth.getDate()
    );
  }
}

const getDayIndexMondaySunday = (date: Date, startOnMonday: boolean) =>
  startOnMonday ? (date.getDay() === 0 ? 6 : date.getDay() - 1) : date.getDay();
// const getDayIndexMondaySunday = (date: Date, startOnMonday: boolean) => date.getDay();

function getDayName(day: Date, locale = 'en-US'): string {
  return day.toLocaleDateString(locale, { weekday: 'long' });
}

export function getWeekDays(startOnMonday = true, locale = 'en-US'): string[] {
  const weekDays: string[] = [];
  const baseDate = new Date();

  for (let i = 0; i < 7; i++) {
    const dayOffset = (startOnMonday ? 1 : 0) + i;
    // If today is Wednesday, 14th, baseDate.getDay() will return 3 (Wednesday), so baseDate.getDate() - baseDate.getDay() will result in 14 - 3 = 11.
    // That gives the Sunday of the current week (the 11th).  + dayOffset
    const currentDay = new Date(
      baseDate.setDate(baseDate.getDate() - baseDate.getDay() + dayOffset)
    );

    const dayName = currentDay.toLocaleDateString(locale, { weekday: 'long' });
    weekDays.push(dayName);
  }

  return weekDays;
}
export function isSameDay(date1: Date, date2: Date) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
}
