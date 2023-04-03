import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Sesion } from './models/sesion';
import { SesionService } from './shared/services/sesion.service';
import { LoginState } from './core/components/login/state/login.reducer';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectSesionState } from './core/components/login/state/login.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PFGiron';
  mode = new FormControl('push' as MatDrawerMode);
  nombre!: String;
  mensajeBienvenida: String = "";
  sesion$!: Observable<Sesion>;

  constructor(private sesionService: SesionService, private router: Router, private loginStore: Store<LoginState>, private changeDetectorRef: ChangeDetectorRef) {


  }
  ngOnInit(): void {

    console.log("ngOnINIT APPCOMPONENT")
    this.sesion$ = this.loginStore.select(selectSesionState);

    this.sesion$.subscribe((sesion) => {
      if (sesion.activa) {
        this.opcionesUser = true;
        this.botonLogin = false;
        this.nombre = sesion.usuario?.nombre!;

        if (sesion.usuario?.tipo == "admin") {
          this.opcionesAdmin = true;
        }
        else if (sesion.usuario?.tipo == "admin") {
          this.opcionesUser = true;
        }
        
      }
    });
  }

  opcionesUser: boolean = false;
  opcionesAdmin: boolean = false;
  botonLogin: boolean = true;


  logout() {
    let sesion: Sesion = {
      activa: false
    }
    this.opcionesAdmin = false;
    this.opcionesUser = false;
    this.botonLogin = true;
    this.sesionService.cerrarSesion(sesion);
    this.router.navigate(["inicio"]);
  }

  obtenerUrlImagen() {
    return "https://img.freepik.com/vector-gratis/estudiante-femenino-escuchando-webinar-linea_74855-6461.jpg?w=1380&t=st=1680289616~exp=1680290216~hmac=a9946b3b75e44868c0c29bfaf27661ba1d5f036db007575cc96be8ebb8a762c1";
  }
}
