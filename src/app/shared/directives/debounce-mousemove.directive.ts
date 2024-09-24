import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent, debounceTime } from 'rxjs';

@Directive({
  selector: '[smtDebounceMousemove]',
  standalone: true,
})
export class DebounceMousemoveDirective implements OnInit {
  @Input() debounceTime = 100;
  @Output() debouncedMousemove = new EventEmitter<MouseEvent>();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    fromEvent<MouseEvent>(this.el.nativeElement, 'mousemove')
      .pipe(debounceTime(this.debounceTime))
      .subscribe((event: MouseEvent) => {
        console.log('ev');
        this.debouncedMousemove.emit(event);
      });
  }
}
