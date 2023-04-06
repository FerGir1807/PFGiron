import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarCursosComponent } from './editar-cursos.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { HttpClientModule } from '@angular/common/http';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

describe('EditarCursosComponent', () => {
  let component: EditarCursosComponent;
  let fixture: ComponentFixture<EditarCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarCursosComponent],
      imports: [
        HttpClientModule,
        MatDatepickerModule,
        MatNativeDateModule,
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [
        {
          provide: MAT_DIALOG_DATA, useValue: {
            id: "",
            nombre: "",
            fechaInicio: "",
            fechaFin: "",
            estatus: "",
            cupo: "",
            profesor: ""
          }
        },
        { provide: MatDialogRef, useValue: {} },
        CursosService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditarCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
