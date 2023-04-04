import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CursosService } from "src/app/shared/services/cursos.service";
import { concatMap, map } from "rxjs";
import { Curso } from "src/app/models/curso";
import { agregarUsuarioState, cargarUsuariosState, editarUsuarioState, eliminarUsuarioState, usuariosCargadosState } from "./usuarios-state.actions";
import { Usuario } from "src/app/models/usuario";
import { UsuariosService } from "src/app/shared/services/usuarios.service";

@Injectable()
export class UsuariosEffects {

    cargarUsuarios$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(cargarUsuariosState),
            concatMap(() => {
                return this.usuarios.obtenerUsuarios().pipe(
                    map((usuarios: Usuario[]) => usuariosCargadosState({ usuarios }))
                )
            })
        );
    });

    agregarUsuarios$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(agregarUsuarioState),
            concatMap(({ usuario }) => {
                return this.usuarios.agregarUsuario(usuario).pipe(
                    map((usuario: Usuario) => {
                        return cargarUsuariosState();
                    })
                )
            })
        );
    });

    eliminarUsuario$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(eliminarUsuarioState),
            concatMap(({ idUsuario }) => {
                return this.usuarios.eliminarUsuario(idUsuario).pipe(
                    map((usuario: Usuario) => {
                        return cargarUsuariosState();
                    })
                )
            })
        );
    });

    editarUsuarios$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(editarUsuarioState),
            concatMap(({ usuario }) => {
                return this.usuarios.editarUsuario(usuario).pipe(
                    map((usuario: Usuario) => {
                        return cargarUsuariosState();
                    })
                )
            })
        );
    });
    constructor(
        private usuarios: UsuariosService,
        private actions$: Actions
    ) { }
}