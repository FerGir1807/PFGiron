import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profesor } from 'src/app/models/profesor';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { ProfesoresService } from 'src/app/shared/services/profesores.service';

@Component({
  selector: 'app-agregar-profesor',
  templateUrl: './agregar-profesor.component.html',
  styleUrls: ['./agregar-profesor.component.css']
})
export class AgregarProfesorComponent {
  formularioRegistroProfesor: FormGroup;
  controles: any;
  duracionSnackbar = 5;

  constructor(public dialog: MatDialogModule, private profesorService: ProfesoresService, private _snackBar: MatSnackBar) {
    let regEx: string = "^[a-zA-Z ]+$";
    this.controles = {
      nombre: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern(regEx)]),
      segundoNombre: new FormControl("", [Validators.minLength(2), Validators.pattern(regEx)]),
      primerApellido: new FormControl("", [Validators.required, Validators.minLength(2), Validators.pattern(regEx)]),
      segundoApellido: new FormControl("", [Validators.minLength(2), Validators.pattern(regEx)]),
      edad: new FormControl("", [Validators.min(18), Validators.max(99), Validators.required]),
      genero: new FormControl("", [Validators.required]),
      estatus: new FormControl(false, Validators.required),
    }

    this.formularioRegistroProfesor = new FormGroup(this.controles);
  }

  agregarProfesor() {

    let profesor: Profesor = {
      id: "",
      nombre: this.controles.nombre.value,
      segundoNombre: this.controles.segundoNombre.value,
      primerApellido: this.controles.primerApellido.value,
      segundoApellido: this.controles.segundoApellido.value,
      edad: this.controles.edad.value,
      genero: this.controles.genero.value,
      estatus: this.controles.estatus.value
    };

    this.profesorService.agregarProfesor(profesor).subscribe();
    this.openSnackBar();
    this.formularioRegistroProfesor.reset()

  }

  openSnackBar() {
    this._snackBar.openFromComponent(RegistroCorrectoComponent, {
      duration: this.duracionSnackbar * 1000,
      data: "Se registró el profesor correctamente."
    });
  }
}
