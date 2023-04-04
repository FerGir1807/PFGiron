import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";
import { Curso } from "src/app/models/curso";
import { ProfesoresService } from "src/app/shared/services/profesores.service";
import { agregarProfesorState, cargarProfesoresState, editarProfesorState, eliminarProfesorState, profesoresCargadosState } from "./profesores-state.actions";
import { Profesor } from "src/app/models/profesor";

@Injectable()
export class ProfesoresEffects {

    cargarProfesores$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(cargarProfesoresState),
            concatMap(() => {
                return this.profesores.obtenerProfesores().pipe(
                    map((profesores: Profesor[]) => profesoresCargadosState({ profesores }))
                )
            })
        );
    });

    agregarProfesor$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(agregarProfesorState),
            concatMap(({ profesor }) => {
                return this.profesores.agregarProfesor(profesor).pipe(
                    map((profesor: Profesor) => {
                        return cargarProfesoresState();
                    })
                )
            })
        );
    });

    eliminarProfesor$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(eliminarProfesorState),
            concatMap(({ idProfesor }) => {
                return this.profesores.eliminarProfesor(idProfesor).pipe(
                    map((profesor: Profesor) => {
                        return cargarProfesoresState();
                    })
                )
            })
        );
    });

    editarProfesor$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(editarProfesorState),
            concatMap(({ profesor }) => {
                return this.profesores.editarProfesor(profesor).pipe(
                    map((profesor: Profesor) => {
                        return cargarProfesoresState();
                    })
                )
            })
        );
    });
    constructor(
        private profesores: ProfesoresService,
        private actions$: Actions
    ) { }
}