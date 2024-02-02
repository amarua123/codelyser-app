import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit {
  totalSecs = 30*60; // 30 minutes -> 30*60 secs
  timeInSeconds: number = this.totalSecs;
  private timerSubscription!: Subscription;
  startTime = new Date().getTime();

  @Output() timerEnded: EventEmitter<void> = new EventEmitter<void>();

  checkAndUpdate(curtime: number) {
    if (this.timeInSeconds > 0) {
      this.timeInSeconds = Math.max(0, this.totalSecs - (curtime - this.startTime));
    }else {
      this.timerEnded.emit();
      this.timerSubscription.unsubscribe();
    }
  }

  async ngOnInit(): Promise<void> {
    const response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
    const data = await response.json();
    this.startTime = data.unixtime;
    this.timerSubscription = interval(900).subscribe(async () => {
      const response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
      const data = await response.json();
      this.checkAndUpdate(data.unixtime);
    });
  }

  transform(value: number): string {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    return ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
  }
}
