import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrl: './question-preview.component.scss'
})
export class QuestionPreviewComponent {
  description: string = "";
  descriptionWithCode: string = "";
  constructor(public dialogRef: MatDialogRef<QuestionPreviewComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: {description: string, descriptionWithCode: string}){
      this.description = data.description;
      this.descriptionWithCode = data.descriptionWithCode;
    }

    sanitized(html: string): SafeHtml {
      return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
