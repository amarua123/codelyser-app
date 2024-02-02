import { TestService } from '../services/test.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CreateTestSetService } from '../services/create-test-set.service';
import { MatDialog } from '@angular/material/dialog';
import { QuestionDialogComponent } from '../question-dialog/question-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Clipboard } from '@angular/cdk/clipboard';
import { EmailMessageComponent } from '../email-message/email-message.component';
import { EmailService } from '../services/email.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Test {
  id: number 
  title: string;
  published: boolean;
}
@Component({
  selector: 'app-available-tests',
  templateUrl: './available-tests.component.html',
  styleUrl: './available-tests.component.scss'
})
export class AvailableTestsComponent implements OnInit {
  dataSource: MatTableDataSource<Test> = new MatTableDataSource<Test>([]);
  filterDataSource: MatTableDataSource<Test> = new MatTableDataSource<Test>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  searchQuery: string = '';
  emailMessage:string=' ';
  emailAddresses: string = '';
  defaultEmailMessage: string = 'Dear Candidate,\n\nPlease read instructions carefully before starting test.\nTest Link:http://localhost:4200/instruction-stepper \n\nAll the best\nAccolite X Bounteous'; 
  testTitle : string = '';
  
  constructor(private testService: TestService,private router: Router,private createTestSetService:CreateTestSetService,private dialog: MatDialog,private clipboard: Clipboard ,
    private emailService:EmailService,private snackBar: MatSnackBar ) {}
  
  ngOnInit(): void {
    this.createTestSetService.getTestTitles().subscribe(
      (response: any[]) => {
        console.log(response)
        const tests: Test[] = response.map(test =>({
          id: test.testSetId,
          title: test.testSetTitle,
          published: true,
        }));
        this.dataSource = new MatTableDataSource<Test>(tests);
        this.filterDataSource = new MatTableDataSource<Test>(tests);
        this.dataSource.paginator = this.paginator;
        this.filterDataSource.paginator = this.paginator;
      },
      (error) => {
        console.error('Error fetching test titles', error);
      }
    );
   }

  filterTests(): void {
    const filterValue = this.searchQuery.trim().toLocaleLowerCase();
    if (filterValue === '') {
      this.dataSource.filter = '';
    } else {
      const filteredTests = this.dataSource.data.filter(test =>
        test.title.toLowerCase().includes(filterValue)
      );
      this.filterDataSource = new MatTableDataSource<Test>(filteredTests);
    }

    this.filterDataSource.paginator = this.paginator;
  }

  toggleStatus(test: any): void {
    test.status = test.status === 'live' ? 'inactive' : 'live';
  }

  editTest(test: any): void {
    // Implement edit functionality
    console.log('Edit test:', test);
  }

  copyLink(test: any): void {
    // Implement copy link functionality
    const copiedLink = 'https://localhost:4200/instruction-stepper'; // Replace with your actual link
    this.clipboard.copy(copiedLink);
    // console.log('Link copied:', copiedLink);
  }
  resultAnalysis(testTitle: string): void {
    this.router.navigate(['/test-result-analysis'], { queryParams: { title: testTitle } });
  }

  // viewQuestions(test: any): void {
  //   // Implement view questions functionality
  //   console.log('View questions for test:', test);
  //   this.router.navigate(['/']);
  // }

  // sendResult(test: any): void {
  //   // Implement send link functionality
  //   console.log('Send link for test:', test);
  //   this.router.navigate(['/attemted-candidates']);
  // }

  // sendLink(test:any):void{
  //    this.router.navigate(["/uploaded-candidate-list"]); 
  // } 

  openEmailInviteMessageDialog(title :string): void {
    const dialogRef = this.dialog.open(EmailMessageComponent, {
    
      width: '400px',
      data: { emailAddresses: '', emailMessage: this.defaultEmailMessage } // Pass the email addresses and message to the dialog
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed with result:', result);
      if (result) {
        this.emailAddresses = result.emails; // Update the email addresses in the parent component
        this.emailMessage = result.message; // Update the email message in the parent component
        this.testTitle = title;
        const emailAddresses = this.emailAddresses.split('\n').map(email => email.trim()); // Split and trim emails
        this.sendBulkEmails(emailAddresses, this.emailMessage,this.testTitle);
      }
    }); 
  }
  sendBulkEmails(emailAddresses: string[], emailMessage: string,testTitle:string): void {
    this.emailService.sendBulkEmails(emailAddresses, emailMessage,this.testTitle).subscribe(
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
    this.router.navigate(["/uploaded-candidate-list"]);
  }

  navigateToResults(title: string): void {
    this.router.navigate(['/attemted-candidates'], { queryParams: { testTitle: title } });
  }
 
  candidatesList():void{
    this.router.navigate(["/question-list"]);
  }
  viewQuestions(test: any): void {
    const testTitle = test.title;

    this.createTestSetService.getQuestionDescriptionsByTitle(testTitle).subscribe(
      (descriptions: any[]) => {
        this.openDialog(descriptions.map(test=>(test.description)));
        console.log(descriptions);
        
      },
      (error) => {
        console.error('Error fetching question descriptions', error);
      }
    );
  }

  openDialog(descriptions: string[]): void {
    const dialogRef = this.dialog.open(QuestionDialogComponent, {
      width: '500px',
      data: { descriptions: descriptions }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
