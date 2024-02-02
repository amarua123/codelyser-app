import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerValue = new BehaviorSubject<number>(0);
  timerValue$ = this.timerValue.asObservable();

  constructor() {}

  setTimerValue(value: number) {
    this.timerValue.next(value);
  }
}
