import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadedCandidateListComponent } from './uploaded-candidate-list.component';

describe('UploadedCandidateListComponent', () => {
  let component: UploadedCandidateListComponent;
  let fixture: ComponentFixture<UploadedCandidateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadedCandidateListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadedCandidateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
