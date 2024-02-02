// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { CookieService } from 'ngx-cookie-service';
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   private path = 'http://localhost:8080/';

//   constructor(private httpClient: HttpClient, private cookieService: CookieService) {}
 
//   public signOutExternal = () => {
//     this.cookieService.delete('authCookie');
//     console.log('Token cookie deleted');
//   };

//   saveUser(credentials: string): Observable<any> {
//     const header = new HttpHeaders().set('Content-type', 'text/plain;charset=UTF-8');
    
//     return this.httpClient.post(
//       this.path + 'login',
//       credentials,
//       { headers: header }
//     );
//   }

//   getToken(): string | null {
//     return this.cookieService.get('authCookie');
//   }

//   setToken(tokenPayload:string): void {
//     this.cookieService.set('authCookie', tokenPayload, { expires: 1 });
//   }

//   isTokenPresent(): boolean {
//     return this.cookieService.check('authCookie');
//   }
// }

import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isTokenPresent() :boolean {
    if(localStorage.getItem('token')!=null)
    {
      return true;
    }else{
      return false;
    };
  }
  private path = 'http://localhost:8080/';
  constructor(private httpClient: HttpClient) {}
  public signOutExternal = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('authToken');
    console.log('token deleted');
  };
  LoginWithGoogle(credentials: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post(
      this.path + 'LoginWithGoogle',
      JSON.stringify(credentials),
      { headers: header }
    );
  }
  getEmail(googleToken: string): Observable<string> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<string>(
      this.path + 'getEmail',
      JSON.stringify(googleToken),
      { headers: header }
    );
  }
  getAuthToken(googleToken: string): Observable<any> {
    const header = new HttpHeaders().set('Content-type', 'application/json');
    return this.httpClient.post<any>(
      this.path + 'getAuthToken',
      JSON.stringify(googleToken),
      { headers: header }
    );
  }
  isUserEmailPresent(email: any): Observable<boolean> {
    return this.httpClient.post<boolean>(
      this.path + 'checkEmail',
      email
    );
  }
  getUser(googleToken: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const header = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + authToken);
      console.log(header);
      return this.httpClient.post<any>(
        this.path + 'getUser',
        JSON.stringify(googleToken),
        { headers: header }
      );
    } else {
      console.error('Authentication token is missing');
      // Handle the case where the authentication token is missing
    }
    return new Observable<any>();
  }
  searchUsersByName(name: string): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const header = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + authToken);
      const searchQuery = name; // Adjust the API request payload as needed
      return this.httpClient.get<any>(
        `${this.path}api/users/searchUsersByName/${searchQuery}`
      );
    } else {
      console.error('Authentication token is missing');
      return new Observable<any>();
    }
  }
  searchUserIds(userId: any): Observable<any> {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      const header = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${authToken}`);
      const searchQuery = userId; // Adjust the API request payload as needed
      return this.httpClient.get<any>(
        `${this.path}api/users/searchUsersById/${searchQuery}`
      );
    } else {
      console.error('Authentication token is missing');
      return throwError('Authentication token is missing'); // Update this line
    }
  }
 
 }