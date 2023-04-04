import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlumosState from './alumnos-state.reducer';

export const selectAlumosState = createFeatureSelector<fromAlumosState.AlumnoState>(
  fromAlumosState.alumnosStateFeatureKey
);

export const selectCargandoAlumnos = createSelector(
  selectAlumosState,
  (state: fromAlumosState.AlumnoState) => state.cargando
);

export const selectAlumnosCargados = createSelector(
  selectAlumosState,
  (state: fromAlumosState.AlumnoState) => state.alumnos
);