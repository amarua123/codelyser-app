// your-component.component.ts

import { Component } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent {
  displayedColumns: string[] = ['sno', 'name', 'email', 'score', 'testReport'];

  dataSource = [
    { sno: 1, name: 'John Doe', email: 'john.doe@example.com', score: 90, testReport: 'Pass' },
    { sno: 2, name: 'Jane Doe ', email: 'jane.doe@example.com', score: 85, testReport: 'Pass' }
    
  ];

  downloadReport(candidate: any): void {
    // Implement download logic here using candidate data
    console.log('Downloading report for:', candidate.name);
    // Add your download logic here, e.g., open a new window, initiate a download, etc.
  }
}
