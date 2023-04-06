import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInscripcionAlumnoComponent } from './editar-inscripcion-alumno.component';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

describe('EditarInscripcionAlumnoComponent', () => {
  let component: EditarInscripcionAlumnoComponent;
  let fixture: ComponentFixture<EditarInscripcionAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarInscripcionAlumnoComponent],
      imports: [
        HttpClientModule,
        SharedModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        DragDropModule,
        StoreModule.forRoot({}), 
        EffectsModule.forRoot([])
      ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        CursosService
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditarInscripcionAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
