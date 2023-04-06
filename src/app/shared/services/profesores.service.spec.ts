import { TestBed } from '@angular/core/testing';

import { ProfesoresService } from './profesores.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProfesoresService', () => {
  let service: ProfesoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(ProfesoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
