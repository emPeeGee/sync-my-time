import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './shared/components/button/button.component';
import { CalendarComponent } from './shared/components/calendar/calendar.component';

@Component({
  selector: 'smt-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, CalendarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sync-my-time';
}
