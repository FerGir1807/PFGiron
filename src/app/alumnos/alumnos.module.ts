import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarAlumnosComponent } from './components/agregar-alumnos/agregar-alumnos.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { EditarAlumnosComponent } from './components/editar-alumnos/editar-alumnos.component';
import { SharedModule } from '../shared/shared.module';
import { AlumnosService } from '../shared/services/alumnos.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AgregarAlumnosComponent,
    ListaAlumnosComponent,
    EditarAlumnosComponent
  ],
  imports: [
    CommonModule,
    AlumnosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
  ],

  providers: [
    AlumnosService
  ]
})
export class AlumnosModule { }
