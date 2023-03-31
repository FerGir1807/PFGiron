import { TestBed } from '@angular/core/testing';

import { AlumnosService } from './alumnos.service';
import { HttpClientModule } from '@angular/common/http';

describe('AlumnosService', () => {
  let service: AlumnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [],
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AlumnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
