import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent, debounceTime, filter } from 'rxjs';

@Directive({
  selector: '[smtDebounceMousemove]',
  standalone: true,
})
export class DebounceMousemoveDirective implements OnInit {
  @Input() debounceTime = 100;
  @Input() debounceFilter: string | null = null;
  @Output() debouncedMousemove = new EventEmitter<MouseEvent>();

  constructor(private el: ElementRef) {}

  ngOnInit() {
    fromEvent(this.el.nativeElement, 'mousemove')
      .pipe(
        debounceTime(this.debounceTime as any) as any,
        filter((event: MouseEvent) => {
          if (this.debounceFilter) {
            const targetElement = event.target as HTMLElement;
            // closest() to find the nearest element with class 'hour-row'
            return targetElement.closest(`.${this.debounceFilter}`) !== null;
          }

          return true;
        })
      )
      .subscribe((event: MouseEvent) => {
        if (this.debounceFilter) {
          const filteredElement = (event.target as HTMLElement).closest(`.${this.debounceFilter}`);
          if (filteredElement) {
            const hour = filteredElement.getAttribute(this.debounceFilter);
            this.debouncedMousemove.emit(hour as any);
          }
        } else {
          this.debouncedMousemove.emit(event);
        }
      });
  }
}
