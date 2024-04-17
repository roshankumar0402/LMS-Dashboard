import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { logcheckGuard } from './logcheck.guard';

describe('logcheckGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => logcheckGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
