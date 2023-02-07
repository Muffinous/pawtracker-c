import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Settings2Page } from './settings2.page';

const routes: Routes = [
  {
    path: '',
    component: Settings2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Settings2PageRoutingModule {}
