import { Component, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateUserComponent } from '../create-user/create-user.component';
import { UploadQuestionComponent } from '../upload-question/upload-question.component';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  constructor(public dialog: MatDialog,
    private router: Router, private service: AuthService, private _ngZone: NgZone
  ) {}
  
  
  public logout(){
    this.service.signOutExternal();
    this._ngZone.run(()=>{
    this.router.navigate(['/user-login']).then(()=>window.location.reload())
  })
  }
  openCreateUserDialog(): void {
    const dialogRef = this.dialog.open(CreateUserComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
