import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuddyContactPage } from './buddy-contact.page';

const routes: Routes = [
  {
    path: '',
    component: BuddyContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuddyContactPageRoutingModule {}
