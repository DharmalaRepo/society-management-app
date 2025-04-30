import { TestBed } from '@angular/core/testing';

import { SocietyConfigService } from './society-config.service';

describe('SocietyConfigService', () => {
  let service: SocietyConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocietyConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
