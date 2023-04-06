import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionesAlumnosComponent } from './components/inscripciones-alumnos/inscripciones-alumnos.component';
import { AlumnosService } from '../shared/services/alumnos.service';
import { CursosService } from '../shared/services/cursos.service';
import { SharedModule } from '../shared/shared.module';
import { EditarInscripcionAlumnoComponent } from './components/editar-inscripcion-alumno/editar-inscripcion-alumno.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { StoreModule } from '@ngrx/store';
import { alumnosStateFeatureKey, alumnoReducer } from '../alumnos/state/alumnos-state.reducer';
import { AlumnosEffects } from '../alumnos/state/alumnos-state.effects';
import { cursoStateFeatureKey, cursoReducer } from '../cursos/state/curso-state.reducer';
import { EffectsModule } from '@ngrx/effects';
import { CursosEffects } from '../cursos/state/curso-state.effects';


@NgModule({
  declarations: [
    InscripcionesAlumnosComponent,
    EditarInscripcionAlumnoComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    SharedModule,
    DragDropModule,
    MatListModule,
    StoreModule.forFeature(alumnosStateFeatureKey, alumnoReducer),
    EffectsModule.forFeature([AlumnosEffects]),
    StoreModule.forFeature(cursoStateFeatureKey, cursoReducer),
    EffectsModule.forFeature([CursosEffects])
  ],
  exports: [
    DragDropModule,
    MatListModule
  ],
  providers: [
    AlumnosService,
    CursosService
  ]
})
export class InscripcionesModule { }
