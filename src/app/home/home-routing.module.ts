import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from '../settings/settings.component';
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
        path: '',
        redirectTo: 'index',
        pathMatch: 'full'
      },
      { path: 'settingsnew', component: SettingsComponent },
    ]
  },
  {
    path: 'home',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },     
  { path: 'settingsnew', component: SettingsComponent },  {
    path: 'event-details',
    loadChildren: () => import('./event-details/event-details.module').then( m => m.EventDetailsPageModule)
  },
  {
    path: 'buddy',
    loadChildren: () => import('./buddy/buddy.module').then( m => m.BuddyPageModule)
  },


  // {
  //   path: 'settings',
  //   loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
