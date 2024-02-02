import { Component, ViewChild } from '@angular/core';
import { CandidateService } from '../services/candidate.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Candidate } from '../model/Candidate';
import { ActivatedRoute, Router } from '@angular/router';
import { TestService } from '../services/test.service';
export interface PeriodicElement {
  // name: string;
  // position: number;
  // weight: number;
  // symbol: string;
  sno: number;
  name: string;
  email: string;
  score: number;
  testReport: string;
}

@Component({
  selector: 'app-attemted-candidates',
  templateUrl: './attemted-candidates.component.html',
  styleUrl: './attemted-candidates.component.scss'
})


export class AttemtedCandidatesComponent {
  displayedColumns: string[] = ['sno', 'name', 'email', 'score', 'testReport'];
  testTitle: string = '';
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  //  dataSource!: MatTableDataSource<Candidate>;
  // filterDataSource!: MatTableDataSource<Candidate>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }


  constructor(
    private candidateService: CandidateService,
    private route: ActivatedRoute,
    private testService: TestService,
    private router: Router) { }
  // downloadReport(candidate: any): void {
  //   // Implement download logic here using candidate data
  //   // console.log('Downloading report for:', candidate.name);
  //   // Add your download logic here, e.g., open a new window, initiate a download, etc.
  // }
  // candidateEmail = "amar@gmail.com"

  ngOnInit(): void {

    this.route.queryParams.subscribe((params) => {
      this.testTitle = params['testTitle'];

      this.fetchDetails(this.testTitle);
    });
  }

  // fetchDetails(testTitle: string): void {
  //   this.testService.getTestDetails(testTitle).subscribe(
  //     (data) => {

  //       console.log('Test details:', data);
  //     },
  //     (error) => {
  //       console.error('Error fetching test details', error);
  //     }
  //   );
  // }

  fetchDetails(testTitle: string): void {
    this.testService.getTestDetails(testTitle).subscribe(
      (data: any[]) => { 
        this.dataSource.data = data.map((item, index) => ({
          sno: index + 1,
          name: item.name,
          email: item.emailAddress,
        
          score: item.score,
          testReport: ''
        }));
      },
      (error) => {
        console.error('Error fetching test details', error);
      }
    );
  }
  downloadUserDetailsPDF() {
    // this.userService.downloadUserDetailsPDF(this.username).subscribe(
    //   data => {
    //     this.downloadFile(data, `user_details_${this.username}.pdf`);
    //   },
    //   error => {
    //     console.error('Error downloading PDF:', error);
    //   }
    // );
  }
  private downloadFile(data: any, filename: string) {
    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }



  // applyFilter(event: Event) {
  //   if (event && (event as any).target) {
  //     const filterValue = ((event as any).target as HTMLInputElement).value.trim().toLowerCase();


  //     // Split the filterValue into keywords
  //     const keywords = filterValue.split(' ');

  //     // Use filter predicate to check if any of the keywords match name or email
  //     this.dataSource.filter = JSON.stringify(keywords.reduce((acc, keyword) => {
  //       return acc.filter(candidate => candidate.name.toLowerCase().includes(keyword) || candidate.email.toLowerCase().includes(keyword));
  //     }, this.dataSource.data));
  //   }
  // }

  applyFilter(event: Event) {
    if (event && (event as any).target) {
      const filterValue = ((event as any).target as HTMLInputElement).value.trim().toLowerCase();

      // Split the filterValue into keywords
      const keywords = filterValue.split(' ');

      // Use filter predicate to check if any of the keywords match name or email
      this.dataSource.filter = keywords.join(' ');

      // Manually trigger the filter event
      this.dataSource.filter = filterValue;
    }
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
  backButton() :void{
    this.router.navigate(["/available-tests"]);
  }
}
