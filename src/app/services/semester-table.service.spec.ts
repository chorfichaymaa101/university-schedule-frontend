import { TestBed } from '@angular/core/testing';

import { SemesterTableService } from './semester-table.service';

describe('SemesterTableService', () => {
  let service: SemesterTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemesterTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
