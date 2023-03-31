import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Alumno } from 'src/app/models/alumno';
import { env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class AlumnosService {

  constructor(private http: HttpClient) {

  }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.http.get<Alumno[]>(`${env.apiUrl}alumnos`);
  }

  agregarAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.post<Alumno>(`${env.apiUrl}alumnos/`, alumno);
  }

  editarAlumno(alumno: Alumno): Observable<Alumno> {
    return this.http.put<Alumno>(`${env.apiUrl}alumnos/${alumno.id}`, alumno);
  }

  eliminarAlumno(idAlumno: string): Observable<Alumno> {
    return this.http.delete<Alumno>(`${env.apiUrl}alumnos/${idAlumno}`);
  }

  obtenerDetalleAlumno(idAlumno: string): Observable<Alumno> {
    return this.http.get<Alumno>(`${env.apiUrl}alumnos/${idAlumno}`);
  }
}
