import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { SesionGuard } from '../core/guards/sesion.guard';
import { AgregarAlumnosComponent } from './components/agregar-alumnos/agregar-alumnos.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';

const routes: Routes = [
  {
    path: "", canActivateChild: [SesionGuard], children: [
      { path: "listaAlumnos", component: ListaAlumnosComponent },
      { path: "agregarAlumnos", component: AgregarAlumnosComponent, canActivate: [AdminGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AlumnosRoutingModule { }
