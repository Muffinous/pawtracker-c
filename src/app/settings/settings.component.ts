import { Component, OnInit } from '@angular/core';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  brightnessValue;

  actions =[{
    title: 'Edit profile',
    icon: 'person',
    children: [{
      title: 'Change password',
      icon: 'key'
      }, {
      title: 'Change personal information',
      icon: 'person'
    }]
    }, {
    title: 'Settings',
    icon: 'settings',
    children: [{
        title: 'Sound settings',
        icon: 'volume-high'
    }, {
        title: 'Notification settings',
        icon: 'options'
    }]
    }, {
    title: 'Rate',
    icon: 'heart',
    children: [{
        title: 'Rate this application',
        icon: 'star'
    }]
    }, {
    title: 'Tell a friend',
    icon: 'chatbox',
    children: [{
        title: 'Share it in Email',
        icon: 'mail'
    }, {
        title: 'Share it on Social Media',
        icon: 'globe'
    }]
    }, {
    title: 'Term of service',
    icon: 'copy',
    children: [{
        title: 'This application content is under WTFPL license.'
    }]
    }, {
    title: 'Contact us',
    icon: 'mail-open',
    children: [{
        title: 'Let us know if we can help',
        icon: 'mail-open'
    }]
    }, {
    title: 'About us',
    icon: 'globe',
    children: [{
        title: 'We are the Mobiscroll team.'
    }]
  }]

  constructor() { }

  ngOnInit() {}

  async controlBrightness() {
    console.log("brightness ", this.brightnessValue)
    
    await ScreenBrightness.setBrightness( this.brightnessValue ); 
   }

  goBack() {
    window.history.back();
  }
}
