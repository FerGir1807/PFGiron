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

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {
  usuarios!: Usuario[];
  usuarios$!: Observable<Usuario[]>;
  dataSource!: MatTableDataSource<Usuario>;
  columnas: String[] = ["nombre", "email", "acciones"];
  suscription!: Subscription;
  duracionSnackbar = 5;
  puedeEditar = false;

  @ViewChild(MatTable) table!: MatTable<Curso>;

  constructor(private usuariosService: UsuariosService, public dialog: MatDialog, private _snackBar: MatSnackBar, private sesionService: SesionService) {
    this.usuarios = [];
  }

  ngOnInit(): void {
    this.puedeEditar = false;
    this.usuarios$ = this.usuariosService.obtenerUsuarios();
    this.suscription = this.usuarios$.subscribe((usuarios) => {
      this.dataSource = new MatTableDataSource<Usuario>(usuarios);
      this.usuarios = usuarios;
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
