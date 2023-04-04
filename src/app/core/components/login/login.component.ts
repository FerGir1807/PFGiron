import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Sesion } from 'src/app/models/sesion';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/shared/services/login.service';
import { Store } from '@ngrx/store';
import { cargarSesion } from './state/login.actions';
import { Subscription } from 'rxjs';
import { LoginState } from './state/login.reducer';
import { selectSesionState } from './state/login.selectors';
import { AppComponent } from 'src/app/app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {
  @ViewChild(AppComponent) appComponent!: AppComponent;
  formularioLogin: FormGroup;
  controles: any;
  hide: boolean = true;
  suscripcion!: Subscription;


  constructor(private loginService: LoginService, private router: Router, private loginStore: Store<LoginState>) {

    this.controles = {
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    }

    this.formularioLogin = new FormGroup(this.controles);
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe();
  }

  login() {
    let usuario: Usuario = {
      id: "",
      nombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      email: this.controles.email.value,
      password: this.controles.password.value,
      tipo: ""
    }
    this.suscripcion = this.loginService.login(usuario).subscribe((sesion: Sesion) => {
      this.loginStore.dispatch(cargarSesion({ sesion }));

      this.loginStore.select(selectSesionState).subscribe((sesion) => {
        if (sesion.activa) {
          this.router.navigate(['inicio']);
        }
      })


    });
  }
}
