import { createAction, props } from '@ngrx/store';
import { Curso } from 'src/app/models/curso';

export const cargarCursoState = createAction(
  '[CursoState] Cargar cursos'
);

export const cursosCargados = createAction(
  '[CursoState] Cargar cargados',
  props<{ cursos: Curso[] }>()
);