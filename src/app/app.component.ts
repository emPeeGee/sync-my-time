import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from './shared/components/button/button.component';
import { CalendarComponent } from './shared/components/calendar/calendar.component';
import { SwitchComponent } from './shared/components/switch/switch.component';
import { UserComponent } from './features/user/user.component';

@Component({
  selector: 'smt-root',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent, CalendarComponent, SwitchComponent, UserComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'sync-my-time';
  startOnMonday = true;
}
