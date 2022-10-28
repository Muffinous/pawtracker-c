import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {NgCalendarModule } from 'ionic2-calendar';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth/auth.service';
import { AngularFireModule } from '@angular/fire/compat';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { CalModalComponent } from './home/cal-modal/cal-modal.component';
import { SettingsComponent } from './settings/settings.component';
import { SwiperModule } from 'swiper/angular';
import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { SignupAnimalComponent } from './signup/signup-animal-comp/signup-animal.component';
import { AdoptModalComponent } from './home/adopt/adopt-modal/adopt-modal.component';

@NgModule({
  declarations: [AppComponent, SignupComponent, LoginComponent, CalModalComponent, SettingsComponent, SignupAnimalComponent, AdoptModalComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, NgCalendarModule, FormsModule, ReactiveFormsModule, CommonModule,
    // provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideFirestore(() => getFirestore()),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFirestoreModule.enablePersistence(),
    SwiperModule,
  ],
    
  providers: [AuthService, Camera, File, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
