// create-group-dialog.component.ts
import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-group-dialog',
  templateUrl: './create-group-dialog.component.html',
})
export class CreateGroupDialogComponent {
  
  constructor(
     public dialogRef: MatDialogRef<CreateGroupDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { form: FormGroup }
  ) {}

  closeDialog() {
    this.dialogRef.close();
  }

  addNewGroup() {
    if (this.data.form.valid) {
      // Check if the form is valid before proceeding
      this.dialogRef.close(this.data.form.value);
    }
  }
}
