

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListOfGroupService {
  
  private apiUrl = 'http://localhost:8080/groups/getAllGroup';
  private apiUrl2='http://localhost:8080/groups';

  constructor(private http: HttpClient) {}

  getAllGroups(): Observable<any[]> {
    console.log(this.apiUrl);
    return this.http.get<any[]>(this.apiUrl);
  }
  
  addGroup(groupName: string): Observable<any> {
    const url = `${this.apiUrl2}/create/${groupName}`;
    return this.http.post(url, null, { responseType: 'text' });
  }
  
}