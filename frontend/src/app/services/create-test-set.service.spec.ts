import { TestBed } from '@angular/core/testing';

import { CreateTestSetService } from './create-test-set.service';

describe('CreateTestSetService', () => {
  let service: CreateTestSetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateTestSetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
