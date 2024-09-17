import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'smt-calendar',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  today = new Date();
  currentMonth = this.today;
  daysOfTheWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

    const daysLeftInWeekTillNewMonthBegin = getDayIndexMondaySunday(firstDayOfTheMonth);
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

    console.log(lastEmptyDays);

    return [...emptyDays, ...monthDays, ...lastEmptyDays];
  }
}

const getDayIndexMondaySunday = (date: Date) => (date.getDay() === 0 ? 6 : date.getDay() - 1);

function getDayName(day: Date, locale = 'en-US'): string {
  return day.toLocaleDateString(locale, { weekday: 'long' });
}
