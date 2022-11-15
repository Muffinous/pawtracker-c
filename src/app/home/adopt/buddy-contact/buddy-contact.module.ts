import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuddyContactPageRoutingModule } from './buddy-contact-routing.module';

import { BuddyContactPage } from './buddy-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuddyContactPageRoutingModule
  ],
  declarations: [BuddyContactPage]
})
export class BuddyContactPageModule {}
