import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { UsuariosService } from '../shared/services/usuarios.service';
import { AgregarUsuariosComponent } from './components/agregar-usuarios/agregar-usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditarUsuariosComponent } from './components/editar-usuarios/editar-usuarios.component';


@NgModule({
  declarations: [
    ListaUsuariosComponent,
    AgregarUsuariosComponent,
    EditarUsuariosComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    UsuariosService
  ]
})
export class UsuariosModule { }
