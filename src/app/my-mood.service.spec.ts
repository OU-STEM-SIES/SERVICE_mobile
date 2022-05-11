import { TestBed } from '@angular/core/testing';

import { MyMoodService } from './my-mood.service';

describe('MyMoodService', () => {
  let service: MyMoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MyMoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
