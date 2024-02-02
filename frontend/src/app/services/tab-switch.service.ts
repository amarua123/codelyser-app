// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class TabSwitchService {

//   constructor() { }
// }

// tab-switch.service.ts
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabSwitchService {
  tabSwitchEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.setupTabSwitchDetection();
  }

  private setupTabSwitchDetection(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.tabSwitchEvent.emit(true); // Tab switched
      }
    });
  }
}
