import { TestBed } from '@angular/core/testing';

import { AdminGuard } from './admin.guard';
import { StoreModule } from '@ngrx/store';

describe('AdminGuard', () => {
  let guard: AdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [StoreModule.forRoot({})], });
    guard = TestBed.inject(AdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
