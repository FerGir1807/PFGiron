import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Sesion } from 'src/app/models/sesion';
import { LoginService } from 'src/app/shared/services/login.service';
import { SesionService } from 'src/app/shared/services/sesion.service';
import { LoginState } from '../components/login/state/login.reducer';
import { Store } from '@ngrx/store';
import { selectSesionState } from '../components/login/state/login.selectors';

@Injectable({
  providedIn: 'root'
})
export class SesionGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private sesionService: SesionService, private router: Router, private loginStore: Store<LoginState>) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginStore.select(selectSesionState).pipe(map((sesion: Sesion) => {
      if (sesion.activa) {
        switch (sesion.usuario?.tipo) {
          case "admin":
            return true;
          case "usuario":
          default:
            return false;
        }
      }
      else {
        this.router.navigate(["login"]);
        return false;
      }
    }));

  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginStore.select(selectSesionState).pipe(map((sesion: Sesion) => {
      if (sesion.activa) {
        return true;
      }
      else {
        this.router.navigate(["login"]);
        return false;
      }
    }));
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.loginStore.select(selectSesionState).pipe(map((sesion: Sesion) => {
      if (sesion.activa) {
        return true;
      }
      else {
        this.router.navigate(["login"]);
        return false;
      }
    }));
  }
}
