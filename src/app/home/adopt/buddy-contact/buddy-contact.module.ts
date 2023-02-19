import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuddyContactPageRoutingModule } from './buddy-contact-routing.module';

import { BuddyContactPage } from './buddy-contact.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    IonicModule,
    BuddyContactPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [BuddyContactPage]
})
export class BuddyContactPageModule {}
