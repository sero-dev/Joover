import { TestBed } from '@angular/core/testing';

import { LightConfigApiService } from './light-config-api.service';

describe('LightConfigApiService', () => {
  let service: LightConfigApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightConfigApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
