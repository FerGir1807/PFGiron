import { TestBed } from '@angular/core/testing';

import { CursosService } from './cursos.service';
import { HttpClientModule } from '@angular/common/http';

describe('CursosService', () => {
  let service: CursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(CursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
