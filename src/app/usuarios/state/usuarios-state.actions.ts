import { createAction, props } from '@ngrx/store';
import { Usuario } from 'src/app/models/usuario';

export const cargarUsuariosState = createAction(
  '[UsuariosState] Cargar UsuariosStates'
);

export const usuariosCargadosState = createAction(
  '[UsuariosState] Usuarios Cargados',
  props<{ usuarios: Usuario[] }>()
);

export const agregarUsuarioState = createAction(
  '[UsuariosState] Agregar Usuario',
  props<{ usuario: Usuario }>()
);

export const eliminarUsuarioState = createAction(
  '[UsuariosState] Eliminar Usuario',
  props<{ idUsuario: String }>()
);

export const editarUsuarioState = createAction(
  '[UsuariosState] Editar Usuario',
  props<{ usuario: Usuario }>()
);
