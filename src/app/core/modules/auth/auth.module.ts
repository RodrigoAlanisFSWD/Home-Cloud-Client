import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from 'src/app/components/pages/login-page/login-page.component';
import { InputComponent } from 'src/app/components/layout/input/input.component';
import { ButtonComponent } from 'src/app/components/layout/button/button.component';
import { LinkComponent } from 'src/app/components/layout/link/link.component';


@NgModule({
  declarations: [
    LoginPageComponent,
    InputComponent,
    ButtonComponent,
    LinkComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ]
})
export class AuthModule { }
