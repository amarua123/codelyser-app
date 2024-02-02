import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

import { ManageGroupService } from '../manage.group.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-listofusers',
  templateUrl: './list-of-users.component.html',
  styleUrls: ['./list-of-users.component.scss']
})
export class ListofusersComponent {
  displayForm: boolean = false;
  searchMail = '';
  users: { email: string, name: string }[] = [];
  selectedCheckboxValues: { email: string, name: string, selected: boolean }[] = [];
  
  constructor(private userService: UserService, 
    private manageGroupService: ManageGroupService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) {}
   
    
  fetchUsersByGroup(groupName: string): void {
    this.userService.getUsersByGroup(groupName).subscribe(
      (users) => {
        // Handle the retrieved users data
        console.log(users);
        // Update your component properties as needed
      },
      (error) => {
        console.error('Error fetching users:', error);
        // Handle errors as needed
      }
    );
  }
  searchUsers() {
    if (this.searchMail) {
      this.userService.getUsersByEmailSubstring(this.searchMail).subscribe(
        (data) => {
          // Initialize users array
          this.users = data.map((user: any) => ({ email: user.email, name: user.name }));
          // Initialize selectedCheckboxValues array with selected=false for each user
          this.selectedCheckboxValues = this.users.map((user) => ({ ...user, selected: false }));
        },
        (error) => {
          console.error('Error fetching users:', error);
        }
      );
    } else {
      this.users = [];
      console.log("no user found");
    }
  }

  toggleFormDisplay() {
    this.displayForm = !this.displayForm;
  }

  onCheckboxChange(user: { email: string, name: string, selected: boolean }) {
  
    console.log(`${user.name} (${user.email}) selected: ${user.selected}`);
  }

  storeCheckboxValues() {
    // Store or process the checkbox values here
    this.snackBar.open('New user added successfully', 'Close', {
      duration: 3000, 
      horizontalPosition: 'end', 
      verticalPosition: 'top',
      panelClass: ['custom-snackbar'], 
  });
    const selectedUsers = this.selectedCheckboxValues.filter(user => user.selected);
    this.route.queryParams.subscribe(params => {
      let currentGroupName = params['groupName'];
      console.log(currentGroupName);
      this.manageGroupService.addUserToGroup(currentGroupName, selectedUsers[0].email);
    });

    
    console.log('Selected Users:', selectedUsers);
  }
  addUserToGroup() {
    this.snackBar.open('New user added successfully', 'Close', {
      duration: 3000, // You can customize the duration in milliseconds
      horizontalPosition: 'end', // You can change the position if needed
      verticalPosition: 'bottom',
  });
    // console.log(groupName);
    // console.log(userEmail);
    // this.userService.addUserToGroup().subscribe(
    //   (response) => {
    //     console.log('User added successfully:', response);
    //     this.groupService.changeGroupName(groupName); 
    //   },
    //   (error) => {
    //     console.error('Error adding user:', error);
    //   }
    // );
  }

}










