import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { AuthResponse, AuthService } from './core/services/auth.service';
import { UserResponse, UserService } from './core/services/user.service';
import { AppState } from './core/store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';

  constructor(
    private _auth: AuthService,
    private _user: UserService,
    private store: Store<AppState>,
    private _cookie: CookieService
  ) {
    let token = this._auth.getToken();
    if (token !== "") {
      this._user.profile(token).subscribe((res: UserResponse) => {
        if (!res.auth) {
          const refresh = this._auth.getRefresh();

          this._auth.refresh(refresh).subscribe((res: AuthResponse) => {
            this._cookie.set("cloud-token", res.token, { domain: "localhost", path: '/' })
            token = res.token
          })
        }

        this._user.setUser(token);
      })
    }
  }
}
