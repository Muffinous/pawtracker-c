import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AdoptPageRoutingModule } from './adopt-routing.module';
import { AdoptPage } from './adopt.page';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdoptPageRoutingModule,
    SwiperModule
  ],
  declarations: [AdoptPage]
})
export class AdoptPageModule {}
