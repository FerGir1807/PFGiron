import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarAlumnosComponent } from './components/agregar-alumnos/agregar-alumnos.component';
import { ListaAlumnosComponent } from './components/lista-alumnos/lista-alumnos.component';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { EditarAlumnosComponent } from './components/editar-alumnos/editar-alumnos.component';
import { SharedModule } from '../shared/shared.module';
import { AlumnosService } from '../shared/services/alumnos.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { alumnosStateFeatureKey, reducer } from './state/alumnos-state.reducer';
import { AlumnosEffects } from './state/alumnos-state.effects';
import { EffectsModule } from '@ngrx/effects';

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
    SharedModule,
    StoreModule.forFeature(alumnosStateFeatureKey, reducer),
    EffectsModule.forFeature([AlumnosEffects])
  ],
  exports: [
  ],

  providers: [
    AlumnosService
  ]
})
export class AlumnosModule { }
