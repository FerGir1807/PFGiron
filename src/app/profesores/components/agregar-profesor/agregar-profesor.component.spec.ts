import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProfesorComponent } from './agregar-profesor.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AgregarProfesorComponent', () => {
  let component: AgregarProfesorComponent;
  let fixture: ComponentFixture<AgregarProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarProfesorComponent],
      imports: [
        MatDialogModule,
        HttpClientModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSlideToggleModule,
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [MatSnackBar]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgregarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se crea el componente AgregarProfesorComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Se validan datos correctos para agregar un nuevo profesor', () => {

    component.formularioRegistroProfesor.controls["nombre"].setValue("Fernando");
    component.formularioRegistroProfesor.controls["segundoNombre"].setValue("");
    component.formularioRegistroProfesor.controls["primerApellido"].setValue("Giron");
    component.formularioRegistroProfesor.controls["segundoApellido"].setValue("Rubio");
    component.formularioRegistroProfesor.controls["edad"].setValue(32);
    component.formularioRegistroProfesor.controls["genero"].setValue("M");
    component.formularioRegistroProfesor.controls["estatus"].setValue(true);

    expect(component.formularioRegistroProfesor.valid).toBeTrue();
  });

  it('Se validan datos incorrectos para agregar un nuevo profesor', () => {

    component.formularioRegistroProfesor.controls["nombre"].setValue("Fernando*/-");
    component.formularioRegistroProfesor.controls["segundoNombre"].setValue("//*-");
    component.formularioRegistroProfesor.controls["primerApellido"].setValue("");
    component.formularioRegistroProfesor.controls["segundoApellido"].setValue("Rubio...");
    component.formularioRegistroProfesor.controls["edad"].setValue(999);
    component.formularioRegistroProfesor.controls["genero"].setValue("M");
    component.formularioRegistroProfesor.controls["estatus"].setValue(true);
    expect(component.formularioRegistroProfesor.valid).toBeFalse();

  });
});
