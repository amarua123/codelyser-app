import { TestBed } from '@angular/core/testing';
import { ListOfGroupService } from './list-of-group.service';

describe('ListOfGroupService', () => {
  let service: ListOfGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListOfGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
