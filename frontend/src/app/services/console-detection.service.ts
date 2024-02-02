// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class ConsoleDetectionService {

//   constructor() { }
// }


// console-detection.service.ts
import { Injectable, HostListener, NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsoleDetectionService {
  consoleOpen: boolean = false;

  constructor(private zone: NgZone) {
    this.setupConsoleDetection();
  }

  private setupConsoleDetection(): void {
    this.zone.runOutsideAngular(() => {
      window.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.shiftKey && event.key === 'C') {
          this.consoleOpen = true;
          this.handleConsoleOpen();
        }
      });
    });
  }

  private handleConsoleOpen(): void {
    // You can perform actions when the console is detected
    // For example, display a warning message or log the event
    console.warn('Warning: Console is open!');
  }
}
