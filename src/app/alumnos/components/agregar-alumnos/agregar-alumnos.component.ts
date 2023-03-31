import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from 'src/app/models/alumno';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';

@Component({
  selector: 'app-agregar-alumnos',
  templateUrl: './agregar-alumnos.component.html',
  styleUrls: ['./agregar-alumnos.component.css']
})
export class AgregarAlumnosComponent {
  formularioRegistroAlumno: FormGroup;
  controles: any;
  duracionSnackbar = 5;

  constructor(public dialog: MatDialogModule, private alumnoService: AlumnosService, private _snackBar: MatSnackBar) {
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

    this.formularioRegistroAlumno = new FormGroup(this.controles);
  }

  agregarAlumno() {

    let alumno: Alumno = {
      id: "",
      nombre: this.controles.nombre.value,
      segundoNombre: this.controles.segundoNombre.value,
      primerApellido: this.controles.primerApellido.value,
      segundoApellido: this.controles.segundoApellido.value,
      edad: this.controles.edad.value,
      genero: this.controles.genero.value,
      estatus: this.controles.estatus.value,
      cursosInscrito: []
    };

    this.alumnoService.agregarAlumno(alumno).subscribe();
    this.openSnackBar();
    this.formularioRegistroAlumno.reset()

  }

  openSnackBar() {
    this._snackBar.openFromComponent(RegistroCorrectoComponent, {
      duration: this.duracionSnackbar * 1000,
      data: "Se registró el alumno correctamente."
    });
  }
}
