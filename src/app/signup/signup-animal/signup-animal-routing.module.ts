import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupAnimalPage } from './signup-animal.page';

const routes: Routes = [
  {
    path: '',
    component: SignupAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignupAnimalPageRoutingModule {}
