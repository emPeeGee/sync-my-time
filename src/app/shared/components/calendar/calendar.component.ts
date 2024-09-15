import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'smt-calendar',
  standalone: true,
  imports: [],
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
    // const nextMonth = this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth() + 1;
    const currentDate = new Date(year, month, 0);

    // return [
    //   ...Array(nextM.getDate()).map(i => ({
    //     day: i,
    //   })),
    // ];

    const firstDayOfTheMonth = new Date(currentDate);
    firstDayOfTheMonth.setDate(1);
    console.log('first', firstDayOfTheMonth, getDayIndexMondaySunday(firstDayOfTheMonth));
    const emptyDays = Array.from({ length: getDayIndexMondaySunday(firstDayOfTheMonth) }, () => ({
      day: null,
      name: '',
    }));

    const monthDays = Array.from({ length: currentDate.getDate() }, (_, i) => {
      const day = new Date(year, month, i);
      return { day: i + 1, name: getDayName(day) };
    });

    const daysRemainToFillRow = (emptyDays.length + monthDays.length) % 7;

    const lastEmptyDays =
      daysRemainToFillRow === 0
        ? []
        : Array.from({ length: 7 - daysRemainToFillRow }, () => ({ name: null, day: null }));
    console.log(lastEmptyDays);

    return [...emptyDays, ...monthDays, ...lastEmptyDays];
  }
}

const getDayIndexMondaySunday = (date: Date) => (date.getDay() === 0 ? 6 : date.getDay() - 1);

function getDayName(day: Date, locale = 'en-US'): string {
  return day.toLocaleDateString(locale, { weekday: 'long' });
}

// var dateStr = '05/23/2014';
// var day = getDayName(dateStr, 'nl-NL'); // Gives back 'Vrijdag' which is Dutch for Friday.

// function getWeekDays(locale)
// {
//     var baseDate = new Date(Date.UTC(2017, 0, 2)); // just a Monday
//     var weekDays = [];
//     for(i = 0; i < 7; i++)
//     {
//         weekDays.push(baseDate.toLocaleDateString(locale, { weekday: 'long' }));
//         baseDate.setDate(baseDate.getDate() + 1);
//     }
//     return weekDays;
// }

// var weekDays = getWeekDays('nl-NL'); // Gives back { 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'} which are the days of the week in Dutch.

// TODO: disabled days
