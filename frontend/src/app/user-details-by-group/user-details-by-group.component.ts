// user-details.component.ts
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ManageGroupService } from '../manage.group.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details-by-group.component.html',
  styleUrls: ['./user-details-by-group.component.scss'],
})
export class UserDetailsByGroupComponent implements OnInit, AfterViewInit {
  userData: any;
  // currentGroupName: string = '';

  constructor(private manageGroupService: ManageGroupService,
    private route: ActivatedRoute) {}
  ngAfterViewInit(): void {
    console.log("hii");
    this.route.queryParams.subscribe(params => {
      // Retrieve the 'groupName' query parameter
      let currentGroupName = params['groupName'];
      console.log("gourp name is");
      console.log(currentGroupName);
      this.manageGroupService.getUserDetails(currentGroupName).subscribe(
        (data) => {
          this.userData = data;
          console.log(this.userData); 
        },
        (error) => {
          console.error("Error fetching user details:", error);
        }
      );
    });
  }

  ngOnInit(): void {
    
  }
}
