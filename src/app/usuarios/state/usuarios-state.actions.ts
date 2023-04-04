import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario';

export const cargarUsuariosState = createAction(
  '[UsuariosState] Cargar UsuariosStates'
);

export const usuariosCargados = createAction(
  '[UsuariosState] Usuarios Cargados',
  props<{ usuarios: Usuario[] }>()
);



