import { NgClass } from '@angular/common';
import { AfterViewInit, Component, input, model, signal, ViewChild } from '@angular/core';
import { fromEvent, repeat, takeUntil, tap } from 'rxjs';

interface MenuItem {
  id: string;
  label: string;
}

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

  @ViewChild('button') button: any;
  @ViewChild('menu') menu: any;

  ngAfterViewInit() {
    const enter = fromEvent(this.button.nativeElement, 'mouseenter');
    const leave = fromEvent(this.menu.nativeElement, 'mouseleave');

    // Show dropdown on mouse enter and hide on mouse leave
    enter
      .pipe(
        tap(() => this.showMenu()), // Show dropdown on mouse enter
        takeUntil(leave), // Wait for the mouse leave event
        repeat()
      )
      .subscribe();

    // Hide dropdown on mouse leave
    leave
      .pipe(
        tap(() => this.hideMenu()) // Hide dropdown on mouse leave
      )
      .subscribe();
  }

  private showMenu() {
    this.menu.nativeElement.classList.add('block');
    this.menu.nativeElement.classList.remove('hidden');
    console.log('Dropdown shown');
  }

  private hideMenu() {
    this.menu.nativeElement.classList.remove('block');
    this.menu.nativeElement.classList.add('hidden');
    console.log('Dropdown hidden');
  }

  onItemClick(item: MenuItem) {
    this.selected.set({ ...item });
  }

  mouseEnter(div: string) {
    console.log('mouse enter : ' + div);
    this.isOpen.set(true);
  }

  mouseLeave(div: string) {
    console.log('mouse leave :' + div);
    this.isOpen.set(false);
  }
}
