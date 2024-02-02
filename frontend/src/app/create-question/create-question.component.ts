import { Component, ElementRef, ViewChild } from '@angular/core';
import { QuillService } from '../services/quill.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { QuestionPreviewComponent } from '../question-preview/question-preview.component';
import { QuestionService } from '../services/question.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.scss']
})
export class CreateQuestionComponent {
  @ViewChild('editor') private editorContainer!: ElementRef;

  quill: any;

  [key: string]: any;
  storedContent: string = '';
  storedContent1: string = '';
  storedContent2: string = '';
  storedContent3: string = '';
  storedContent4: string = '';
  description: string = "";
  // storedContent: any;
  // storedContent1: any;
  // storedContent2: any;
  // storedContent3: any;
  // storedContent4: any;

  correctOption: { [key: string]: boolean } = {};
  correctOptionData: string = "";


  constructor(private quillService: QuillService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    public questionService: QuestionService,
    private snackBar: MatSnackBar,
    private router:Router) { }

  ngAfterViewInit(): void {
    this.quill = this.quillService.createEditor(this.editorContainer.nativeElement);
  }

  // getData(quillInstance: any) {
  //   const editorKey = this.getEditorKey(quillInstance);
  //   this['storedContent' + editorKey] = quillInstance.root.innerHTML.replace(/ /g, '&nbsp;');
  //   console.log(`Quill Editor Content (${editorKey}):`, this['storedContent' + editorKey]);
  // }

  sanitized(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
  preview() {
    const dialogRef = this.dialog.open(QuestionPreviewComponent, {
      width: '80vw',
      maxHeight: '100%',
      data: {
        description: this.description,
        descriptionWithCode: this.quill.root.innerHTML.replace(/ /g, '&nbsp;'),
      },
    });
  }
  create() {
    // Check if description, options, and correctOptionData are not empty
    if (this.description.trim() != "" && this.descriptionNotEmpty() && this.correctOptionDataNotEmpty()) {
      this.questionService.createQuestion({
        description: this.description,
        descriptionWithCode: this.quill.root.innerHTML.replace(/ /g, '&nbsp;'),
        options: [
          "A", "B", "C", "D"
        ],
        answers: [this.correctOptionData],
        questionType: 'MCQCODE'
      }).subscribe((response) => {
        console.log(response);
        this.showSnackBar('question created !');
      }, (error) => {
        console.log(error);
        this.showSnackBar('error in creating question');
      });
    } else{
      console.log('Error: Description, options, or correctOptionData is empty.');
      this.showSnackBar('Please fill all the input and choose the correct option');
    }
  }
  descriptionNotEmpty(): boolean {
    return this.quill && this.quill.root && this.quill.root.innerHTML.trim() !== '';
  }
  
  
  correctOptionDataNotEmpty(): boolean {
    return this.correctOptionData !== "" && (this.correctOptionData.trim() !== '');
  }
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
  renderData(quillInstance: any) {
    // const editorKey = this.getEditorKey(quillInstance);
    // if (this['storedContent' + editorKey] !== null) {
    //   quillInstance.root.innerHTML = this['storedContent' + editorKey];
    //   quillInstance.root.style.whiteSpace = 'pre-wrap';
    // }
  }


  // private getEditorKey(quillInstance: any): string {
  //   if (quillInstance === this.quill) return '';
  //   if (quillInstance === this.quill1) return '1';
  //   if (quillInstance === this.quill2) return '2';
  //   if (quillInstance === this.quill3) return '3';
  //   if (quillInstance === this.quill4) return '4';
  //   throw new Error('Invalid Quill instance');
  // }

  setCorrectOption(index: string) {
    this.correctOption = { [index]: true };
    if(index === '1'){
      this.correctOptionData = "A";
    }else if(index === '2'){
      this.correctOptionData = "B";
    }else if(index === '3'){
      this.correctOptionData = "C";
    }else if(index === '3'){
      this.correctOptionData = "D";
    }
    console.log(this.correctOption);
  }

  backButton() :void{

    this.router.navigate(["/question-list"]);
  }
}

