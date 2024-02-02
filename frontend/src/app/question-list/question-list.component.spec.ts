import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { QuestionListComponent } from './question-list.component';
// Replace 'YourComponent' with the actual name of your component

describe('QuestionListComponent', () => {
  let component: QuestionListComponent;
  let fixture: ComponentFixture<QuestionListComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuestionListComponent],
      imports: [
        FormsModule,
        MatCardModule,
        MatListModule,
        MatInputModule,
        MatButtonModule,
        BrowserAnimationsModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionListComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    // You may need to initialize your component properties or provide mock data here
    // Example: component.questions = yourMockQuestions;
    
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render input elements for title and search', () => {
    const inputElements = debugElement.queryAll(By.css('.search-bar input'));
    expect(inputElements.length).toBe(2); // Assuming two input elements in the search-bar
  });

  it('should render a button for creating', () => {
    const createButton = debugElement.query(By.css('.search-bar button'));
    expect(createButton).toBeTruthy();
  });

  it('should render a card for each question', () => {
    component.questions = [
      { question: 'Question 1', options: ['Option 1', 'Option 2'] },
      { question: 'Question 2', options: ['Option 3', 'Option 4'] },
    ];
    fixture.detectChanges();

    const questionCards = debugElement.queryAll(By.css('.question-card'));
    expect(questionCards.length).toBe(2);
  });

  // it('should call addQuestion method when add-remove-btn is clicked', () => {
  //   spyOn(component, 'addQuestion');
  //   component.questions = [
  //     { question: 'Question 1', options: ['Option 1', 'Option 2'] },
  //   ];
  //   fixture.detectChanges();

  //   const addRemoveButton = debugElement.query(By.css('.add-remove-btn'));
  //   addRemoveButton.triggerEventHandler('click', null);

  //   expect(component.addQuestion).toHaveBeenCalled();
  // });

  // Add more tests as needed for your component's functionality
});
