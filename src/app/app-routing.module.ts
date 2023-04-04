import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/components/inicio/inicio.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'cursos', loadChildren: () => import('./cursos/cursos.module').then((cursoModule) => cursoModule.CursosModule) },
  { path: 'alumnos', loadChildren: () => import('./alumnos/alumnos.module').then((alumnoModulo) => alumnoModulo.AlumnosModule) },
  { path: 'inscripciones', loadChildren: () => import('./inscripciones/inscripciones.module').then((inscripcionModule) => inscripcionModule.InscripcionesModule) },
  { path: 'login', loadChildren: () => import('./core/components/login/login.module').then((loginModule) => loginModule.LoginModule) },
  { path: 'profesores', loadChildren: () => import('./profesores/profesores.module').then((profesorModule) => profesorModule.ProfesorModule) },
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then((usuarioModule) => usuarioModule.UsuariosModule) },
  //{ path: '', redirectTo: 'inicio', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
