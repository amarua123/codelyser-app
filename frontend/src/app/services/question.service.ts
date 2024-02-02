import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

interface Question{
  description: string;
  descriptionWithCode:string;
  options: string[];
  answers: string[];
  questionType: string;
}
@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  constructor(private http: HttpClient, private cookieService: CookieService) { }
  private apiUrl = 'http://localhost:8080/question';
  private questions: any[] = [];
  // private emailKey = 'email';
  // getQuestions(): Observable<any[]> {
  //   return this.http.get<any>(`${this.apiUrl}/get-all-questions`);
  // }
  getQuestions(): Observable<any> {
    const authToken = localStorage.getItem('authToken');
console.log(authToken);
if (authToken) {
  const header = new HttpHeaders()
    .set('Content-type', 'application/json')
    .set('Authorization', `Bearer ${authToken}`); // Corrected to use 'authToken'
  return this.http.get(
    `${this.apiUrl}/get-all-questions`,
    { headers: header }
  );
}
    else {
      console.log("Invalid");
      return of([]);
    }
  }


  createQuestion(data: Question): Observable<any[]>{
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/createQuestion`, data, { headers, responseType: 'text' as 'json' });
  }
  setEmail(email: string): void {
    this.cookieService.set('email', email, { expires: 1 });
  }
  // Get the email from local storage
  getEmail(): string | null {
    return this.cookieService.get('email');
  }
  setStartTime(time: string){
    this.cookieService.set('startTime', time, { expires: 1 });
  }
  getStartTime(){
    return this.cookieService.get('startTime');
  }
  getTotalQuestions(): number {
    return this.questions.length;
  }
  getSetsQuestions(): Observable<any[]> {
    const email = this.getEmail();
    return this.http.get<any>(`${this.apiUrl}/get-sets-question?email=${email}`)
  }

  sendAnswers(submissionData: any, finishTime: string) {
    const email = this.getEmail();
    const startTime = this.getStartTime();
    console.log(submissionData);
    const payload = {
      email: email,
      answers: submissionData.answers,
      questionIds: submissionData.questionIds,
      startTime: startTime,
      finishTime: finishTime
    };
    console.log(payload)
    this.cookieService.delete('email');
    this.cookieService.delete('startTime');
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/submit-answers`, payload, { headers, responseType: 'text' as 'json' });
  }

}
