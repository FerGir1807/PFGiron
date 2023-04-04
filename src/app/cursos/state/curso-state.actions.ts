import { createAction, props } from '@ngrx/store';
import { Curso } from 'src/app/models/curso';

export const cargarCursoState = createAction(
  '[CursoState] Cargar cursos'
);

export const cursosCargadosState = createAction(
  '[CursoState] Cursos cargados',
  props<{ cursos: Curso[] }>()
);

export const agregarCursoState = createAction(
  '[CursoState] Agregar Curso',
  props<{ curso: Curso }>()
);

export const eliminarCursoState = createAction(
  '[CursoState] Eliminar Curso',
  props<{ idCurso: String }>()
);

export const editarCursoState = createAction(
  '[CursoState] Editar Curso',
  props<{ curso: Curso }>()
);