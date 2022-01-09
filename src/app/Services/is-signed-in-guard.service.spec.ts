import { TestBed } from '@angular/core/testing';

import { IsSignedInGuardService } from './is-signed-in-guard.service';

describe('IsSignedInGuardService', () => {
  let service: IsSignedInGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsSignedInGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
