import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { EditarAlumnosComponent } from '../editar-alumnos/editar-alumnos.component';
import { LoginState } from 'src/app/core/components/login/state/login.reducer';
import { Store } from '@ngrx/store';
import { selectSesionState } from 'src/app/core/components/login/state/login.selectors';
import { AlumnoState } from '../../state/alumnos-state.reducer';
import { selectAlumnosCargados, selectCargandoAlumnos } from '../../state/alumnos-state.selectors';
import { cargarAlumosState, eliminarAlumnoState } from '../../state/alumnos-state.actions';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.css']
})
export class ListaAlumnosComponent implements OnInit, OnDestroy {

  alumnos: Alumno[] = [];
  alumnos$!: Observable<Alumno[]>;
  cargando$!: Observable<boolean>;
  dataSource!: MatTableDataSource<Alumno>;
  columnas: String[] = ["nombreCompleto", "edad", "genero", "estatus", "acciones"];
  suscription!: Subscription;
  duracionSnackbar = 5;
  puedeEditar = false;

  @ViewChild(MatTable) table!: MatTable<Alumno>;

  constructor(public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private store: Store<AlumnoState>,
    private loginStore: Store<LoginState>) {
  }

  ngOnInit(): void {
    this.puedeEditar = false;

    this.cargando$ = this.store.select(selectCargandoAlumnos);
    this.store.dispatch(cargarAlumosState());

    this.store.select(selectAlumnosCargados).subscribe(
      (alumnos: Alumno[]) => {
        this.dataSource = new MatTableDataSource<Alumno>(alumnos);
        this.alumnos = alumnos;
      });

    this.loginStore.select(selectSesionState).subscribe((sesion) => {
      if (sesion.activa && sesion.usuario?.tipo === "admin") {
        this.puedeEditar = true;
      }
    });
  }

  ngOnDestroy(): void {

  }

  editarAlumno(alumno: Alumno): void {
    const dialogRef = this.dialog.open(EditarAlumnosComponent, {
      data: alumno
    }).afterClosed().subscribe(() => {
      this.store.select(selectAlumnosCargados).subscribe(
        (alumnos: Alumno[]) => {
          this.dataSource = new MatTableDataSource<Alumno>(alumnos);
          this.alumnos = alumnos;
        });
    });
  }

  eliminarAlumno(idAlumno: string) {

    this.store.dispatch(eliminarAlumnoState({ idAlumno }));

    this.store.select(selectAlumnosCargados).subscribe(
      (alumnos: Alumno[]) => {
        this.dataSource = new MatTableDataSource<Alumno>(alumnos);
        this.alumnos = alumnos;
      });
    this.openSnackBar();

  }

  openSnackBar() {
    this._snackBar.openFromComponent(RegistroCorrectoComponent, {
      duration: this.duracionSnackbar * 1000,
      data: "Se eliminó el alumno correctamente."
    });
  }
}
