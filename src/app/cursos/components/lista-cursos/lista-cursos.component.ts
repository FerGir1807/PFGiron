import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription, map } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { EditarCursosComponent } from '../editar-cursos/editar-cursos.component';
import { Store } from '@ngrx/store';
import { selectCargandoCursos, selectCursosCargados } from '../../state/curso-state.selectors';
import { cargarCursoState, cursosCargadosState, editarCursoState, eliminarCursoState } from '../../state/curso-state.actions';
import { CursoState } from '../../state/curso-state.reducer';
import { LoginState } from 'src/app/core/components/login/state/login.reducer';
import { selectSesionState } from 'src/app/core/components/login/state/login.selectors';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit, OnDestroy {

  cursos: Curso[] = [];
  cursos$!: Observable<Curso[]>;
  cargando$!: Observable<boolean>;
  dataSource!: MatTableDataSource<Curso>;
  columnas: String[] = ["nombre", "fechaInicio", "fechaFin", "estatus", "cupo", "profesor", "acciones"];
  suscription!: Subscription;
  duracionSnackbar = 5;
  puedeEditar = false;

  @ViewChild(MatTable) table!: MatTable<Curso>;

  constructor(private dialog: MatDialog, private _snackBar: MatSnackBar,
    private store: Store<CursoState>,
    private loginStore: Store<LoginState>) {

  }

  ngOnInit(): void {
    this.puedeEditar = false;

    this.cargando$ = this.store.select(selectCargandoCursos);
    this.store.dispatch(cargarCursoState());

    this.store.select(selectCursosCargados).subscribe(
      (cursos: Curso[]) => {
        this.dataSource = new MatTableDataSource<Curso>(cursos);
        this.cursos = cursos;
      });

    this.loginStore.select(selectSesionState).subscribe((sesion) => {
      if (sesion.activa && sesion.usuario?.tipo == "admin") {
        this.puedeEditar = true;
      }
    });
  }

  ngOnDestroy(): void {

  }

  editarCurso(curso: Curso) {
    const dialogRef = this.dialog.open(EditarCursosComponent, {
      data: curso
    }).afterClosed().subscribe(() => {
      this.store.select(selectCursosCargados).subscribe(
        (cursos: Curso[]) => {
          this.dataSource = new MatTableDataSource<Curso>(cursos);
          this.cursos = cursos;
        });
    });
  }

  eliminarCurso(idCurso: string) {

    this.store.dispatch(eliminarCursoState({ idCurso }));

    this.store.select(selectCursosCargados).subscribe(
      (cursos: Curso[]) => {
        this.dataSource = new MatTableDataSource<Curso>(cursos);
        this.cursos = cursos;
      });
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(RegistroCorrectoComponent, {
      duration: this.duracionSnackbar * 1000,
      data: "Se eliminó el curso correctamente."
    });
  }
}