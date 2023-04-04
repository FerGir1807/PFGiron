import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCursosComponent } from './components/lista-cursos/lista-cursos.component';
import { CursosRoutingModule } from './cursos-routing.module';
import { CursosService } from '../shared/services/cursos.service';
import { AgregarCursosComponent } from './components/agregar-cursos/agregar-cursos.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EditarCursosComponent } from './components/editar-cursos/editar-cursos.component';
import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { cursoStateFeatureKey, reducer } from './state/curso-state.reducer';


@NgModule({
  declarations: [
    ListaCursosComponent,
    AgregarCursosComponent,
    EditarCursosComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SharedModule,
    StoreModule.forFeature(cursoStateFeatureKey, reducer)
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    CursosService
  ]
})
export class CursosModule { }
