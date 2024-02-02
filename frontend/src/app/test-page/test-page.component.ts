import { AfterViewInit, Component, OnInit, HostListener,ViewContainerRef, ViewChild } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';
import { TabSwitchService } from '../services/tab-switch.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoRightClickService } from '../services/no-right-click.service';
import { TabSwitchAlertComponent } from '../tab-switch-alert/tab-switch-alert.component';
import { ConsoleDetectionService } from '../services/console-detection.service';
import { TestEndingMessageComponent } from '../test-ending-message/test-ending-message.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { TimerService } from '../services/timer.service';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.scss']
})
export class TestPageComponent implements OnInit, AfterViewInit {

  @ViewChild(TimerComponent) timer!: TimerComponent;
  currentIndex = 0;
  questions: any[] = [];
  answers: any[] = [];
  totalQue = 0;
  showTestEndingMessage = false;
  showTimer=true;


  // questions: any[]=[];
  constructor(private questionService: QuestionService, private router: Router,private noRightClickService: NoRightClickService,
    private tabSwitchService: TabSwitchService,private snackBar: MatSnackBar,private consoleDetectionService: ConsoleDetectionService,
    private sanitizer: DomSanitizer,private timerService: TimerService ){}


  // constructor(private questionService: QuestionService, private router: Router) {}

  ngAfterViewInit(): void {

    const element = document.documentElement as HTMLElement;
    this.enterFullScreen(element);
  }

  ngOnInit(): void {
    this.tabSwitchService.tabSwitchEvent.subscribe((tabSwitched) => {
      if (tabSwitched && !this.showTestEndingMessage) {
        this.snackBar.openFromComponent(TabSwitchAlertComponent, { duration: 5000 });
        // Handle tab switch (e.g., display a warning or pause the test)
        // console.log('Warning: Tab switched!');
      }
    });
  

    this.noRightClickService.disableRightClick();

    
    // Retrieve answers from local storage if available, or initialize with empty strings
    this.questionService.getSetsQuestions().subscribe((res) => {
      this.questions = res;
      // console.log(res);
      this.answers = Array.from({ length: this.questions.length }, (_, i) => "");
      this.totalQue = this.questions.length;
    }, (err) => {
      console.log(err);
    });
    // Call enterFullScreen again in case ngAfterViewInit is not triggered
    // const element = document.documentElement as HTMLElement;
    // this.enterFullScreen(element);
  }


  
  sanitized(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  onPrevClick() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      console.log('reached');
    }
    console.log(this.answers);
  }

  onNextClick(): void {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      console.log('reached');
    }
    console.log(this.answers);
  }

  goToQuestion(index: number) {
    console.log(this.answers);
    this.currentIndex = index;
  }
  onTimerEnded() {
    // Call onSubmit method when timer ends
    this.onSubmit();
    console.log('time finish')
  }
  async onSubmit() {
    // this.showTestEndingMessage = true;
    this.showTimer=false;
    let ticked = Array.from({ length: this.questions.length }, (_, i) => "Z");
    for (let i = 0; i < this.totalQue; i++) {
      if (this.answers[i] === this.questions[i].options[0]) {
        ticked[i] = "A";
      } else if (this.answers[i] === this.questions[i].options[1]) {
        ticked[i] = "B";
      } else if (this.answers[i] === this.questions[i].options[2]) {
        ticked[i] = "C";
      } else if (this.answers[i] === this.questions[i].options[3]) {
        ticked[i] = "D";
      }
    }
    const submissionData = {
      answers: ticked,
      questionIds: this.questions.map(q => q.id)
    };

    const response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
    const data = await response.json();
    let finishTime = data.datetime;
    // console.log(data.datetime);

    this.questionService.sendAnswers(submissionData, finishTime).subscribe(
      (response) => {
        // console.log('Answers submitted successfully:', response);
        this.showTestEndingMessage = true;
       
      },
      (error) => {
        console.error('Error submitting answers:', error);
      }
    );
    this.exitFullScreen();
  }

  enterFullScreen(element: HTMLElement) {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) {
      (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) {
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) {
      (element as any).msRequestFullscreen();
    }
  }



  @HostListener('document:visibilitychange', ['$event'])
  handleVisibilityChange(event: Event): void {
    if (document.hidden) {
      // User switched tabs or minimized the browser
      this.onSubmit();
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (event.ctrlKey && event.shiftKey && event.key === 'C') {
      // User opened console
      this.onSubmit();
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  handleBeforeUnload(event: Event): void {
    // This method will be called when the page is about to be unloaded (refreshed or closed)
    this.onSubmit();
  }
 
  exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) {
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  }

  isFullScreen(): boolean {
    return !!(document.fullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).msFullscreenElement);
  }
}