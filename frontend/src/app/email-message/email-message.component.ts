// import { Component, Inject, OnInit } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

// @Component({
//   selector: 'app-email-message',
//   templateUrl: './email-message.component.html',
//   styleUrl: './email-message.component.scss'
// })
// export class EmailMessageComponent implements OnInit{
//   emailMessage: string = '';
//   constructor(
//     public dialogRef: MatDialogRef<EmailMessageComponent>,
//     @Inject(MAT_DIALOG_DATA) public data: { emailMessage: string }
//   ) {
//     this.emailMessage = data.emailMessage;

//   }

//   ngOnInit(): void {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   onOkClick(): void {
//     this.dialogRef.close(this.data.emailMessage);
//     this.dialogRef.close(this.emailMessage);
    
//   }
// }
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-email-message',
  templateUrl: './email-message.component.html',
  styleUrls: ['./email-message.component.scss']
})
export class EmailMessageComponent {
  emailAddresses: string = '';
  emailMessage: string = '';
   defaultEmailMessage: string = '';

  constructor(
    public dialogRef: MatDialogRef<EmailMessageComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { emailAddresses: string, emailMessage: string }
  ) {
    this.emailAddresses = data.emailAddresses;
    this.emailMessage = data.emailMessage;
    
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onOkClick(): void {
    // const emailAddressesArray = this.emailAddresses.split('\n').map(email => email.trim()); // Split by newline
    const result = {
      emails: this.emailAddresses,
      message: this.emailMessage
    };
    this.dialogRef.close(result);
  }
}
