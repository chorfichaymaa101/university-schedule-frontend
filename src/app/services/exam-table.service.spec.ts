import { TestBed } from '@angular/core/testing';

import { ExamTableService } from './exam-table.service';

describe('ExamTableService', () => {
  let service: ExamTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExamTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
