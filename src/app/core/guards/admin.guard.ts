import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/shared/services/sesion.service';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private sesionService: SesionService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.sesionService.obtenerSesion().pipe(map((sesion: Sesion) => {
      if (sesion.usuario?.tipo === "admin") {
        return true;
      }
      else {
        alert("No puedes entrar a esta sección.");
        return false;
      }
    }));
  }

}
