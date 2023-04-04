import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map } from "rxjs";
import { AlumnosService } from "src/app/shared/services/alumnos.service";
import { agregarAlumnoState, alumnosCargadosState, cargarAlumosState, editarAlumnoState, eliminarAlumnoState } from "./alumnos-state.actions";
import { Alumno } from "src/app/models/alumno";

@Injectable()
export class AlumnosEffects {

    cargarAlumnos$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(cargarAlumosState),
            concatMap(() => {
                return this.alumnos.obtenerAlumnos().pipe(
                    map((alumnos: Alumno[]) => alumnosCargadosState({ alumnos }))
                )
            })
        );
    });

    agregarAlumno$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(agregarAlumnoState),
            concatMap(({ alumno }) => {
                return this.alumnos.agregarAlumno(alumno).pipe(
                    map((alumno: Alumno) => {
                        return cargarAlumosState();
                    })
                )
            })
        );
    });

    eliminarAlumno$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(eliminarAlumnoState),
            concatMap(({ idAlumno }) => {
                return this.alumnos.eliminarAlumno(idAlumno).pipe(
                    map((alumno: Alumno) => {
                        return cargarAlumosState();
                    })
                )
            })
        );
    });

    editarAlumno$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(editarAlumnoState),
            concatMap(({ alumno }) => {
                return this.alumnos.editarAlumno(alumno).pipe(
                    map((alumno: Alumno) => {
                        return cargarAlumosState();
                    })
                )
            })
        );
    });

    constructor(
        private alumnos: AlumnosService,
        private actions$: Actions
    ) { }
}