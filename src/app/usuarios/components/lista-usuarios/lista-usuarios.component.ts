import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { Usuario } from 'src/app/models/usuario';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { EditarUsuariosComponent } from '../editar-usuarios/editar-usuarios.component';
import { Store } from '@ngrx/store';
import { LoginState } from 'src/app/core/components/login/state/login.reducer';
import { selectSesionState } from 'src/app/core/components/login/state/login.selectors';
import { UsuarioState } from '../../state/usuarios-state.reducer';
import { selectCargandoUsuarios, selectUsuariosCargados } from '../../state/usuarios-state.selectors';
import { cargarUsuariosState, eliminarUsuarioState, usuariosCargadosState } from '../../state/usuarios-state.actions';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios: Usuario[] = [];
  usuarios$!: Observable<Usuario[]>;
  cargando$!: Observable<boolean>;
  dataSource!: MatTableDataSource<Usuario>;
  columnas: String[] = ["nombre", "email", "acciones"];
  suscription!: Subscription;
  duracionSnackbar = 5;
  puedeEditar = false;

  @ViewChild(MatTable) table!: MatTable<Curso>;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private loginStore: Store<LoginState>,
    private store: Store<UsuarioState>) {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.puedeEditar = false;
    this.cargando$ = this.store.select(selectCargandoUsuarios);

    this.store.dispatch(cargarUsuariosState());

    this.store.select(selectUsuariosCargados).subscribe(
      (usuarios: Usuario[]) => {
        this.dataSource = new MatTableDataSource<Usuario>(usuarios);
        this.usuarios = usuarios;
      });

    this.loginStore.select(selectSesionState).subscribe((sesion) => {
      if (sesion.activa && sesion.usuario?.tipo == "admin") {
        this.puedeEditar = true;
      }
    });
  }

  ngOnDestroy(): void {

  }

  editarUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(EditarUsuariosComponent, {
      data: usuario
    }).afterClosed().subscribe(() => {
      this.store.select(selectUsuariosCargados).subscribe(
        (usuarios: Usuario[]) => {
          this.dataSource = new MatTableDataSource<Usuario>(usuarios);
          this.usuarios = usuarios;
        });
    });
  }

  eliminarUsuario(idUsuario: string) {

    this.store.dispatch(eliminarUsuarioState({ idUsuario }));
    this.store.select(selectUsuariosCargados).subscribe(
      (usuarios: Usuario[]) => {
        this.dataSource = new MatTableDataSource<Usuario>(usuarios);
        this.usuarios = usuarios;
      });
    this.openSnackBar();
  }

  openSnackBar() {
    this._snackBar.openFromComponent(RegistroCorrectoComponent, {
      duration: this.duracionSnackbar * 1000,
      data: "Se eliminó el usuario correctamente."
    });
  }
}
