import { createAction, props } from '@ngrx/store';
import { Alumno } from 'src/app/models/alumno';

export const cargarAlumosState = createAction(
  '[AlumnosState] Cargar Alumnos'
);

export const alumnosCargadosState = createAction(
  '[AlumnosState] Alumnos Cargados',
  props<{ alumnos: Alumno[] }>()
);

export const agregarAlumnoState = createAction(
  '[AlumnosState] Agregar Alumno',
  props<{ alumno: Alumno }>()
)

export const eliminarAlumnoState = createAction(
  '[AlumnosState] Eliminar Alumno',
  props<{ idAlumno: String }>()
)

export const editarAlumnoState = createAction(
  '[AlumnosState] Editar Alumno',
  props<{ alumno: Alumno }>()
)
