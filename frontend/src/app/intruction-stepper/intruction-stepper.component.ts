// intruction-stepper.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CandidateService } from '../services/candidate.service';
import { Candidate } from '../model/Candidate';
import { QuestionService } from '../services/question.service';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-intruction-stepper',
  templateUrl: './intruction-stepper.component.html',
  styleUrls: ['./intruction-stepper.component.scss']
})
export class IntructionStepperComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  isLinear = false;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;
  candidateFormSubmitted = false;
  candidate: Candidate = { name: '', email: '', phoneNo: '' };

  showWarningMessage = false;
  warningMessage!: string;


  constructor(
    private _formBuilder: FormBuilder,
    public candidateService: CandidateService,
    public questionService: QuestionService,
    private router: Router
  ) {}

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      //secondCtrl: ['', Validators.required]
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'), this.emailValidator]]
    });
  }
  emailValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const email = control.value as string;
    if (email && email.includes('+')) {
      return { 'containsPlus': true };
    }
    return null;
  }
  async startTest() {
    const response = await fetch('http://worldtimeapi.org/api/timezone/Asia/Kolkata');
    const data = await response.json();
    this.questionService.setStartTime(data.datetime);
    this.router.navigate(["/testPage"]);
  }
  
  onSubmit() {

    this.candidateService.createCandidate(this.candidate).subscribe(
      response => {
        console.log('Candidate created successfully:', response);
        this.showWarningMessage = false;
        this.questionService.setEmail(this.candidate.email);
        this.stepper.next();
  
      },
      (error) => {
        console.error('Error creating candidate:', error);
        console.log(error);

        if (error.error) {
          this.showWarningMessage = true;
          this.warningMessage = error.error;
        }
      },
    );
   
  }

}