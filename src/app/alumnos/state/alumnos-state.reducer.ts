import { createFeature, createReducer, on } from '@ngrx/store';
import * as AlumnosStateActions from './alumnos-state.actions';
import { Alumno } from 'src/app/models/alumno';

export const alumnosStateFeatureKey = 'alumosState';

export interface AlumnoState {
  cargando: boolean,
  alumnos: Alumno[]
}

export const initialState: AlumnoState = {
  cargando: false,
  alumnos: []
};

export const alumnoReducer = createReducer(
  initialState,
  on(AlumnosStateActions.cargarAlumosState, (state) => {
    const nuevoEstado: AlumnoState = {
      cargando: true,
      alumnos: state.alumnos
    }
    return nuevoEstado;
  }),
  on(AlumnosStateActions.alumnosCargadosState, (state, { alumnos }) => {
    const nuevoEstado: AlumnoState = {
      cargando: false,
      alumnos: alumnos
    }
    return nuevoEstado;
  })
);

export const alumnosStateFeature = createFeature({
  name: alumnosStateFeatureKey,
  reducer: alumnoReducer,
});

