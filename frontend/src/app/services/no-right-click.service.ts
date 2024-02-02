import { Injectable, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NoRightClickService {
  disableRightClick(): void {
    window.addEventListener('contextmenu', (event) => {
      event.preventDefault();
    });

    document.addEventListener('cut', (event) => {
      event.preventDefault();
    });

    document.addEventListener('copy', (event) => {
      event.preventDefault();
    });


  }

  constructor() { }
}
