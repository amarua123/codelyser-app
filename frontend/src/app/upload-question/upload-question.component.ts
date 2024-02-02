import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-upload-question',
  templateUrl: './upload-question.component.html',
  styleUrl: './upload-question.component.scss'
})
export class UploadQuestionComponent {
  selectedFile: File | null = null;
  selectedFileName: string | null = null;
  constructor(private http: HttpClient,
    private snackBar: MatSnackBar, private dialogRef: MatDialogRef<UploadQuestionComponent>) {}

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    this.selectedFileName = this.selectedFile?.name || null;
  }

  onUpload(): void {
    if (this.selectedFile) {
      // Check if the file is in Excel format (e.g., .xlsx)
      if (this.selectedFile.name.endsWith('.xlsx')) {
        const formData = new FormData();
        formData.append('file', this.selectedFile);
  
        this.http.post('http://localhost:8080/question/upload-question', formData, {
          responseType: 'text' // Set the responseType to 'text'
        }).subscribe(
          response => {
            // console.log('File uploaded successfully:', response);
            this.showSnackBar('File uploaded successfully');
            this.dialogRef?.close();
            // Handle success (e.g., show a success message)
          },
          error => {
            // console.error('Error uploading file:', error);
            this.showSnackBar('Error uploading file');
            // Handle error (e.g., show an error message)
          }
        );
      } else {
        this.showSnackBar('Please upload a valid Excel file (.xlsx)');
      }
    } else {
      this.showSnackBar('Please choose a file to upload');
    }
  }
  
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
