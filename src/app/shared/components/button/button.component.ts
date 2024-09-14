import { Component, Input } from '@angular/core';

@Component({
  selector: 'smt-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  @Input() text = 'Press me';
}
