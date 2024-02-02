
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestService {
  private apiUrl = 'http://localhost:8080/testSets/emailAddresses';
 

  constructor(private http: HttpClient) {}

  getTestDetails(testTitle: string): Observable<any> {
    
    const params = new HttpParams().set('testTitle', testTitle);
    
    // console.log(params);
    // return this.http.get<any>(`${this.apiUrl1}`);
    return this.http.get<any>(`${this.apiUrl}`, { params });

  }
}
