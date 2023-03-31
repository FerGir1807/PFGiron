import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAlumnosComponent } from './editar-alumnos.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditarAlumnosComponent', () => {
  let component: EditarAlumnosComponent;
  let fixture: ComponentFixture<EditarAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarAlumnosComponent],
      imports: [SharedModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} },
        MatSnackBar,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditarAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
