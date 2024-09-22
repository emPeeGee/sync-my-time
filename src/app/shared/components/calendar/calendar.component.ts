import { DatePipe, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

interface CalendarOptions {
  startOnMonday: boolean;
}

@Component({
  selector: 'smt-calendar',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
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

  constructor() {
    console.log('cons');
  }

  ngOnInit() {
    console.log('init');
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
        isToday: day.getDate() === this.today.getDate(),
      };
    });

    const daysRemainToFillRow = (emptyDays.length + monthDays.length) % 7;
    const lastEmptyDays =
      daysRemainToFillRow === 0
        ? []
        : Array.from({ length: 7 - daysRemainToFillRow }, (_, i) => {
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

  onMonthChangeClick(type: 'next' | 'prev') {
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
