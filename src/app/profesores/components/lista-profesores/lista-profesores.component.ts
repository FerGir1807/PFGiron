import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Profesor } from 'src/app/models/profesor';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { ProfesoresService } from 'src/app/shared/services/profesores.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { EditarProfesorComponent } from '../editar-profesor/editar-profesor.component';
import { LoginState } from 'src/app/core/components/login/state/login.reducer';
import { Store } from '@ngrx/store';
import { selectSesionState } from 'src/app/core/components/login/state/login.selectors';
import { ProfesorState } from '../../state/profesores-state.reducer';
import { selectCargandoProfesores } from '../../state/profesores-state.selectors';
import { cargarProfesoresState, profesoresCargados } from '../../state/profesores-state.actions';

@Component({
  selector: 'app-lista-profesores',
  templateUrl: './lista-profesores.component.html',
  styleUrls: ['./lista-profesores.component.css']
})
export class ListaProfesoresComponent implements OnInit {
  profesores: Profesor[] = [];
  profesores$!: Observable<Profesor[]>;
  cargando$!: Observable<boolean>;
  dataSource!: MatTableDataSource<Profesor>;
  columnas: String[] = ["nombreCompleto", "edad", "genero", "estatus", "acciones"];
  suscription!: Subscription;
  duracionSnackbar = 5;
  puedeEditar = false;

  @ViewChild(MatTable) table!: MatTable<Profesor>;

  constructor(public dialog: MatDialog,
    private profesorService: ProfesoresService,
    private _snackBar: MatSnackBar,
    private sesionService: SesionService,
    private store: Store<ProfesorState>,
    private loginStore: Store<LoginState>) {

  }

  ngOnInit(): void {
    this.puedeEditar = false;
    this.cargando$ = this.store.select(selectCargandoProfesores);
    this.profesores$ = this.profesorService.obtenerProfesores();
    this.store.dispatch(cargarProfesoresState());

    this.suscription = this.profesores$.subscribe((profesores) => {
      this.dataSource = new MatTableDataSource<Profesor>(profesores);
      this.store.dispatch(profesoresCargados({ profesores: profesores }))
      this.profesores = profesores;
    });

    this.loginStore.select(selectSesionState).subscribe((sesion) => {
      if (sesion.activa && sesion.usuario?.tipo === "admin") {
        this.puedeEditar = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe;
  }

  editarProfesor(alumno: Profesor): void {
    const dialogRef = this.dialog.open(EditarProfesorComponent, {
      data: alumno
    }).afterClosed().subscribe(() => {
      this.profesores$.subscribe((profesores) => {
        this.dataSource = new MatTableDataSource<Profesor>(profesores);
        this.profesores = profesores;
        this.table.renderRows();
      });
    });
  }

  eliminarProfesor(idProfesor: string) {
    this.profesorService.eliminarProfesor(idProfesor).subscribe((profesor: Profesor) => {
      this.openSnackBar();
      this.profesores$ = this.profesorService.obtenerProfesores();
      this.suscription = this.profesores$.subscribe((profesores) => {
        this.dataSource = new MatTableDataSource<Profesor>(profesores);
        this.profesores = profesores;
        this.table.renderRows();
      });
    });
  }
  openSnackBar() {
    this._snackBar.openFromComponent(RegistroCorrectoComponent, {
      duration: this.duracionSnackbar * 1000,
      data: "Se eliminó el profesor correctamente."
    });
  }
}
