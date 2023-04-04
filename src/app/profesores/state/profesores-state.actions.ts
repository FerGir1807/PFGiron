import { createAction, props } from '@ngrx/store';
import { Profesor } from 'src/app/models/profesor';

export const cargarProfesoresState = createAction(
  '[ProfesoresState] Cargar Profesores'
);
export const profesoresCargadosState = createAction(
  '[ProfesoresState] Profesores Cargados',
  props<{ profesores: Profesor[] }>()
);

export const agregarProfesorState = createAction(
  '[ProfesoresState] Agregar Profesor',
  props<{ profesor: Profesor }>()
);
export const eliminarProfesorState = createAction(
  '[ProfesoresState] Eliminar Profesor',
  props<{ idProfesor: String }>()
);
export const editarProfesorState = createAction(
  '[ProfesoresState] Editar Profesor',
  props<{ profesor: Profesor }>()
);


