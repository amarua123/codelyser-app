import { TestBed } from '@angular/core/testing';

import { CandidateListService } from './uploaded-candidate-list.service';

describe('UploadedCandidateListService', () => {
  let service: CandidateListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CandidateListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
