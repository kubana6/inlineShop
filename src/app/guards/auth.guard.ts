import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthserviceService } from '../services/authservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthserviceService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      map((value) => !!value),

      tap((isAuth) => {
        if (state.url === '/login' && isAuth) {
          this.router.navigate(['']);
        }

        if (!isAuth && state.url === '/') {
          this.router.navigate(['login']);
        }

        return true;
      }),
      take(1),
    );
  }
}
