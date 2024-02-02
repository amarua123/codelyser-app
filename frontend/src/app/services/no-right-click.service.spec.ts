import { TestBed } from '@angular/core/testing';

import { NoRightClickService } from './no-right-click.service';

describe('NoRightClickService', () => {
  let service: NoRightClickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoRightClickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
