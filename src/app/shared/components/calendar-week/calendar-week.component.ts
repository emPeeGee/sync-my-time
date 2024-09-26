import { Component } from '@angular/core';
import { CalendarDayComponent } from '../calendar-day/calendar-day.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'smt-calendar-week',
  standalone: true,
  imports: [CalendarDayComponent, NgClass],
  templateUrl: './calendar-week.component.html',
  styleUrl: './calendar-week.component.css',
})
export class CalendarWeekComponent {
  hours: string[] = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Hours 00:00 to 23:00
}
