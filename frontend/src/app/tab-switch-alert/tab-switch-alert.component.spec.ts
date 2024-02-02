import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSwitchAlertComponent } from './tab-switch-alert.component';

describe('TabSwitchAlertComponent', () => {
  let component: TabSwitchAlertComponent;
  let fixture: ComponentFixture<TabSwitchAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TabSwitchAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TabSwitchAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
