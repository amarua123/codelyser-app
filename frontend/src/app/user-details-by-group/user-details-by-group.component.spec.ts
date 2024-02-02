import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsByGroupComponent } from './user-details-by-group.component';

describe('UserDetailsByGroupComponent', () => {
  let component: UserDetailsByGroupComponent;
  let fixture: ComponentFixture<UserDetailsByGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDetailsByGroupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserDetailsByGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
