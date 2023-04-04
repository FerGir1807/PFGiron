import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { UsuarioState } from '../../state/usuarios-state.reducer';
import { Store } from '@ngrx/store';
import { editarUsuarioState } from '../../state/usuarios-state.actions';

@Component({
  selector: 'app-editar-usuarios',
  templateUrl: './editar-usuarios.component.html',
  styleUrls: ['./editar-usuarios.component.css']
})
export class EditarUsuariosComponent {

  formularioEditarUsuario!: FormGroup;
  controlers: any;
  duracionSnackbar = 5;

  usuarios!: Usuario[];
  usuarios$!: Observable<Usuario[]>;
  suscription!: Subscription;

  hide: boolean = true;

  constructor(private dialogRef: MatDialogRef<EditarUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Usuario,
    private store: Store<UsuarioState>,
    private _snackBar: MatSnackBar,

  ) {
    let regEx: string = "^[a-zA-Z ]+$";

    this.controlers = {
      nombre: new FormControl(data.nombre, [Validators.required, Validators.minLength(2), Validators.pattern(regEx)]),
      segundoNombre: new FormControl(data.segundoNombre, [Validators.minLength(2), Validators.pattern(regEx)]),
      primerApellido: new FormControl(data.primerApellido, [Validators.required, Validators.minLength(2), Validators.pattern(regEx)]),
      segundoApellido: new FormControl(data.segundoApellido, [Validators.minLength(2), Validators.pattern(regEx)]),
      email: new FormControl(data.email, [Validators.email]),
      password: new FormControl(data.password, [Validators.required]),
      tipo: new FormControl(data.tipo, [Validators.required])
    }

    this.formularioEditarUsuario = new FormGroup(this.controlers);
  }

  editarUsuario() {

    let usuario: Usuario = {
      id: this.data.id,
      nombre: this.controlers.nombre.value,
      segundoNombre: this.controlers.segundoNombre.value,
      primerApellido: this.controlers.primerApellido.value,
      segundoApellido: this.controlers.segundoApellido.value,
      email: this.controlers.email.value,
      password: this.controlers.password.value,
      tipo: this.controlers.tipo.value
    };

    this.store.dispatch(editarUsuarioState({ usuario }));
    this.dialogRef.close();
    this.openSnackBar();

  }

  openSnackBar() {
    this._snackBar.openFromComponent(RegistroCorrectoComponent, {
      duration: this.duracionSnackbar * 1000,
      data: "Se editó el usuario correctamente."
    });
  }
}
