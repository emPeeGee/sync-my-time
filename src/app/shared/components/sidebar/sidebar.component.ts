import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, inject, signal } from '@angular/core';
import { PreferencesService } from '../../../core/services/preferences.service';

@Component({
  selector: 'smt-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  animations: [
    trigger('slideInOut', [
      state(
        'in',
        style({
          width: '288px',
        })
      ),
      state(
        'out',
        style({
          width: '64px',
        })
      ),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out')),
    ]),
  ],
})
export class SidebarComponent {
  menuState = signal('in');
  // TODO: do I need it here? I mean, to set it in general
  userPreferencesService = inject(PreferencesService);

  toggleMenu() {
    this.menuState.update(v => (v === 'out' ? 'in' : 'out'));
    this.userPreferencesService.updatePreferences('isSidebarOpen', this.menuState() === 'in');
  }
}
