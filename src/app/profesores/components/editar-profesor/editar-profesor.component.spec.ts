import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarProfesorComponent } from './editar-profesor.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('EditarProfesorComponent', () => {
  let component: EditarProfesorComponent;
  let fixture: ComponentFixture<EditarProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarProfesorComponent],
      imports: [SharedModule, ReactiveFormsModule, BrowserAnimationsModule, StoreModule.forRoot({}), EffectsModule.forRoot([])],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        MatSnackBar,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditarProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
