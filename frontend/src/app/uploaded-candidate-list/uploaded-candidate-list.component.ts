// uploaded-candidate-list.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar'; 
import { CandidateListService } from '../services/uploaded-candidate-list.service';
import { MatDialog } from '@angular/material/dialog';
import { UploadCandidatesComponent } from '../upload-candidates/upload-candidates.component';
import { MatPaginator } from '@angular/material/paginator';
import { EmailMessageComponent } from '../email-message/email-message.component';
import { EmailService } from '../services/email.service';
import { Router } from '@angular/router';
import { CandidateService } from '../services/candidate.service';

interface Candidate {
  serialNo: number;
  candidateEmail: string;
  testSetTitle: string;
  linkSentStatus: boolean;
}

@Component({
  selector: 'app-uploaded-candidate-list',
  templateUrl: './uploaded-candidate-list.component.html',
  styleUrls: ['./uploaded-candidate-list.component.scss'],
})
export class UploadedCandidateListComponent implements OnInit {
  emailMessage:string=' ';
  emailAddresses: string = '';
  testTitle : string = '';
  displayedColumns: string[] = ['candidateEmail','testSetId','linkSentStatus', 'score', 'report'];

  dataSource!: MatTableDataSource<Candidate>;
  filterDataSource!: MatTableDataSource<Candidate>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private snackBar: MatSnackBar,
    private candidateListService: CandidateListService,
    private candidateService: CandidateService,
    public dialog: MatDialog,
    public emailService: EmailService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch data from the backend using the service
    this.candidateListService.getCandidateData().subscribe(
      (candidatesWithDetails) => {
        console.log(candidatesWithDetails);
        const candidates: Candidate[] = candidatesWithDetails.map((candidate, index) => ({
          serialNo: index + 1,
          candidateEmail: candidate.emailAddress,
          // candidateName: candidate.name,
          testSetTitle: candidate.testTitle,
          linkSentStatus: candidate.linkSentStatus,
          score: candidate.score
        }));

        this.dataSource = new MatTableDataSource<Candidate>(candidates);
        this.filterDataSource = new MatTableDataSource<Candidate>(candidates);
        this.dataSource.paginator = this.paginator;
        this.filterDataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching candidates:', error);
      }
    );
  }


  // sendLinkToCandidates(): void {
  //   // You can implement the logic to send links to candidates here
  //   // For demonstration, we'll show a snackbar message
  //   this.snackBar.open('Link sent to all candidates', 'Close', {
  //     duration: 3000,
  //   });
  // }

  applyFilter(filterValue:any): void {
    filterValue = filterValue.value.trim().toLowerCase(); // Convert to lowercase for case-insensitive matching

    if (filterValue === '') {
      // If the filter is empty, show all data
      this.dataSource.filter = '';
    } else {
      // Filter the data array based on the filterValue
      const filteredData = this.dataSource.data.filter(
        (candidate) =>
          candidate.candidateEmail.toLowerCase().includes(filterValue)
      );

      // Update the MatTableDataSource with the filtered data
      this.filterDataSource = new MatTableDataSource<Candidate>(filteredData);
    }

    // Reset the paginator after filtering
    this.filterDataSource.paginator = this.paginator;
  }

  sendLink(candidateEmail: string): void {
    this.emailService.sendIndividualEmail(candidateEmail, this.emailMessage).subscribe(
      (response) => {
        if (response.includes('Email Sent Successfully')) {
          const candidate = this.dataSource.data.find((c) => c.candidateEmail === candidateEmail);
          if (candidate) {
            candidate.linkSentStatus = true;
            this.dataSource._updateChangeSubscription();
          }
          this.snackBar.open('Link sent to the candidate', 'Close', { duration: 3000 });
        } else {
          console.error('Error sending individual email:', response);
          this.snackBar.open('Error sending email. Please try again.', 'Close', { duration: 3000 });
        }  
      },
      (error) => {
        console.error('Error sending individual email:', error);
        this.snackBar.open('Error sending email. Please try again.', 'Close', { duration: 3000 });
      }
    );
  }

  openUploadCandidatesDialog(): void {
    const dialogRef = this.dialog.open(UploadCandidatesComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  // openEmailInviteMessageDialog(){
  //   const dialogRef = this.dialog.open(EmailMessageComponent, {
  //     width: '400px',
  //     data: { emailMessage: this.emailMessage }, // Pass the email message to the dialog
  //   });
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed with result:', result);
  //     if (result) {
  //       // this.emailMessage = result; // Update the email message in the parent component
  //       // this.sendLink(candidateEmail);


  //       this.emailMessage = result.message; // Update the email message in the parent component
  //     const emailAddresses = result.emails.split(',').map(email => email.trim()); // Split and trim emails
  //     this.sendBulkEmails(emailAddresses, this.emailMessage);
  //     }
  //   });

  // }

  openEmailInviteMessageDialog(testTitle : string): void {
    const dialogRef = this.dialog.open(EmailMessageComponent, {
      width: '400px',
      data: { emailAddresses: '', emailMessage: this.emailMessage } // Pass the email addresses and message to the dialog
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result:', result);
      if (result) {
        this.emailAddresses = result.emails; // Update the email addresses in the parent component
        this.emailMessage = result.message; // Update the email message in the parent component
        const emailAddresses = this.emailAddresses.split(',').map((email:string) => email.trim()); 
         // Split and trim emails
         this.testTitle = testTitle;
        this.sendBulkEmails(emailAddresses, this.emailMessage,this.testTitle);
      }
    }); 
  }
  downloadTestReport(candidateEmail: string): void {
    this.candidateService.downloadTestReport(candidateEmail).subscribe(
      (data: any) => {
        // Create a Blob from the response data
        const blob = new Blob([data], { type: 'application/pdf' });

        // Create a temporary link element and trigger a click event to download the file
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `test_report_${candidateEmail}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      error => {
        console.error('Error downloading test report:', error);
        // Handle error (e.g., show an error message)
      }
    );
  }

  
sendBulkEmails(emailAddresses: string[], emailMessage: string, testTitle :string): void {
  this.emailService.sendBulkEmails(emailAddresses, emailMessage,testTitle).subscribe(
    (response) => {
      if (response.includes('Bulk Emails Sent Successfully')) {
        this.snackBar.open('Bulk Emails sent successfully', 'Close', { duration: 3000 });
      } else {
        console.error('Error sending bulk emails:', response);
        this.snackBar.open('Error sending bulk emails. Please try again.', 'Close', { duration: 3000 });
      }
    },
    (error) => {
      console.error('Error sending bulk emails:', error);
      this.snackBar.open('Error sending bulk emails. Please try again.', 'Close', { duration: 3000 });
    }
  );
}
  backButton() :void{
    this.router.navigate(["/available-tests"]);
  }
}


