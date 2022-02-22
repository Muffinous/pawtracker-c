import { Component, OnInit } from '@angular/core';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  brightnessValue;

  constructor() { }

  ngOnInit() {
  }

  async controlBrightness() {
    console.log("brightness ", this.brightnessValue)
    
    await ScreenBrightness.setBrightness( this.brightnessValue ); 
   }
}
