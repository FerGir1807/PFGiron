import { createFeature, createReducer, on } from '@ngrx/store';
import * as LoginActions from './login.actions';
import { Sesion } from 'src/app/models/sesion';

export const loginFeatureKey = 'login';

export interface LoginState {
  sesion: Sesion
}

export const initialState: LoginState = {
  sesion: { activa: false }
};

export const loginReducer = createReducer(
  initialState,
  on(LoginActions.cargarSesion, (state, { sesion }) => {
    return {
      ...state,
      sesion: {
        activa: sesion.activa,
        usuario: sesion.usuario
      }
    };
  }),

);

export const loginFeature = createFeature({
  name: loginFeatureKey,
  reducer: loginReducer,
});

