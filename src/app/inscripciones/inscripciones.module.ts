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
    MatListModule
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
