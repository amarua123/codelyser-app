import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCandidatesComponent } from './upload-candidates.component';

describe('UploadCandidatesComponent', () => {
  let component: UploadCandidatesComponent;
  let fixture: ComponentFixture<UploadCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadCandidatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
