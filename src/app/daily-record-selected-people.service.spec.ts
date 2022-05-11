import { TestBed } from '@angular/core/testing';

import { DailyRecordSelectedPeopleService } from './daily-record-selected-people.service';

describe('DailyRecordSelectedPeopleService', () => {
  let service: DailyRecordSelectedPeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DailyRecordSelectedPeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
