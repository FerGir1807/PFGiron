import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  sesion$!: BehaviorSubject<Sesion>
  constructor() {
    let sesion: Sesion = { activa: false }
    this.sesion$ = new BehaviorSubject<Sesion>(sesion);
  }

  crearSesion(sesion: Sesion) {
    this.sesion$.next(sesion);
  }

  cerrarSesion(sesion: Sesion) {
    this.sesion$.next(sesion);
  }
  obtenerSesion(): Observable<Sesion> {
    return this.sesion$.asObservable();
  }
}
