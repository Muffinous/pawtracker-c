import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { SignupAnimalComponent } from './signup/signup-animal-comp/signup-animal.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: 'slides',
    loadChildren: () => import('./slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: '',
    loadChildren: () => import('./slides/slides.module').then( m => m.SlidesPageModule)
  },
  {
    path: 'home/:username',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'settingsnew', component: SettingsComponent },
  { path: 'signupanimal', component: SignupAnimalComponent },
  {
    path: 'buddy-contact',
    loadChildren: () => import('./home/adopt/buddy-contact/buddy-contact.module').then( m => m.BuddyContactPageModule)
  },  {
    path: 'settings2',
    loadChildren: () => import('./settings2/settings2.module').then( m => m.Settings2PageModule)
  },




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
