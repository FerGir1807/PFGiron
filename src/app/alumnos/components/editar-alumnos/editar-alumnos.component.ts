import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Alumno } from 'src/app/models/alumno';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { AlumnosService } from 'src/app/shared/services/alumnos.service';

@Component({
  selector: 'app-editar-alumnos',
  templateUrl: './editar-alumnos.component.html',
  styleUrls: ['./editar-alumnos.component.css']
})
export class EditarAlumnosComponent {
  formularioEditarAlumno: FormGroup;
  controles: any;
  duracionSnackbar = 5;

  constructor(

    private dialogRef: MatDialogRef<EditarAlumnosComponent>,

    @Inject(MAT_DIALOG_DATA) public data: Alumno, private alumnoService: AlumnosService, private _snackBar: MatSnackBar) {
    let regEx: string = "^[a-zA-Z ]+$";
    this.controles = {
      nombre: new FormControl(data.nombre, [Validators.required, Validators.minLength(2), Validators.pattern(regEx)]),
      segundoNombre: new FormControl(data.segundoNombre, [Validators.minLength(2), Validators.pattern(regEx)]),
      primerApellido: new FormControl(data.primerApellido, [Validators.required, Validators.minLength(2), Validators.pattern(regEx)]),
      segundoApellido: new FormControl(data.segundoApellido, [Validators.minLength(2), Validators.pattern(regEx)]),
      edad: new FormControl(data.edad, [Validators.min(18), Validators.max(99), Validators.required]),
      genero: new FormControl(data.genero, [Validators.required]),
      estatus: new FormControl(data.estatus, Validators.required),
    };

    this.formularioEditarAlumno = new FormGroup(this.controles);
  }

  editarAlumno() {

    let alumno: Alumno = {
      id: this.data.id,
      nombre: this.controles.nombre.value,
      segundoNombre: this.controles.segundoNombre.value,
      primerApellido: this.controles.primerApellido.value,
      segundoApellido: this.controles.segundoApellido.value,
      edad: this.controles.edad.value,
      genero: this.controles.genero.value,
      estatus: this.controles.estatus.value,
      cursosInscrito: this.data.cursosInscrito
    };

    this.alumnoService.editarAlumno(alumno).subscribe((alumno: Alumno) => {
      this.openSnackBar();
      this.dialogRef.close();
    });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(RegistroCorrectoComponent, {
      duration: this.duracionSnackbar * 1000,
      data: "Se editó el alumno correctamente."
    });
  }
}
