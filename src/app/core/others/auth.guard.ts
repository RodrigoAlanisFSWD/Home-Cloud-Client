import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AuthResponse, AuthService } from '../services/auth.service';
import { UserResponse, UserService } from '../services/user.service';
import { AppState } from '../store/app.state';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _auth: AuthService,
    private router: Router
  ) {}

  verify() {
    return this._auth.getToken() !== "";
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.verify()) {
      return this.router.navigate(['/auth/login']).then(() => false)
    }
    return true
  }

}
