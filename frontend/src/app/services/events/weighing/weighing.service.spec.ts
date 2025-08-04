import { TestBed } from '@angular/core/testing';

import { WeighingService } from './weighing.service';

describe('WeighingService', () => {
  let service: WeighingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeighingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
