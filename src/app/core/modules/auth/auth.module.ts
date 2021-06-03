import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from 'src/app/components/pages/login-page/login-page.component';
import { RegisterPageComponent } from 'src/app/components/pages/register-page/register-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http'
import { UserService } from '../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import { ComponentsModule } from '../components/components.module';
import { LinkComponent } from 'src/app/components/layout/link/link.component';

@NgModule({
  declarations: [
    LoginPageComponent,
    RegisterPageComponent,
    LinkComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule
  ],
  providers: [
    AuthService,
    UserService,
    CookieService
  ]
})
export class AuthModule { }
