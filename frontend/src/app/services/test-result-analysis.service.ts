import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TestResultAnalysisService {
  private apiUrl = 'http://localhost:8080/testResponse'; // Updated base URL

  constructor(private http: HttpClient) {}

  getScoresByTestSetTitle(testSetTitle: string): Observable<number[]> {
    const url = `${this.apiUrl}/getAllScores/${testSetTitle}`;
    return this.http.get<number[]>(url);
  }
}
