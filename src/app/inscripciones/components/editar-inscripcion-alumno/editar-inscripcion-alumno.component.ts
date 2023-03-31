import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inscripcion } from 'src/app/models/inscripcion';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';
import { Curso } from 'src/app/models/curso';
import { map, Observable, Subscription } from 'rxjs';
import { InscripcionesAlumnosComponent } from '../inscripciones-alumnos/inscripciones-alumnos.component';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-inscripcion-alumno',
  templateUrl: './editar-inscripcion-alumno.component.html',
  styleUrls: ['./editar-inscripcion-alumno.component.css']
})
export class EditarInscripcionAlumnoComponent implements OnInit {

  cursosDisponibles!: Curso[];
  cursosInscrito!: Curso[];

  cursos$!: Observable<Curso[]>;
  suscription!: Subscription;

  duracionSnackbar = 5;

  constructor(private dialogRef: MatDialogRef<EditarInscripcionAlumnoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inscripcion,
    private cursosService: CursosService,
    private alumnoService: AlumnosService,
    private _snackBar: MatSnackBar) {

  }
  ngOnInit(): void {

    this.cursosInscrito = Object.assign([], this.data.cursosInscrito);
    this.cursos$ = this.cursosService.obtenerCursos();
    this.cursosDisponibles = []

    this.suscription = this.cursos$.subscribe((cursos) => {
      cursos.map(curso => {

        if (this.data.cursosInscrito.find(x => x.id === curso.id) == null) {
          this.cursosDisponibles.push(curso);
        }
      })
    });
  }

  editarInscripcion() {

    this.alumnoService.obtenerDetalleAlumno(this.data.idAlumno).subscribe((alumno) => {
      alumno.cursosInscrito = this.cursosInscrito;
      this.alumnoService.editarAlumno(alumno).subscribe();
      this.dialogRef.close();
      this.openSnackBar();
    })
  }


  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  openSnackBar() {
    this._snackBar.openFromComponent(RegistroCorrectoComponent, {
      duration: this.duracionSnackbar * 1000,
      data: "Se editaron los cursos del alumno correctamente."
    });
  }
}
