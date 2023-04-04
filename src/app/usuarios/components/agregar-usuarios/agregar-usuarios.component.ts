import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from 'src/app/models/usuario';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { UsuarioState } from '../../state/usuarios-state.reducer';
import { Store } from '@ngrx/store';
import { agregarUsuarioState } from '../../state/usuarios-state.actions';

@Component({
  selector: 'app-agregar-usuarios',
  templateUrl: './agregar-usuarios.component.html',
  styleUrls: ['./agregar-usuarios.component.css']
})
export class AgregarUsuariosComponent {
  formularioRegistroUsuario: FormGroup;
  controles: any;
  duracionSnackbar = 5;

  hide: boolean = true;
  constructor(public dialog: MatDialogModule,
    private store: Store<UsuarioState>,
    private _snackBar: MatSnackBar) {

    let regEx: string = "^[a-zA-Z ]+$";

    this.controles = {
      nombre: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern(regEx)]),
      segundoNombre: new FormControl("", [Validators.minLength(2), Validators.pattern(regEx)]),
      primerApellido: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern(regEx)]),
      segundoApellido: new FormControl("", [Validators.minLength(2), Validators.pattern(regEx)]),
      email: new FormControl("", [Validators.email]),
      password: new FormControl("", [Validators.required]),
      tipo: new FormControl("", [Validators.required])
    }

    this.formularioRegistroUsuario = new FormGroup(this.controles);
  }

  agregarUsuario() {
    let usuario: Usuario = {
      id: "",
      nombre: this.controles.nombre.value,
      segundoNombre: this.controles.segundoNombre.value,
      primerApellido: this.controles.primerApellido.value,
      segundoApellido: this.controles.segundoApellido.value,
      email: this.controles.email.value,
      password: this.controles.password.value,
      tipo: this.controles.tipo.value
    }

    this.store.dispatch(agregarUsuarioState({ usuario }));
    this.openSnackBar();

    this.formularioRegistroUsuario.reset();
  };


  openSnackBar() {
    this._snackBar.openFromComponent(RegistroCorrectoComponent, {
      duration: this.duracionSnackbar * 1000,
      data: "Se registró el usuario correctamente."
    });
  }
}
