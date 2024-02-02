import { Component, HostListener, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router, private service: AuthService, private _ngZone: NgZone){}
  title = 'CandidateView';
  showInstructions = true;
  

// @HostListener('window:beforeunload', ['$event'])
// handleBeforeUnload(event: Event): void {
//   console.log("refreshed");
//   const visibilityState = document.visibilityState;
//   if (visibilityState !== 'hidden') {
//     // This method will be called when the browser is closed
//     this.logout();
//   }
// }
  


  proceed()
  {
    this.showInstructions=false;
  }
  
  public logout(){
    this.service.signOutExternal();
    this._ngZone.run(()=>{
    this.router.navigate(['/user-login']).then(()=>window.location.reload())
  })
  }
}




