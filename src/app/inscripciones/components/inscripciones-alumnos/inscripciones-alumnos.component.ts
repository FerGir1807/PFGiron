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

@Component({
  selector: 'app-inscripciones-alumnos',
  templateUrl: './inscripciones-alumnos.component.html',
  styleUrls: ['./inscripciones-alumnos.component.css']
})
export class InscripcionesAlumnosComponent implements OnInit, OnDestroy {
  @Output() selectedChange: EventEmitter<Inscripcion> = new EventEmitter();
  alumnos!: Alumno[];
  alumnos$!: Observable<Alumno[]>;
  suscripcionAlumno!: Subscription;

  cursos!: Curso[];
  cursos$!: Observable<Curso[]>;
  suscripcionCursos!: Subscription;

  inscripciones!: Inscripcion[];

  columnas: String[] = ["nombreCompleto", "cursosInscrito", "acciones"];
  dataSource!: MatTableDataSource<Inscripcion>;

  @ViewChild(MatTable) table!: MatTable<Alumno>;

  constructor(private alumnoService: AlumnosService, private cursosService: CursosService, public dialog: MatDialog) {
    this.inscripciones = [];
    this.alumnos = [];
    this.cursos = [];
  }

  ngOnInit(): void {

    let nombreAlumnoPipe = new NombreAlumnoPipe();
    this.inscripciones = [];

    this.alumnos$ = this.alumnoService.obtenerAlumnos();
    this.suscripcionAlumno = this.alumnos$.subscribe((alumnos) => {

      this.inscripciones = [];
      this.alumnos = alumnos;
      this.alumnos.map(alumno => {
        let inscripcion: Inscripcion = {
          idAlumno: alumno.id,
          nombreAlumno: nombreAlumnoPipe.transform(alumno),
          cursosInscrito: alumno.cursosInscrito
        };
        this.inscripciones.push(inscripcion);
      });
      this.dataSource = new MatTableDataSource<Inscripcion>(this.inscripciones);
    });

    this.cursos$ = this.cursosService.obtenerCursos();
    this.suscripcionCursos = this.cursos$.subscribe((cursos) => {
      this.cursos = cursos;
    });
  }

  ngOnDestroy(): void {
    this.suscripcionAlumno.unsubscribe;
    this.suscripcionCursos.unsubscribe;
  }

  editarInscripcion(inscripcion: Inscripcion) {
    const dialogRef = this.dialog.open(EditarInscripcionAlumnoComponent, {
      data: inscripcion
    }).afterClosed().subscribe(() => {

      this.cursos$ = this.cursosService.obtenerCursos();
      this.suscripcionCursos = this.cursos$.subscribe((cursos) => {
        this.cursos = cursos;
        this.ngOnInit();
        this.table.renderRows();
      });

    });
  }
}
