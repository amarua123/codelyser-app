import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestEndingMessageComponent } from './test-ending-message.component';

describe('TestEndingMessageComponent', () => {
  let component: TestEndingMessageComponent;
  let fixture: ComponentFixture<TestEndingMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestEndingMessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestEndingMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
