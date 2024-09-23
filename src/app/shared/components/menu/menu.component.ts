import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  input,
  model,
  signal,
  ViewChild,
} from '@angular/core';
import { fromEvent, repeat, takeUntil, tap } from 'rxjs';
import { MenuItem } from '../../../core/models/menu.model';

@Component({
  selector: 'smt-menu',
  standalone: true,
  imports: [NgClass],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements AfterViewInit {
  items = input.required<MenuItem[]>();
  selected = model<MenuItem>();
  isOpen = signal<boolean>(false);

  @ViewChild('button') button: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild('menu') menu: ElementRef<HTMLDivElement> | undefined;

  ngAfterViewInit() {
    const enter = fromEvent(this.button!.nativeElement, 'mouseenter');
    const leave = fromEvent(this.menu!.nativeElement, 'mouseleave');

    enter
      .pipe(
        tap(() => this.showMenu()),
        takeUntil(leave),
        repeat()
      )
      .subscribe();

    leave.pipe(tap(() => this.hideMenu())).subscribe();
  }

  private showMenu() {
    this.menu!.nativeElement.classList.add('block');
    this.menu!.nativeElement.classList.remove('hidden');
    console.log('menu dropdown shown');
  }

  private hideMenu() {
    this.menu!.nativeElement.classList.remove('block');
    this.menu!.nativeElement.classList.add('hidden');
    console.log('menu dropdown hidden');
  }

  onItemClick(item: MenuItem) {
    this.selected.set({ ...item });
  }
}
