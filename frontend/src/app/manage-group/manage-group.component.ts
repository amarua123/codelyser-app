// manage-group.component.ts

import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ListOfGroupService } from '../services/list-of-group.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateGroupDialogComponent } from '../create-group-dialog/create-group-dialog.component';
import { Router } from '@angular/router';
import { ManageGroupService } from '../manage.group.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-manage-group',
  templateUrl: './manage-group.component.html',
  styleUrls: ['./manage-group.component.scss'],
})

export class ManageGroupComponent implements OnInit {
  groups: string[] = [];
  displayForm: boolean = false;
  groupForm!: FormGroup;
  groupName!: string;
  // createGroupDialogRef!: MatDialogRef<CreateGroupDialogComponent>;
  createGroupDialogRef!: MatDialogRef<CreateGroupDialogComponent>;

  constructor(
    private groupService: ListOfGroupService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private manageGroupservice: ManageGroupService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.fetchGroups();
    this.initForm();
  }
  
  fetchUsersByGroup(groupName: string) {
    this.groupName = groupName;
    // this.manageGroupservice.setCurrentGroupName(this.groupName);
    this.router.navigate(['/user-list'], {queryParams: { groupName: this.groupName }});
  }

  fetchGroups() {
    this.groupService.getAllGroups().subscribe(
      (data: any[]) => {
        this.groups = data.map(group => group.groupName);
        // this.groups = data;
        console.log(this.groups);
      },
      error => {
        console.error('Error fetching groups:', error);
      }
    );
  }

  initForm() {
    this.groupForm = this.fb.group({
      groupName: ['', [Validators.required]],
      
    });
  }

  toggleFormDisplay() {
    this.displayForm = !this.displayForm;
  }

  openCreateGroupDialog() {
    this.createGroupDialogRef = this.dialog.open(CreateGroupDialogComponent, {
      width: '400px', 
      data: { form: this.groupForm },
    });

    this.createGroupDialogRef.afterClosed().subscribe(result => {
    
      if (result) {
        this.addGroup(result);
      }
    });
  }



  //   addGroup(newGroup: any) {

  //     this.groupService.addGroup(this.groupName).subscribe(
  //       () => {
  //         this.fetchGroups();
  //         // this.groupForm.reset();
  //         // this.toggleFormDisplay();
  //         console.log("reached");
  //       },
  //       (error: any) => {

  //         console.error('Error adding group:', error);
  //       }
  //     );
  //   }
  // }

  addGroup(newGroup: any) {
    this.groupService.addGroup(this.groupName).toPromise()
      .then(() => {
        this.fetchGroups();
        console.log("Group added successfully");
        this.showSnackBar('Group created successfully');
        this.fetchGroups();
      })
      .catch((error: any) => {
        this.showSnackBar('Error in creating group');
        console.error('Error adding group:', error);
      });
  }
  private showSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // milliseconds
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }
}