import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from './sesion.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private sesionService: SesionService, private router: Router, private http: HttpClient) { }

  /*
  login(usuario: Usuario) {

    this.obtenerUsuarios().subscribe(usuarios => {

      let usuarioCorrecto = usuarios.find(x => x.email === usuario.email);

      if (usuarioCorrecto !== undefined) {
        if (usuarioCorrecto?.password === usuario.password) {
          let sesion: Sesion = {
            activa: true,
            usuario: usuarioCorrecto
          }
          this.sesionService.crearSesion(sesion);
          this.router.navigate(["inicio"]);
        }
        else {
          alert("Contraseña incorrecta.")
        }
      }
      else {
        alert("El usuario no existe.")
      }
    });
  }
*/

  login(usuario: Usuario): Observable<Sesion> {

    let sesion: Sesion = {
      activa: false
    }
    return this.obtenerUsuarios().pipe(
      map((usuarios: Usuario[]) => {
        let usuarioCorrecto = usuarios.find(x => x.email === usuario.email);

        if (usuarioCorrecto !== undefined) {
          if (usuarioCorrecto?.password === usuario.password) {

            sesion.activa = true;
            sesion.usuario = usuarioCorrecto
            return sesion;
          }
          else {
            alert("Contraseña incorrecta.")
            return sesion;
          }
        }
        else {
          alert("El usuario no existe.")
          return sesion;
        }
      })
    );


  }

  private obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${env.apiUrl}usuarios`);
  }
}
