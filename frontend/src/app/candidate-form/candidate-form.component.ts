import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CandidateService } from '../services/candidate.service';
import { Candidate } from '../model/Candidate';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrl: './candidate-form.component.scss'
})
export class CandidateFormComponent {
  candidate: Candidate = { name: '', email: '', phoneNo: '' };

//  @Input()
//  experience!:number;
// candidateForm= true;
constructor(private candidateService: CandidateService) {}
 

  onSubmit() {
    console.log('submitted', this.candidate);
    //  this.candidateForm=false;

    this.candidateService.createCandidate(this.candidate).subscribe(
      response => {
        console.log('Candidate created successfully:', response);
        // this.candidateService.onSubmit();
        // Handle success (e.g., show a success message)
      },
      error => {
        console.error('Error creating candidate:', error);
        // Handle error (e.g., show an error message)
      })
  }

  
}