import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { MenuItem } from '../../../core/models/menu.model';
import { DebounceMousemoveDirective } from '../../directives/debounce-mousemove.directive';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';
import { CalendarWeekComponent } from '../calendar-week/calendar-week.component';

interface CalendarOptions {
  startOnMonday: boolean;
}

const TOTAL_CELLS = 42;

type ViewMode = 'day' | 'week' | 'month' | 'year';

@Component({
  selector: 'smt-calendar',
  standalone: true,
  imports: [
    DatePipe,
    NgClass,
    MenuComponent,
    DebounceMousemoveDirective,
    CalendarDayComponent,
    CalendarWeekComponent,
  ],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent {
  // NOTE: detect when options changes
  // TODO: try input() as signal
  private _options: CalendarOptions = { startOnMonday: true };
  @Input() set options(value: CalendarOptions) {
    this._options = value;
    this.daysOfTheWeek = getWeekDays(this._options.startOnMonday);
  }

  // TODO: To calendar service and replace in other places
  today = new Date();
  currentMonth = new Date();
  daysOfTheWeek = getWeekDays(this._options.startOnMonday);

  readonly VIEW_OPTIONS: MenuItem<ViewMode>[] = [
    { id: 'day', label: 'Day view' },
    { id: 'week', label: 'Week view' },
    { id: 'month', label: 'Month view' },
    { id: 'year', label: 'Year view' },
  ];

  viewMode = signal(this.VIEW_OPTIONS[1]);

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
      this.currentMonth = new Date(this.today.getTime());
      return;
    }

    switch (this.viewMode().id) {
      case 'day':
        this.currentMonth = new Date(
          this.currentMonth.getFullYear(),
          this.currentMonth.getMonth(),
          this.currentMonth.getDate() + (type === 'next' ? 1 : -1)
        );
        break;
      case 'week':
        break;

      case 'month':
        this.currentMonth = new Date(
          this.currentMonth.getFullYear(),
          this.currentMonth.getMonth() + (type === 'next' ? 1 : -1),
          this.currentMonth.getDate()
        );
        break;
      case 'year':
    }
  }
}

const getDayIndexMondaySunday = (date: Date, startOnMonday: boolean) =>
  startOnMonday ? (date.getDay() === 0 ? 6 : date.getDay() - 1) : date.getDay();
// const getDayIndexMondaySunday = (date: Date, startOnMonday: boolean) => date.getDay();

function getDayName(day: Date, locale = 'en-US'): string {
  return day.toLocaleDateString(locale, { weekday: 'long' });
}

export function getWeekDays(startOnMonday = true): Date[] {
  const weekDays: Date[] = [];
  const baseDate = new Date();

  for (let i = 0; i < 7; i++) {
    const dayOffset = (startOnMonday ? 1 : 0) + i;
    // If today is Wednesday, 14th, baseDate.getDay() will return 3 (Wednesday), so baseDate.getDate() - baseDate.getDay() will result in 14 - 3 = 11.
    // That gives the Sunday of the current week (the 11th).  + dayOffset
    const currentDay = new Date(
      baseDate.setDate(baseDate.getDate() - baseDate.getDay() + dayOffset)
    );

    weekDays.push(currentDay);
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
