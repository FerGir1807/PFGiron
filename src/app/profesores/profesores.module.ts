import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesoresRoutingModule } from './profesores-routing.module';
import { ProfesoresService } from '../shared/services/profesores.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ListaProfesoresComponent } from './components/lista-profesores/lista-profesores.component';
import { EditarProfesorComponent } from './components/editar-profesor/editar-profesor.component';
import { AgregarProfesorComponent } from './components/agregar-profesor/agregar-profesor.component';


@NgModule({
  declarations: [
    ListaProfesoresComponent,
    EditarProfesorComponent,
    AgregarProfesorComponent
  ],
  imports: [
    CommonModule,
    ProfesoresRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    ProfesoresService
  ]
})
export class ProfesorModule { }
