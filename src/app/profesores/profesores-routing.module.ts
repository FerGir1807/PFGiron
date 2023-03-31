import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarProfesorComponent } from './components/agregar-profesor/agregar-profesor.component';
import { ListaProfesoresComponent } from './components/lista-profesores/lista-profesores.component';

const routes: Routes = [
  {
    path: "", children: [
      { path: "listaProfesores", component: ListaProfesoresComponent },
      { path: "agregarProfesor", component: AgregarProfesorComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfesoresRoutingModule { }
