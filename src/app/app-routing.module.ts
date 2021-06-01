import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "auth", loadChildren: () => import('./core/modules/auth/auth.module').then(m => m.AuthModule) },
  { path: "home", loadChildren: () => import('./core/modules/home/home.module').then(m => m.HomeModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
