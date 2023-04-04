import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromProfesoresState from './profesores-state.reducer';

export const selectProfesoresState = createFeatureSelector<fromProfesoresState.ProfesorState>(
  fromProfesoresState.profesoresStateFeatureKey
);

export const selectCargandoProfesores = createSelector(
  selectProfesoresState,
  (state: fromProfesoresState.ProfesorState) => state.cargando
);

export const selectProfesoresCargados = createSelector(
  selectProfesoresState,
  (state: fromProfesoresState.ProfesorState) => state.profesores
);