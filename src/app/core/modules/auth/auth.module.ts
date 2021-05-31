import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from 'src/app/components/pages/login-page/login-page.component';
import { InputComponent } from 'src/app/components/layout/input/input.component';
import { ButtonComponent } from 'src/app/components/layout/button/button.component';
import { LinkComponent } from 'src/app/components/layout/link/link.component';
import { RegisterPageComponent } from 'src/app/components/pages/register-page/register-page.component';
import { FileInputComponent } from 'src/app/components/layout/file-input/file-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http'
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
  declarations: [
    LoginPageComponent,
    InputComponent,
    ButtonComponent,
    LinkComponent,
    RegisterPageComponent,
    FileInputComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthService,
    UserService,
    CookieService
  ]
})
export class AuthModule { }
