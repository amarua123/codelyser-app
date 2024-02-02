import { TestBed } from '@angular/core/testing';

import { ManageGroupService } from './manage.group.service';

describe('ManageGroupService', () => {
  let service: ManageGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManageGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
