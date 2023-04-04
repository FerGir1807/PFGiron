import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsuariosState from './usuarios-state.reducer';

export const selectUsuariosState = createFeatureSelector<fromUsuariosState.UsuarioState>(
  fromUsuariosState.usuariosStateFeatureKey
);

export const selectCargandoUsuarios = createSelector(
  selectUsuariosState,
  (state: fromUsuariosState.UsuarioState) => state.cargando
);

export const selectUsuariosCargados = createSelector(
  selectUsuariosState,
  (state: fromUsuariosState.UsuarioState) => state.usuarios
);