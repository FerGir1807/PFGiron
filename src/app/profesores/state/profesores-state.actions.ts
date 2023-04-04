import { createAction, props } from '@ngrx/store';
import { Profesor } from 'src/app/models/profesor';

export const cargarProfesoresState = createAction(
  '[ProfesoresState] Cargar ProfesoresState'
);
export const profesoresCargados = createAction(
  '[ProfesoresState] Cargar cargados',
  props<{ profesores: Profesor[] }>()
);




