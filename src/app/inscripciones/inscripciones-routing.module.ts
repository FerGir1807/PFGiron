import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscripcionesAlumnosComponent } from './components/inscripciones-alumnos/inscripciones-alumnos.component';
import { SesionGuard } from '../core/guards/sesion.guard';

const routes: Routes = [
  {
    path: "", canActivateChild: [SesionGuard], children: [
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
