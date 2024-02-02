import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class ManageGroupService {
  // currentGroupname:string = "";
  private apiUrl="http://localhost:8080/groupsUsers";
  private apiUrl3 = 'http://localhost:8080/addUser';
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  addUserToGroup(groupName:string, email:string) {
      let url = `${this.apiUrl3}/${groupName}/${email}`;
     
      return this.http.post(url, null).subscribe(() =>{
      }); 
  }

  getUserDetails(groupName:string) {
     let url = `${this.apiUrl}/${groupName}`;
    
    return this.http.get(url); 
  }
}
  




