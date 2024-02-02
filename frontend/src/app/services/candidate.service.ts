import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Candidate } from '../model/Candidate';

@Injectable({
  providedIn: 'root'
})

export class CandidateService {
  private apiUrl = 'http://localhost:8080/candidates'; // Replace with your API endpoint
  candidateFormSubmitted = false; // Property to track form submission

  constructor(private http: HttpClient) { }

  getCandidates(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl+"/getAll");
  }

  createCandidate(candidate: Candidate): Observable<any> {
    this.candidateFormSubmitted = true;
    return this.http.post<any>(`${this.apiUrl}/createCandidate`, candidate, {responseType: 'text' as 'json'});
  }
  
  downloadTestReport(candidateEmail: string): Observable<Blob> {
    const url = `${this.apiUrl}/downloadTestReport/${candidateEmail}`;
    // Send the GET request to download the test report
    return this.http.get(url, { responseType: 'blob' });
  }
 
  checkSubmitted(){
    return this.candidateFormSubmitted; 
  }
}