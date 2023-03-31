import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formularioLogin: FormGroup;
  controles: any;
  hide: boolean = true;

  constructor(private loginService: LoginService) {

    this.controles = {
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    }

    this.formularioLogin = new FormGroup(this.controles);
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
    this.loginService.login(usuario);
  }
}
