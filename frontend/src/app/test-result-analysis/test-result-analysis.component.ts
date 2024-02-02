import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { TestResultAnalysisService } from '../services/test-result-analysis.service';
import { Subscription } from 'rxjs'; 
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-test-result-analysis',
  templateUrl: './test-result-analysis.component.html',
  styleUrls: ['./test-result-analysis.component.scss'],
})
export class TestResultAnalysisComponent implements OnInit, OnDestroy {
  barChart: any;
  searchInput: string = '';
  testResults: number[] = [];
  isLoading: boolean = false;
  private subscription: Subscription | undefined;

  constructor(private testResultAnalysisService: TestResultAnalysisService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchInput = params['title'];
      this.fetchDataAndInitializeChart();
    });
  }

  ngOnDestroy() {
    // Unsubscribe to avoid memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  fetchDataAndInitializeChart() {
    // Fetch data from the backend
    this.subscription = this.testResultAnalysisService.getScoresByTestSetTitle(this.searchInput).subscribe(
      (scores: number[]) => {
        this.testResults = scores;
        this.initializeBarChart();
      },
      (error) => {
        console.error('Error fetching scores:', error);
      }
    );
  }

  getRandomColor():any {
    let getRandomValue = () => 50 + Math.floor(Math.random() * 200);
    let r = 100;
    let g = getRandomValue();
    let b = getRandomValue();
    // let alpha = Math.random().toFixed(1); // Generates a random alpha value between 0 and 1 with one decimal place
    let alpha = 0.7;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  initializeBarChart() {
    // Extract maximum marks and maximum number of students from the data
    const maxMarks = Math.max(...this.testResults);
    const maxStudents = Math.max(...this.testResults);
  
    // Define intervals based on the maximum marks
    let markInterval: number;
    if (maxMarks <= 10) {
      markInterval = 1;
    } else if (maxMarks <= 50) {
      markInterval = 5;
    } else if (maxMarks <= 100) {
      markInterval = 10;
    } else {
      markInterval = 20;
    }
  
    // Define intervals based on the maximum number of students
    let studentInterval: number;
    if (maxStudents <= 10) {
      studentInterval = 1;
    } else if (maxStudents <= 50) {
      studentInterval = 2;
    } else if (maxStudents <= 100) {
      studentInterval = 5;
    } else {
      studentInterval = 10;
    }
  
    // Calculate intervals based on the determined intervals
    const markIntervals = Array.from({ length: Math.ceil(maxMarks / markInterval) + 1 }, (_, i) => i * markInterval);
    const studentIntervals = Array.from({ length: Math.ceil(maxStudents / studentInterval) + 1 }, (_, i) => i * studentInterval);
  
    // Update this part to fetch data from the backend
    this.testResultAnalysisService.getScoresByTestSetTitle(this.searchInput).subscribe(
      (scores: number[]) => {
        this.testResults = scores; // Update the testResults array with the fetched data
  
        // Use the scores data to update your chart
        const data = markIntervals.map((start) => {
          const end = start + markInterval;
          const studentsInInterval = this.testResults.filter(score => score >= start && score < end);
          return studentsInInterval.length;
        });

        const backgroundColors = data.map(() => this.getRandomColor());
  
        // Create bar chart
        const ctx = document.getElementById('barChart') as HTMLCanvasElement;
        if (this.barChart) {
          this.barChart.destroy(); // Destroy existing chart before creating a new one
        }
  
        this.barChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: markIntervals.map(start => `${start}-${start + markInterval}`),
            datasets: [{
              label: 'Number of Students',
              data: data,
              backgroundColor: backgroundColors,
            }]
          },
          options: {
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Marks Intervals'
                }
              },
              y: {
                title: {
                  display: true,
                  text: 'Number of Students'
                },
                ticks: {
                  stepSize: studentInterval, // Set the step size for the number of students
                }
              }
            },
            plugins: {
              legend: {
                display: true,
              },
            },
            layout: {
              padding: {
                left: 10,
                right: 10,
                top: 0,
                bottom: 10,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
          }
        });
      },
      (error) => {
        console.error('Error fetching scores:', error);
      }
    );
  }
  

  search() {
    console.log('Search input:', this.searchInput);
    this.fetchDataAndInitializeChart();
  }

  goBack() {
    this.router.navigate(['/available-tests']); // Replace '/previous-component' with the route path you want to navigate back to
  }
}
