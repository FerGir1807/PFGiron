import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { env } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) {
  }

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(`${env.apiUrl}cursos`);
  }

  agregarCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(`${env.apiUrl}cursos/`, curso);
  }

  editarCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${env.apiUrl}cursos/${curso.id}`, curso);

  }
  eliminarCurso(idCurso: string): Observable<Curso> {
    return this.http.delete<Curso>(`${env.apiUrl}cursos/${idCurso}`);

  }
}
