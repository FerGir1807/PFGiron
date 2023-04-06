import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProfesorComponent } from './components/agregar-profesor/agregar-profesor.component';
import { ListaProfesoresComponent } from './components/lista-profesores/lista-profesores.component';
import { SesionGuard } from '../core/guards/sesion.guard';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Routes = [
  {
    path: "", canActivateChild: [SesionGuard], children: [
      { path: "listaProfesores", component: ListaProfesoresComponent },
      { path: "agregarProfesor", component: AgregarProfesorComponent, canActivate: [AdminGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesoresRoutingModule { }
