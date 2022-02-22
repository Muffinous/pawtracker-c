import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SignupAnimalPageRoutingModule } from './signup-animal-routing.module';

import { SignupAnimalPage } from './signup-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    SignupAnimalPageRoutingModule
  ],
  declarations: [SignupAnimalPage]
})
export class SignupAnimalPageModule {}
