import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table'; import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';
import { Curso } from 'src/app/models/curso';
import { Inscripcion } from 'src/app/models/inscripcion';
import { NombreAlumnoPipe } from 'src/app/shared/pipes/nombre-alumno.pipe';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { EditarInscripcionAlumnoComponent } from '../editar-inscripcion-alumno/editar-inscripcion-alumno.component';
import { AlumnoState } from 'src/app/alumnos/state/alumnos-state.reducer';
import { Store } from '@ngrx/store';
import { cargarAlumosState } from 'src/app/alumnos/state/alumnos-state.actions';
import { selectAlumnosCargados, selectCargandoAlumnos } from 'src/app/alumnos/state/alumnos-state.selectors';
import { CursoState } from 'src/app/cursos/state/curso-state.reducer';
import { selectCargandoCursos, selectCursosCargados } from 'src/app/cursos/state/curso-state.selectors';
import { cargarCursoState } from 'src/app/cursos/state/curso-state.actions';

@Component({
  selector: 'app-inscripciones-alumnos',
  templateUrl: './inscripciones-alumnos.component.html',
  styleUrls: ['./inscripciones-alumnos.component.css']
})
export class InscripcionesAlumnosComponent implements OnInit, OnDestroy {

  nombreAlumnoPipe = new NombreAlumnoPipe();
  cargandoCursos$!: Observable<boolean>;
  cargandoAlumnos$!: Observable<boolean>;


  alumnos: Alumno[] = [];
  alumnos$!: Observable<Alumno[]>;
  suscripcionAlumno!: Subscription;

  cursos: Curso[] = [];
  cursos$!: Observable<Curso[]>;
  suscripcionCursos!: Subscription;

  inscripciones: Inscripcion[] = [];

  columnas: String[] = ["nombreCompleto", "cursosInscrito", "acciones"];
  dataSource!: MatTableDataSource<Inscripcion>;

  constructor(    public dialog: MatDialog,
    private alumnoStore: Store<AlumnoState>,
    private cursoStore: Store<CursoState>) {

  }

  ngOnInit(): void {

    this.cargandoCursos$ = this.cursoStore.select(selectCargandoCursos);
    this.cargandoAlumnos$ = this.alumnoStore.select(selectCargandoAlumnos);

    this.alumnoStore.dispatch(cargarAlumosState());

    this.alumnoStore.select(selectAlumnosCargados).subscribe(
      (alumnos: Alumno[]) => {
        this.inscripciones = [];
        this.alumnos = alumnos;
        this.alumnos.map(alumno => {
          let inscripcion: Inscripcion = {
            idAlumno: alumno.id,
            nombreAlumno: this.nombreAlumnoPipe.transform(alumno),
            cursosInscrito: alumno.cursosInscrito
          };
          this.inscripciones.push(inscripcion);
        });
        this.dataSource = new MatTableDataSource<Inscripcion>(this.inscripciones);
      });

    this.cursoStore.dispatch(cargarCursoState());

    this.cursoStore.select(selectCursosCargados).subscribe(
      (cursos: Curso[]) => {
        this.cursos = cursos;
      });
  }

  ngOnDestroy(): void {
  }

  editarInscripcion(inscripcion: Inscripcion) {
    const dialogRef = this.dialog.open(EditarInscripcionAlumnoComponent, {
      data: inscripcion
    }).afterClosed().subscribe(() => {
      this.alumnoStore.dispatch(cargarAlumosState());
    });
  }
}
