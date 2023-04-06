import { TestBed } from '@angular/core/testing';

import { SesionGuard } from './sesion.guard';
import { StoreModule } from '@ngrx/store';

describe('SesionGuard', () => {
  let guard: SesionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [StoreModule.forRoot({})], });
    guard = TestBed.inject(SesionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
