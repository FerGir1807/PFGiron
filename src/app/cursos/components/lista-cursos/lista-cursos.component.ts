import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { map, Observable, Subscription } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { CursosService } from '../../../shared/services/cursos.service';
import { EditarCursosComponent } from '../editar-cursos/editar-cursos.component';

@Component({
  selector: 'app-lista-cursos',
  templateUrl: './lista-cursos.component.html',
  styleUrls: ['./lista-cursos.component.css']
})
export class ListaCursosComponent implements OnInit, OnDestroy {

  cursos!: Curso[];
  cursos$!: Observable<Curso[]>;
  dataSource!: MatTableDataSource<Curso>;
  columnas: String[] = ["nombre", "fechaInicio", "fechaFin", "estatus", "cupo", "profesor", "acciones"];
  suscription!: Subscription;
  duracionSnackbar = 5;
  puedeEditar = false;

  @ViewChild(MatTable) table!: MatTable<Curso>;

  constructor(private cursosService: CursosService, public dialog: MatDialog, private _snackBar: MatSnackBar, private sesionService: SesionService) {
    this.cursos = [];
  }

  ngOnInit(): void {
    this.puedeEditar = false;
    this.cursos$ = this.cursosService.obtenerCursos();
    this.suscription = this.cursos$.subscribe((cursos) => {
      this.dataSource = new MatTableDataSource<Curso>(cursos);
      this.cursos = cursos;
    });
    this.sesionService.obtenerSesion().subscribe((sesion) => {
      if (sesion.activa && sesion.usuario?.tipo == "admin") {
        this.puedeEditar = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe;
  }

  editarCurso(curso: Curso) {
    const dialogRef = this.dialog.open(EditarCursosComponent, {
      data: curso
    }).afterClosed().subscribe(() => {
      this.cursos$.subscribe((cursos) => {
        this.dataSource = new MatTableDataSource<Curso>(cursos);
        this.cursos = cursos;
        this.table.renderRows();
      });

    });
  }

  eliminarCurso(idCurso: string) {
    this.cursosService.eliminarCurso(idCurso).subscribe(() => {
      this.openSnackBar();
      this.cursos$.subscribe((cursos) => {
        this.dataSource = new MatTableDataSource<Curso>(cursos);
        this.cursos = cursos;
        this.table.renderRows();
      });
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(RegistroCorrectoComponent, {
      duration: this.duracionSnackbar * 1000,
      data: "Se eliminó el curso correctamente."
    });
  }
}
