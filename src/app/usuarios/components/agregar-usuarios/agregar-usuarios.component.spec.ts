import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarUsuariosComponent } from './agregar-usuarios.component';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';

describe('AgregarUsuariosComponent', () => {
  let component: AgregarUsuariosComponent;
  let fixture: ComponentFixture<AgregarUsuariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgregarUsuariosComponent],
      imports: [MatDialogModule,
        HttpClientModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSlideToggleModule,
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}), EffectsModule.forRoot([])],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AgregarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Se crea el componente should AgregarUsuariosComponent', () => {
    expect(component).toBeTruthy();
  });

  it('Se validan datos correctos para agregar un nuevo profesor', () => {

    component.formularioRegistroUsuario.controls["nombre"].setValue("Fernando");
    component.formularioRegistroUsuario.controls["segundoNombre"].setValue("");
    component.formularioRegistroUsuario.controls["primerApellido"].setValue("Giron");
    component.formularioRegistroUsuario.controls["segundoApellido"].setValue("Rubio");
    component.formularioRegistroUsuario.controls["email"].setValue("f.gir.07@hotmail.com");
    component.formularioRegistroUsuario.controls["password"].setValue("password");
    component.formularioRegistroUsuario.controls["tipo"].setValue("admin");

    expect(component.formularioRegistroUsuario.valid).toBeTrue();
  });

  it('Se validan datos incorrectos para agregar un nuevo profesor', () => {

    component.formularioRegistroUsuario.controls["nombre"].setValue("Fernando*/-");
    component.formularioRegistroUsuario.controls["segundoNombre"].setValue("//*-");
    component.formularioRegistroUsuario.controls["primerApellido"].setValue("");
    component.formularioRegistroUsuario.controls["segundoApellido"].setValue("Rubio...");
    component.formularioRegistroUsuario.controls["email"].setValue("f.gir.07hotmail.com");
    component.formularioRegistroUsuario.controls["password"].setValue("");
    component.formularioRegistroUsuario.controls["tipo"].setValue("tipo");
    expect(component.formularioRegistroUsuario.valid).toBeFalse();

  });
});
