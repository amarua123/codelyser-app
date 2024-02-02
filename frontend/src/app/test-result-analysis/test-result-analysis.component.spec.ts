import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestResultAnalysisComponent } from './test-result-analysis.component';

describe('TestResultAnalysisComponent', () => {
  let component: TestResultAnalysisComponent;
  let fixture: ComponentFixture<TestResultAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestResultAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestResultAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
