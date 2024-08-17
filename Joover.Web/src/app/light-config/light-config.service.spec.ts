import { TestBed } from '@angular/core/testing';

import { LightConfigService } from './light-config.service';

describe('LightConfigService', () => {
  let service: LightConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LightConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
