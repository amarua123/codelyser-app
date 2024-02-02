import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CredentialResponse } from 'google-one-tap';
import { AuthService } from '../services/auth.service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.scss'
})
export class UserLoginComponent {
  constructor(
    private router: Router,
    private service: AuthService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    // @ts-ignore
    window.onGoogleLibraryLoad = () => {
      // @ts-ignore
      google.accounts.id.initialize({
        client_id: '308714834533-00grh0uvasp68lbaes7df64r6guq6cil.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });
      // @ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById('buttonDiv'),
        { theme: 'outline', size: 'large'}
      );
      // @ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  // Whenever google responds back with a token then that will go to this function
  // async handleCredentialResponse(response: CredentialResponse) {
  //   try {
  //     console.log(response.credential)
  //     await firstValueFrom(this.service.saveUser(response.credential)).then(
  //       (x) => {
  //         console.log(x)
  //         this.service.setToken(x.tokenPayload);
  //         this.router.navigate(['/admin-dashboard']);
  //       }
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async handleCredentialResponse(response: any) {
    // Call your AuthService method to check if the user's email is present
    // console.log(response.credential);
    
    const userEmail = await this.service.getEmail(response.credential).toPromise();
    const authToken = await this.service.getAuthToken(response.credential).toPromise();
    console.log(userEmail);
    console.log(authToken);
    const userEmailPresent = await this.service.isUserEmailPresent(userEmail).toPromise();
    if (userEmailPresent) {
      // Proceed with login and navigation
      await this.service.LoginWithGoogle(response.credential).subscribe(
        (x: any) => {
          localStorage.setItem('token', response.credential);
          if (authToken !== undefined) {
            localStorage.setItem('authToken', authToken.jwtToken);
          } else {
            console.error('Authentication token is undefined');
          }
          // console.log(response.credential);
          this.ngZone.run(() => {
            
            this.router.navigate(['/admin-dashboard'],{ replaceUrl: true });
            // this.router.navigate(['/dashboard'], { replaceUrl: true });
          });
        },
        (error: any) => {
          console.log(error);
        }
      );
    } else {
      // Handle the case where the user's email is not present
      console.error("User's email is not present in the database.");
    }
  }
}
