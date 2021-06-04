import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from 'src/app/core/services/auth.service';
import { UserResponse, UserService } from 'src/app/core/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/core/store/app.state';
import * as UserActions from '../../../core/store/actions/user.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;
  error: any;

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _user: UserService,
    private cookie: CookieService,
    private router: Router
  ) {
    this.form = this._fb.group({
      "username": ["", Validators.compose([Validators.required, Validators.minLength(5)])],
      "password": ["", Validators.compose([Validators.required, Validators.minLength(5)])],
    })
  }

  ngOnInit(): void {
  }

  submit(data: Object) {
    this._auth.login(data).subscribe((res: AuthResponse) => {
      if (res.res != 100) {
        this.error = res.res;
        return
      }

      console.log(res);

      this.cookie.set("cloud-token", res.token, { domain: "localhost", path: '/' });
      this.cookie.set("cloud-refresh", res.refresh, { domain: "localhost", path: '/' });
      this._user.setUser(res.token);
      this.router.navigate(["/home"])
    })
  }

}
