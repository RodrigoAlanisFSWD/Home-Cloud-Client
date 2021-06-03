import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from 'src/app/components/pages/home-page/home-page.component';
import { ComponentsModule } from '../components/components.module';
import { ItemComponent } from 'src/app/components/layout/item/item.component';

@NgModule({
  declarations: [
    HomePageComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsModule,
  ]
})
export class HomeModule { }
