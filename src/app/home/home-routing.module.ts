import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'index',
        loadChildren: () => import('./index/index.module').then( m => m.IndexPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
      },
      {
        path: 'adopt',
        loadChildren: () => import('./adopt/adopt.module').then( m => m.AdoptPageModule)
      },
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
      },
    ]
  },
  {
    path: 'home',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: 'event-details',
    loadChildren: () => import('./event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
