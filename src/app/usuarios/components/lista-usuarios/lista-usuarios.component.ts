import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, Subscription } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { Usuario } from 'src/app/models/usuario';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { EditarUsuariosComponent } from '../editar-usuarios/editar-usuarios.component';
import { Store } from '@ngrx/store';
import { LoginState } from 'src/app/core/components/login/state/login.reducer';
import { selectSesionState } from 'src/app/core/components/login/state/login.selectors';
import { UsuarioState } from '../../state/usuarios-state.reducer';
import { selectCargandoUsuarios } from '../../state/usuarios-state.selectors';
import { cargarUsuariosState, usuariosCargados } from '../../state/usuarios-state.actions';

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

  constructor(private usuariosService: UsuariosService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private sesionService: SesionService,
    private loginStore: Store<LoginState>,
    private store: Store<UsuarioState>) {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.puedeEditar = false;
    this.cargando$ = this.store.select(selectCargandoUsuarios);
    this.usuarios$ = this.usuariosService.obtenerUsuarios();
    this.store.dispatch(cargarUsuariosState());

    this.suscription = this.usuarios$.subscribe((usuarios) => {
      this.dataSource = new MatTableDataSource<Usuario>(usuarios);
      this.store.dispatch(usuariosCargados({ usuarios: usuarios }));
      this.usuarios = usuarios;
    });

    this.loginStore.select(selectSesionState).subscribe((sesion) => {
      if (sesion.activa && sesion.usuario?.tipo == "admin") {
        this.puedeEditar = true;
      }
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe;
  }

  editarUsuario(usuario: Usuario) {
    const dialogRef = this.dialog.open(EditarUsuariosComponent, {
      data: usuario
    }).afterClosed().subscribe(() => {
      this.usuarios$.subscribe((usuarios) => {
        this.dataSource = new MatTableDataSource<Usuario>(usuarios);
        this.usuarios = usuarios;
        this.table.renderRows();
      });

    });
  }

  eliminarUsuario(idUsuario: string) {
    this.usuariosService.eliminarUsuario(idUsuario).subscribe(() => {
      this.openSnackBar();
      this.usuarios$.subscribe((usuarios) => {
        this.dataSource = new MatTableDataSource<Usuario>(usuarios);
        this.usuarios = usuarios;
        this.table.renderRows();
      });
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(RegistroCorrectoComponent, {
      duration: this.duracionSnackbar * 1000,
      data: "Se eliminó el usuario correctamente."
    });
  }
}
