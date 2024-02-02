// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:8080/users'; 
  private apiUrl2="http://localhost:8080/groupsUsers";
  private apiUrl3 = 'http://localhost:8080/addUser';
  constructor(private http: HttpClient) {}
  // userEmail: string = "";
  getUsersByGroupName(groupName: string): Observable<string[]> {
    const url = `${this.apiUrl2}/${groupName}`;
    return this.http.get<string[]>(url);
  }
  
  createUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/createUser`, user, { responseType: 'text' as 'json' });
  }

  getUsersByEmailSubstring(searchTerm: string): Observable<any> {
    console.log(searchTerm);
    const url = `${this.apiUrl}/${searchTerm}`;
    console.log(url);
    return this.http.get(url);
  }

  getUsersByGroup(groupName: string): Observable<any[]> {
    const url = `${this.apiUrl2}/${groupName}`;
    return this.http.get<any[]>(url);
  }
}
