import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { CookieService } from 'ngx-cookie-service';

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
    private cookie: CookieService
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
        this.error = res;
        return
      }

      this.cookie.set("@cloud/token", res.token, {domain: "localhost", path: '/'});
      this.cookie.set("@cloud/refresh", res.refresh, {domain: "localhost", path: '/'});
    })
  }

}
