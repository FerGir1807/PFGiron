import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAlumnosComponent } from './agregar-alumnos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AgregarAlumnosComponent', () => {
  let component: AgregarAlumnosComponent;
  let fixture: ComponentFixture<AgregarAlumnosComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarAlumnosComponent],
      imports: [
        MatDialogModule,
        HttpClientModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSlideToggleModule,
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule],
      providers: []
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgregarAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se crea el componente AgregarAlumnosComponent correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Se validan datos correctos para agregar un nuevo alumno', () => {

    component.formularioRegistroAlumno.controls["nombre"].setValue("Fernando");
    component.formularioRegistroAlumno.controls["segundoNombre"].setValue("");
    component.formularioRegistroAlumno.controls["primerApellido"].setValue("Giron");
    component.formularioRegistroAlumno.controls["segundoApellido"].setValue("Rubio");
    component.formularioRegistroAlumno.controls["edad"].setValue(32);
    component.formularioRegistroAlumno.controls["genero"].setValue("M");
    component.formularioRegistroAlumno.controls["estatus"].setValue(true);

    expect(component.formularioRegistroAlumno.valid).toBeTrue();

  });

  it('Se validan datos incorrectos para agregar un nuevo alumno', () => {

    component.formularioRegistroAlumno.controls["nombre"].setValue("Fernando*/-");
    component.formularioRegistroAlumno.controls["segundoNombre"].setValue("//*-");
    component.formularioRegistroAlumno.controls["primerApellido"].setValue("");
    component.formularioRegistroAlumno.controls["segundoApellido"].setValue("Rubio...");
    component.formularioRegistroAlumno.controls["edad"].setValue(999);
    component.formularioRegistroAlumno.controls["genero"].setValue("M");
    component.formularioRegistroAlumno.controls["estatus"].setValue(true);

    expect(component.formularioRegistroAlumno.valid).toBeFalse();

  });
});
