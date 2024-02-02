// create-user.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent {
  userName: string = '';
  userEmail: string = '';
  userAccess: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateUserComponent>,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}


  onCreateUser(): void {
    // Add your logic here to handle user creation
    const newUser = {
      name: this.userName,
      email: this.userEmail,
      access: this.userAccess
    };
    this.userService.createUser(newUser).subscribe(
      response => {
        console.log('User created successfully:', response);
        this.dialogRef.close();
        this.showSnackBar('User created successfully');
      },
      error => {
        console.error('Error creating user:', error);
        this.showSnackBar('Error creating user');
      }
    );
    console.log('User created:', this.userName, this.userEmail, this.userAccess);

    // Close the dialog after user creation
    this.dialogRef.close();
  }

  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}
