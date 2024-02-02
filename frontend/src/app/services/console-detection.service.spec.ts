import { TestBed } from '@angular/core/testing';

import { ConsoleDetectionService } from './console-detection.service';

describe('ConsoleDetectionService', () => {
  let service: ConsoleDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsoleDetectionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
