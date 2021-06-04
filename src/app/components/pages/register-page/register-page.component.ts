import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthResponse, AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

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
      "avatar": ["", Validators.required],
      "username": ["", Validators.compose([Validators.required, Validators.minLength(5)])],
      "password": ["", Validators.compose([Validators.required, Validators.minLength(5)])],
    })
  }

  ngOnInit(): void {
  }

  submit(data: Object) {
    if (this.form.valid) {
      this._auth.register(data).subscribe((res: AuthResponse) => {
        if (res.res != 100) {
          this.error = res.res;
          return
        }

        const form: HTMLFormElement = document.getElementById("form") as HTMLFormElement;

        const formData = new FormData(form);

        console.log(formData.get("avatar"));

        console.log(res);

        this._user.avatar(formData, res.token).subscribe((res: AuthResponse) => {
          if (res.res != 100) {
            this.error = res;
            return
          }
        });

        this.cookie.set("cloud-token", res.token, {domain: "localhost", path: '/'});
        this.cookie.set("cloud-refresh", res.refresh, {domain: "localhost", path: '/'});
        this._user.setUser(res.token);
        this.router.navigate(["/home"])
      })
    }
  }

}
