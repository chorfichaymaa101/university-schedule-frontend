import { TestBed } from '@angular/core/testing';

import { SessionExamService } from './session-exam.service';

describe('SessionExamService', () => {
  let service: SessionExamService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionExamService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
