import { createFeature, createReducer, on } from '@ngrx/store';
import * as UsuariosStateActions from './usuarios-state.actions';
import { Usuario } from 'src/app/models/usuario';

export const usuariosStateFeatureKey = 'usuariosState';

export interface UsuarioState {
  cargando: boolean,
  usuarios: Usuario[]
}

export const initialState: UsuarioState = {
  cargando: false,
  usuarios: []
};

export const reducer = createReducer(
  initialState,
  on(UsuariosStateActions.cargarUsuariosState, (state) => {
    const nuevoEstado: UsuarioState = {
      cargando: true,
      usuarios: state.usuarios
    }
    return nuevoEstado;
  }),
  on(UsuariosStateActions.usuariosCargadosState, (state, { usuarios }) => {
    const nuevoEstado: UsuarioState = {
      cargando: false,
      usuarios: usuarios
    }
    return nuevoEstado;
  })

);

export const usuariosStateFeature = createFeature({
  name: usuariosStateFeatureKey,
  reducer,
});

