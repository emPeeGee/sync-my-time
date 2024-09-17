import { Component, inject, OnInit } from '@angular/core';
import { SwitchComponent } from '../../../../shared/components/switch/switch.component';
import { PreferencesService } from '../../../../core/services/preferences.service';
import { Preferences } from '../../../../shared/models/user.model';

@Component({
  selector: 'smt-preferences',
  standalone: true,
  imports: [SwitchComponent],
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css',
})
export class PreferencesComponent implements OnInit {
  preferences: Preferences = {} as Preferences;
  userPreferencesService = inject(PreferencesService);

  ngOnInit() {
    this.userPreferencesService.preferences$.subscribe(p => {
      this.preferences = p;
      console.log('Info got changed to: ', p);
    });
  }

  updatePreference(key: keyof Preferences, value: any) {
    console.log(key, value);
    this.userPreferencesService.updatePreferences(key, value);
  }
}
