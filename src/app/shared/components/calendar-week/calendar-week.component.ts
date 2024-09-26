import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';
import { DatePipe, NgClass } from '@angular/common';
import { getWeekDays } from '../calendar/calendar.component';

@Component({
  selector: 'smt-calendar-week',
  standalone: true,
  imports: [CalendarDayComponent, DatePipe, NgClass],
  templateUrl: './calendar-week.component.html',
  styleUrl: './calendar-week.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarWeekComponent {
  // TODO: hours, duplicated, its not good
  hours: string[] = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Hours 00:00 to 23:00
  currentWeek = signal<Date>(new Date());

  daysInCurrentWeek = computed(() => {
    console.log('call');
    return getWeekDays();
  });
}
