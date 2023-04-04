import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CursosService } from "src/app/shared/services/cursos.service";
import { agregarCursoState, cargarCursoState, cursosCargadosState, editarCursoState, eliminarCursoState } from "./curso-state.actions";
import { concatMap, map } from "rxjs";
import { Curso } from "src/app/models/curso";

@Injectable()
export class CursosEffects {

    cargarCursos$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(cargarCursoState),
            concatMap(() => {
                return this.cursos.obtenerCursos().pipe(
                    map((cursos: Curso[]) => cursosCargadosState({ cursos }))
                )
            })
        );
    });

    agregarCursos$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(agregarCursoState),
            concatMap(({ curso }) => {
                return this.cursos.agregarCurso(curso).pipe(
                    map((curso: Curso) => {
                        return cargarCursoState();
                    })
                )
            })
        );
    });

    eliminarCurso$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(eliminarCursoState),
            concatMap(({ idCurso }) => {
                return this.cursos.eliminarCurso(idCurso).pipe(
                    map((curso: Curso) => {
                        return cargarCursoState();
                    })
                )
            })
        );
    });

    editarCurso$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(editarCursoState),
            concatMap(({ curso }) => {
                return this.cursos.editarCurso(curso).pipe(
                    map((curso: Curso) => {
                        return cargarCursoState();
                    })
                )
            })
        );
    });
    constructor(
        private cursos: CursosService,
        private actions$: Actions
    ) { }
}