import { Component, Inject, inject } from '@angular/core';
import { MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-correcto',
  templateUrl: './registro-correcto.component.html',
  styleUrls: ['./registro-correcto.component.css']
})
export class RegistroCorrectoComponent {
  mensaje: string = "";
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
    this.mensaje = data
  }
  snackBarRef = inject(MatSnackBarRef);
}
