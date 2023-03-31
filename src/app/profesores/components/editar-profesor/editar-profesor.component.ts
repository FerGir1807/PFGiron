import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Profesor } from 'src/app/models/profesor';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { ProfesoresService } from 'src/app/shared/services/profesores.service';

@Component({
  selector: 'app-editar-profesor',
  templateUrl: './editar-profesor.component.html',
  styleUrls: ['./editar-profesor.component.css']
})
export class EditarProfesorComponent {
  formularioEditarProfesor: FormGroup;
  controles: any;
  duracionSnackbar = 5;

  constructor(

    private dialogRef: MatDialogRef<EditarProfesorComponent>,

    @Inject(MAT_DIALOG_DATA) public data: Profesor, private profesorService: ProfesoresService, private _snackBar: MatSnackBar) {
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

    this.formularioEditarProfesor = new FormGroup(this.controles);
  }

  editarProfesor() {
    let profesor: Profesor = {
      id: this.data.id,
      nombre: this.controles.nombre.value,
      segundoNombre: this.controles.segundoNombre.value,
      primerApellido: this.controles.primerApellido.value,
      segundoApellido: this.controles.segundoApellido.value,
      edad: this.controles.edad.value,
      genero: this.controles.genero.value,
      estatus: this.controles.estatus.value
    };

    this.profesorService.editarProfesor(profesor).subscribe((profesor: Profesor) => {
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
