import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Profesor } from 'src/app/models/profesor';
import { env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfesoresService {

  constructor(private http: HttpClient) {

  }

  obtenerProfesores(): Observable<Profesor[]> {
    return this.http.get<Profesor[]>(`${env.apiUrl}profesores`);
  }

  agregarProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.post<Profesor>(`${env.apiUrl}profesores/`, profesor);
  }

  editarProfesor(profesor: Profesor): Observable<Profesor> {
    return this.http.put<Profesor>(`${env.apiUrl}profesores/${profesor.id}`, profesor);
  }

  eliminarProfesor(idProfesor: string): Observable<Profesor> {
    return this.http.delete<Profesor>(`${env.apiUrl}profesores/${idProfesor}`);
  }

  obtenerDetalleProfesor(idProfesor: string): Observable<Profesor> {
    return this.http.get<Profesor>(`${env.apiUrl}profesores/${idProfesor}`);
  }
}
