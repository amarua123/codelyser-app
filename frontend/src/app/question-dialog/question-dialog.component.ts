// question-dialog.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-question-dialog',
  templateUrl: 'question-dialog.component.html',
})
export class QuestionDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { descriptions: string[] }
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
