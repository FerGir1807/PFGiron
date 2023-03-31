import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { HttpClientModule } from '@angular/common/http';
import { AgregarCursosComponent } from './agregar-cursos.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from 'src/app/shared/shared.module';

describe('Test para AgregarCursosComponent', () => {
  let component: AgregarCursosComponent;
  let fixture: ComponentFixture<AgregarCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarCursosComponent],
      providers: [CursosService, MatSnackBar],
      imports: [HttpClientModule,
        MatDatepickerModule,
        MatNativeDateModule,
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgregarCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se crea el componente AgregarCursosComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Se validan datos correctos para agregar un nuevo curso', () => {

    const nombre = component.formularioAgregarCurso.controls["nombre"].setValue("Fernando");
    const cupo = component.formularioAgregarCurso.controls["cupo"].setValue(9);
    const estatus = component.formularioAgregarCurso.controls["estatus"].setValue(true);
    const fechaInicio = component.formularioAgregarCurso.controls["fechaInicio"].setValue(new Date("2023-01-01"));
    const fechaFin = component.formularioAgregarCurso.controls["fechaFin"].setValue(new Date("2023-03-03"));
    const profesor = component.formularioAgregarCurso.controls["profesor"].setValue("Profesor Curso");

    expect(component.formularioAgregarCurso.valid).toBeTrue();

  });

  it('Se validan datos incorrectos para agregar un nuevo curso', () => {

    const nombre = component.formularioAgregarCurso.controls["nombre"].setValue("");
    const cupo = component.formularioAgregarCurso.controls["cupo"].setValue(9);
    const estatus = component.formularioAgregarCurso.controls["estatus"].setValue(true);
    const fechaInicio = component.formularioAgregarCurso.controls["fechaInicio"].setValue(new Date("2023-01-01"));
    const fechaFin = component.formularioAgregarCurso.controls["fechaFin"].setValue(new Date("2022-03-03"));
    const profesor = component.formularioAgregarCurso.controls["profesor"].setValue("Profesor Curso");

    expect(component.formularioAgregarCurso.valid).toBeFalse();

  });
});
