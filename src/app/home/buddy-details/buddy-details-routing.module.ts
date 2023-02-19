import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuddyDetailsPage } from './buddy-details.page';

const routes: Routes = [
  {
    path: '',
    component: BuddyDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuddyDetailsPageRoutingModule {}
