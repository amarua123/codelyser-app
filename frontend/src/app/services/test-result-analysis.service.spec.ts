import { TestBed } from '@angular/core/testing';

import { TestResultAnalysisService } from './test-result-analysis.service';

describe('TestResultAnalysisService', () => {
  let service: TestResultAnalysisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TestResultAnalysisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
