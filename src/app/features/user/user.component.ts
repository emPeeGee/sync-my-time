import { Component } from '@angular/core';
import { PreferencesComponent } from './components/preferences/preferences.component';

@Component({
  selector: 'smt-user',
  standalone: true,
  imports: [PreferencesComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {}
