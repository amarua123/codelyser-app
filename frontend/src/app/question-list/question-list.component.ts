import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QuestionService } from '../services/question.service';
import { CreateTestSetService } from '../services/create-test-set.service';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { QuestionPreviewComponent } from '../question-preview/question-preview.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UploadQuestionComponent } from '../upload-question/upload-question.component';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})

export class QuestionListComponent {

  questions: any[]=[];
  selectedQuestions: any[] = [];
  selectedQuestionIds:any[]=[];
  selectedQuestionsIndex: number[] = [];
  searchText: string = '';
  selectedQuestionTitle: string = '';
  testTitle:string='';
  selectedDate: Date;

  
  constructor(private questionService: QuestionService, 
    private createTestSetService: CreateTestSetService, 
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private router:Router) {
    this.selectedDate = new Date();
  }
  ngOnInit():void{
    this.loadQuestions();
  }
  openQuestionUploadDialog(): void {
    const dialogRef = this.dialog.open(UploadQuestionComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  preview(question: any) {
    const dialogRef = this.dialog.open(QuestionPreviewComponent, {
      width: '90vw',
      maxHeight: '100%',
      data: {
        description: question.description,
        descriptionWithCode: question.descriptionWithCode
      },
    });
  }
  isExpanded(index: number): boolean {
    return (this.questions[index].questionType=='MCQCODE');
  }
  addQuestion(index: number ,event : MouseEvent): void {
    event.stopPropagation();
    const selectedQuestion = this.questions[index].description;
    const selectedQuestionId = this.questions[index].id;
    if(this.selectedQuestionsIndex.includes(index)){
      const i = this.selectedQuestionsIndex.indexOf(index);
      this.selectedQuestionsIndex.splice(i, 1);
      this.selectedQuestions.splice(i, 1);
      this.selectedQuestionIds.splice(i, 1);
  
    }
    else{this.selectedQuestions.push(selectedQuestion);
      this.selectedQuestionsIndex.push(index);
      this.selectedQuestionTitle = selectedQuestion.question;
      this.selectedQuestionIds.push(selectedQuestionId);
      this.selectedQuestionTitle = this.questions[index].description;
    }
    console.log(this.selectedQuestionIds);
  }
  
  filteredQuestions(): any[] {
    if (!this.searchText.trim()) {
      // If search bar is empty, return all questions
      return this.questions;
    }
  
    return this.questions.filter(question => {
      const isTitleMatch = question.description.toLowerCase().includes(this.searchText.toLowerCase());
      const areTagsMatched = question.tagSet.some((tag:string) => tag.toLowerCase().includes(this.searchText.toLowerCase()));
      return isTitleMatch || areTagsMatched;
    });
  }
  
  panelOpened(panel: MatExpansionPanel): void {
    // Your logic when the panel is opened (optional)
  }

  handleButtonClick(event: MouseEvent): void {
    // Prevent the default behavior of the click event
    event.preventDefault();
    
    // Your button click logic goes here
  }

  loadQuestions():void {
    this.questionService.getQuestions().subscribe(
      (data:any[])=>
      {
        this.questions = data;
        console.log(this.questions);
      },
      (error:any)=>
      {
        console.log('Error Fetching Data',error);
      }
    );
  }

  createTestSet(): void {
    const formattedTestTitle = this.testTitle.replace(/\s+/g, '-').toLowerCase();
    console.log(formattedTestTitle);

    console.log(this.testTitle);
    console.log(this.selectedQuestionIds);
    console.log('Selected Date:', this.selectedDate);
    this.createTestSetService
      .createTestSet(formattedTestTitle, this.selectedQuestionIds)
      .subscribe(
        (response) => {
          // Handle successful response
          console.log('Test set created successfully:', response);
          this.showSnackBar('Test set created successfully');
        },
        (error) => {
          // Handle error
          // console.error('Error creating test set:', error);
          this.showSnackBar('Error creating test set');
        }
      );
  }
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  createQuestion(): void{
  this.router.navigate(["/create-question"]);
  }


  backButton() :void{

    this.router.navigate(["/available-tests"]);
  }
}