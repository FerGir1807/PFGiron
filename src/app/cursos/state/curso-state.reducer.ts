import { createFeature, createReducer, on } from '@ngrx/store';
import * as CursoStateActions from './curso-state.actions';
import { Curso } from 'src/app/models/curso';

export const cursoStateFeatureKey = 'cursoState';

export interface CursoState {
  cargando: boolean,
  cursos: Curso[]
}

export const initialState: CursoState = {
  cargando: false,
  cursos: []
};

export const reducer = createReducer(
  initialState,
  on(CursoStateActions.cargarCursoState, (state) => {
    const nuevoEstado: CursoState = {
      cargando: true,
      cursos: state.cursos
    }
    return nuevoEstado;
  }),
  on(CursoStateActions.cursosCargados, (state, { cursos }) => {
    const nuevoEstado: CursoState = {
      cargando: false,
      cursos: cursos
    }
    return nuevoEstado;
  }),

);

export const cursoStateFeature = createFeature({
  name: cursoStateFeatureKey,
  reducer,
});

