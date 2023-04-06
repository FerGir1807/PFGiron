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
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AlumnosEffects } from '../alumnos/state/alumnos-state.effects';
import { alumnosStateFeatureKey, alumnoReducer } from '../alumnos/state/alumnos-state.reducer';
import { CursosEffects } from '../cursos/state/curso-state.effects';
import { cursoStateFeatureKey, cursoReducer } from '../cursos/state/curso-state.reducer';
import { ProfesoresEffects } from '../profesores/state/profesores-state.effects';
import { profesoresStateFeatureKey, reducer } from '../profesores/state/profesores-state.reducer';
import { UsuariosEffects } from '../usuarios/state/usuarios-state.effects';
import { usuariosStateFeatureKey } from '../usuarios/state/usuarios-state.reducer';

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
    MatProgressSpinnerModule,
    StoreModule.forFeature(alumnosStateFeatureKey, alumnoReducer),
    EffectsModule.forFeature([AlumnosEffects]),
    StoreModule.forFeature(cursoStateFeatureKey, cursoReducer),
    EffectsModule.forFeature([CursosEffects]),
    StoreModule.forFeature(profesoresStateFeatureKey, reducer),
    EffectsModule.forFeature([ProfesoresEffects]),
    StoreModule.forFeature(usuariosStateFeatureKey, reducer),
    EffectsModule.forFeature([UsuariosEffects])
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
    MatProgressSpinnerModule,
  ]
})
export class SharedModule { }
