import { createAction, props } from '@ngrx/store';
import { Alumno } from 'src/app/models/alumno';

export const cargarAlumosState = createAction(
  '[AlumosState] Cargar Alumos'
);

export const alumnosCargados = createAction(
  '[AlumosState] Alumnos Cargados',
  props<{ alumnos: Alumno[] }>()
);

