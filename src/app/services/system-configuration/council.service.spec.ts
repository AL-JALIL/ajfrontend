import { TestBed } from '@angular/core/testing';

import { CouncilService } from './council.service';

describe('CouncilService', () => {
  let service: CouncilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouncilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
