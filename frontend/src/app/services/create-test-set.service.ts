import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreateTestSetService {
  private apiUrl = 'http://localhost:8080/testSets/create';
  private apiUrl1='http://localhost:8080/testSets/getAll';
  private apiUrl2 = 'http://localhost:8080/testSets/questionlist'; 
  
  constructor(private http: HttpClient) {}

  createTestSet(testTitle: string, selectedQuestionIds: any[]): Observable<any> {
    const requestBody = {
      testTitle: testTitle,
      questionIds: selectedQuestionIds,
    };
    // console.log(testTitle);
    // console.log(selectedQuestionIds);
    // console.log(this.apiUrl);
    console.log(requestBody);
    return this.http.post<any>(this.apiUrl, requestBody);
  }
   
  getTestTitles(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl1);
  }
  
  getQuestionDescriptionsByTitle(title: string): Observable<string[]> {
   
    const url = `${this.apiUrl2}/${title}`;
    // console.log(url);
    return this.http.get<string[]>(url);
  }

}
