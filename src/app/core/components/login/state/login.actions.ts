import { createAction, props } from '@ngrx/store';
import { Sesion } from 'src/app/models/sesion';

export const cargarSesion = createAction(
  '[Login] Cargar Sesión',
  props<{ sesion: Sesion }>()
);




