import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntructionStepperComponent } from './intruction-stepper.component';

describe('IntructionStepperComponent', () => {
  let component: IntructionStepperComponent;
  let fixture: ComponentFixture<IntructionStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IntructionStepperComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntructionStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
