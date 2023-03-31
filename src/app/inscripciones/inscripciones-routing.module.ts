import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarInscripcionAlumnoComponent } from './components/editar-inscripcion-alumno/editar-inscripcion-alumno.component';
import { InscripcionesAlumnosComponent } from './components/inscripciones-alumnos/inscripciones-alumnos.component';

const routes: Routes = [
  {
    path: "", children: [
      {
        path: "inscripcionAlumno", component: InscripcionesAlumnosComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripcionesRoutingModule { }
