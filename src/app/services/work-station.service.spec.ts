import { TestBed } from '@angular/core/testing';

import { WorkStationService } from './work-station.service';

describe('WorkStationService', () => {
  let service: WorkStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
