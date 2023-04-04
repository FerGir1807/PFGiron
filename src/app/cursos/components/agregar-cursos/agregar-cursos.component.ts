import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { Profesor } from 'src/app/models/profesor';
import { RegistroCorrectoComponent } from 'src/app/shared/components/registro-correcto/registro-correcto.component';
import { ProfesoresService } from 'src/app/shared/services/profesores.service';
import { CursoState } from '../../state/curso-state.reducer';
import { Store } from '@ngrx/store';
import { agregarCursoState } from '../../state/curso-state.actions';

@Component({
  selector: 'app-agregar-cursos',
  templateUrl: './agregar-cursos.component.html',
  styleUrls: ['./agregar-cursos.component.css']
})
export class AgregarCursosComponent implements OnInit, OnDestroy {

  duracionSnackbar = 5;

  profesores!: Profesor[];
  profesores$!: Observable<Profesor[]>;
  suscription!: Subscription;

  formularioAgregarCurso: FormGroup;
  controlers: any;
  constructor(
    private profesoresService: ProfesoresService,
    private _snackBar: MatSnackBar,
    private store: Store<CursoState>) {

    this.controlers = {
      nombre: new FormControl("", Validators.required),
      fechaInicio: new FormControl(Date, Validators.required),
      fechaFin: new FormControl(Date, Validators.required),
      estatus: new FormControl(false, Validators.required),
      cupo: new FormControl("", [Validators.required, Validators.min(0), Validators.max(50)]),
      profesor: new FormControl("", [Validators.required]),
    }
    this.formularioAgregarCurso = new FormGroup(this.controlers);
  }

  ngOnInit(): void {

    this.profesores$ = this.profesoresService.obtenerProfesores();
    this.suscription = this.profesores$.subscribe((profesores) => {
      this.profesores = profesores;
    });
  }

  ngOnDestroy(): void {
    this.suscription.unsubscribe;
  }

  agregarCurso() {

    let curso: Curso;

    this.profesoresService.obtenerDetalleProfesor(this.controlers.profesor.value).subscribe((profesor) => {
      curso = {
        id: "",
        nombre: this.controlers.nombre.value,
        cupo: this.controlers.cupo.value,
        estatus: this.controlers.estatus.value,
        fechaInicio: this.controlers.fechaInicio.value,
        fechaFin: this.controlers.fechaFin.value,
        profesor: profesor
      }
      this.store.dispatch(agregarCursoState({ curso }));
      this.openSnackBar();
      this.formularioAgregarCurso.reset();
    });

  }

  openSnackBar() {
    this._snackBar.openFromComponent(RegistroCorrectoComponent, {
      duration: this.duracionSnackbar * 1000,
      data: "Se registró el curso correctamente."
    });
  }
}
