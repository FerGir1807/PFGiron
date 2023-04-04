import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) {

  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${env.apiUrl}usuarios`);
  }

  agregarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${env.apiUrl}usuarios/`, usuario);
  }

  editarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${env.apiUrl}usuarios/${usuario.id}`, usuario);
  }

  eliminarUsuario(idUsuario: String): Observable<Usuario> {
    return this.http.delete<Usuario>(`${env.apiUrl}usuarios/${idUsuario}`);
  }

  obtenerDetalleUsuario(idUsuario: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${env.apiUrl}usuarios/${idUsuario}`);
  }
}
