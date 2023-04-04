import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstatusDirective } from './directives/estatus.directive';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule } from '@angular/common/http';
import { NombreUsuarioPipe } from './pipes/nombre-usuario.pipe';
import { NombreProfesorPipe } from './pipes/nombre-profesor.pipe';
import { NombreAlumnoPipe } from './pipes/nombre-alumno.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    EstatusDirective,
    NombreAlumnoPipe,
    NombreProfesorPipe,
    NombreUsuarioPipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    MatProgressSpinnerModule
  ],
  exports: [
    EstatusDirective,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    NombreAlumnoPipe,
    NombreProfesorPipe,
    NombreUsuarioPipe,
    MatProgressSpinnerModule
  ]
})
export class SharedModule { }
