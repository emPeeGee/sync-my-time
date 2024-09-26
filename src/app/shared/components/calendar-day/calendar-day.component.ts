import { Component } from '@angular/core';
import { DebounceMousemoveDirective } from '../../directives/debounce-mousemove.directive';
import { NgClass } from '@angular/common';

const hoursFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  hourCycle: 'h24',
});

@Component({
  selector: 'smt-calendar-day',
  standalone: true,
  imports: [DebounceMousemoveDirective, NgClass],
  templateUrl: './calendar-day.component.html',
  styleUrl: './calendar-day.component.css',
})
export class CalendarDayComponent {
  hours: string[] = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Hours 00:00 to 23:00
  selectedRange: any = null;
  // selectedRange: { startHour: string; endHour?: string } = null;
  isDragging = false;
  today = new Date();

  get minutesInPercent(): string {
    return `${Math.floor((100 * this.today.getMinutes()) / 60)}%`;
  }

  isCurrentHour(hour: string): boolean {
    const currentHour = hoursFormatter.format(this.today);
    return hour.includes(currentHour);
  }

  onMouseDown(hour: string) {
    this.isDragging = true;
    this.selectedRange = { startHour: hour };
  }

  onMouseMove(hour: string | any) {
    if (this.isDragging) {
      this.selectedRange = { ...this.selectedRange, endHour: hour };
    }
  }

  onMouseUp(hour: string) {
    this.isDragging = false;
    this.selectedRange = { ...this.selectedRange, endHour: hour };
    console.log('Selected Range:', this.selectedRange);
  }

  // NOTE: is called too many times
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
}
