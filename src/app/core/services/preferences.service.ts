import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Preferences } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class PreferencesService {
  private preferences = new BehaviorSubject<Preferences>({
    startOnMonday: true,
  });

  preferences$ = this.preferences.asObservable();

  updatePreferences(key: keyof Preferences, value: any) {
    const currentSettings = this.preferences.getValue();
    currentSettings[key] = value;
    this.preferences.next(currentSettings);
  }

  getPreference(key: keyof Preferences): any {
    return this.preferences.getValue()[key];
  }

  resetSettings() {
    this.preferences.next({
      startOnMonday: true,
    });
  }
}
