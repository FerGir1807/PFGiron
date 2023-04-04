import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { LoginState } from '../components/login/state/login.reducer';
import { selectSesionState } from '../components/login/state/login.selectors';

@Injectable({
  providedIn: 'root'
})

export class AdminGuard implements CanActivate {

  constructor(private sesionService: SesionService, private router: Router, private loginStore: Store<LoginState>) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginStore.select(selectSesionState).pipe(map((sesion: Sesion) => {
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
