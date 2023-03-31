import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { SharedModule } from 'src/app/shared/shared.module';

import { InscripcionesAlumnosComponent } from './inscripciones-alumnos.component';

describe('InscripcionesAlumnosComponent', () => {
  let component: InscripcionesAlumnosComponent;
  let fixture: ComponentFixture<InscripcionesAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InscripcionesAlumnosComponent],
      imports: [
        RouterModule,
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule],
      providers: [CursosService]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InscripcionesAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
