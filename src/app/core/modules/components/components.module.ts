import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from 'src/app/components/layout/button/button.component';
import { InputComponent } from 'src/app/components/layout/input/input.component';
import { LinkComponent } from 'src/app/components/layout/link/link.component';
import { FileInputComponent } from 'src/app/components/layout/file-input/file-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ButtonComponent,
    InputComponent,
    FileInputComponent,
  ],
  exports: [
    ButtonComponent,
    InputComponent,
    FileInputComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class ComponentsModule { }
