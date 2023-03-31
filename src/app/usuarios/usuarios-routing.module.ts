import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../core/guards/admin.guard';
import { SesionGuard } from '../core/guards/sesion.guard';
import { AgregarUsuariosComponent } from './components/agregar-usuarios/agregar-usuarios.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';

const routes: Routes = [
  {
    path: "", canActivateChild: [SesionGuard], children: [
      { path: "listaUsuarios", component: ListaUsuariosComponent },
      { path: "agregarUsuarios", component: AgregarUsuariosComponent, canActivate: [AdminGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
