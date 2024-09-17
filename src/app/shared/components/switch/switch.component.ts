import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'smt-switch',
  standalone: true,
  imports: [NgClass],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SwitchComponent {
  @Input({ required: true }) checked = false;
  @Input() disabled = false;
  @Input() label = '';

  // 'Change' appended intentionally to support 2 way data binding
  @Output() checkedChange = new EventEmitter();

  onSwitchChange() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
  }
}
