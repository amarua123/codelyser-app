import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private apiUrl = 'http://localhost:8080'; // Update with your backend API URL
 
  constructor(private http: HttpClient) {}

  private getCandidateEmailBody(candidateEmail: string, emailMessage:string, testTitle :string): any {  
    return {
      to: candidateEmail,
      subject: 'Invite for the Test', 
       message: emailMessage,    
       testTitle : testTitle 
    };

  }

  sendBulkEmails(candidateEmails: string[], emailMessage:string,testTitle : string): Observable<any> {
    const url = `${this.apiUrl}/sendbulkemails`;

    const candidatesRequests = candidateEmails.map(candidateEmail => this.getCandidateEmailBody(candidateEmail,emailMessage,testTitle));
    console.log(candidatesRequests);

    return this.http.post<any>(url, candidatesRequests,{ responseType: 'text' as 'json' });
  }

  sendIndividualEmail(candidateEmail: string, emailMessage:string): Observable<any> {     
    const url = `${this.apiUrl}/sendemail`;
    const emailBody = {
      to: candidateEmail,
      subject: 'Invite for the Test',
       message: emailMessage,
    
      
     
    };

    // return this.http.post<any>(url, emailBody);
    return this.http.post<any>(url, emailBody, { responseType: 'text' as 'json' });
  }
}
