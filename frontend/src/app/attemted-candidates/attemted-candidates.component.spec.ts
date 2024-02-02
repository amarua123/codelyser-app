import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemtedCandidatesComponent } from './attemted-candidates.component';

describe('AttemtedCandidatesComponent', () => {
  let component: AttemtedCandidatesComponent;
  let fixture: ComponentFixture<AttemtedCandidatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AttemtedCandidatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AttemtedCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
