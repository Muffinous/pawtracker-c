import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuddyDetailsPageRoutingModule } from './buddy-details-routing.module';

import { BuddyDetailsPage } from './buddy-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    BuddyDetailsPageRoutingModule
  ],
  declarations: [BuddyDetailsPage]
})
export class BuddyDetailsPageModule {}
