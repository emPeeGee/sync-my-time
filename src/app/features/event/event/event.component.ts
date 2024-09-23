import { Component, inject, OnInit } from '@angular/core';
import { CalendarComponent } from '../../../shared/components/calendar/calendar.component';
import { PreferencesService } from '../../../core/services/preferences.service';
import { Preferences } from '../../../core/models/user.model';

@Component({
  selector: 'smt-event',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent implements OnInit {
  preferences: Preferences = {} as Preferences;
  userPreferencesService = inject(PreferencesService);

  ngOnInit() {
    this.userPreferencesService.preferences$.subscribe(p => {
      this.preferences = { ...p };
      console.log('Event got changed to: ', p);
    });
  }
}
