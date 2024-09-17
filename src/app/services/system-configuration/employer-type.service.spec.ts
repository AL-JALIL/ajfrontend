import { TestBed } from '@angular/core/testing';

import { EmployerTypeService } from './employer-type.service';

describe('EmployerTypeService', () => {
  let service: EmployerTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployerTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
