import { createFeature, createReducer, on } from '@ngrx/store';
import * as ProfesorStateActions from './profesores-state.actions';
import { Profesor } from 'src/app/models/profesor';

export const profesoresStateFeatureKey = 'profesoresState';

export interface ProfesorState {
  cargando: boolean,
  profesores: Profesor[]
}

export const initialState: ProfesorState = {
  cargando: true,
  profesores: []
};

export const reducer = createReducer(
  initialState,
  on(ProfesorStateActions.cargarProfesoresState, (state) => {
    const nuevoEstado: ProfesorState = {
      cargando: true,
      profesores: state.profesores
    }
    return nuevoEstado;
  }),
  on(ProfesorStateActions.profesoresCargados, (state, { profesores }) => {
    const nuevoEstado: ProfesorState = {
      cargando: false,
      profesores: profesores
    }
    return nuevoEstado;
  }),

);

export const profesoresStateFeature = createFeature({
  name: profesoresStateFeatureKey,
  reducer,
});

