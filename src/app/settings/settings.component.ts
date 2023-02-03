import { Component, OnInit } from '@angular/core';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { User } from 'firebase/auth';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/auth/user/user.service';

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
      icon: 'key',
      button: 'reset'
      }, {
      title: 'Change personal information',
      icon: 'person',
      button: 'v'
    }]
    }, {
    title: 'Settings',
    icon: 'settings',
    children: [{
        title: 'Sound settings',
        icon: 'volume-high',
        button: ''
    }, {
        title: 'Notification settings',
        icon: 'options',
        button: ''
    }]
    }, {
    title: 'Rate',
    icon: 'heart',
    children: [{
        title: 'Rate this application',
        icon: 'star',
        button: ''
    }]
    }, {
    title: 'Tell a friend',
    icon: 'chatbox',
    children: [{
        title: 'Share it in Email',
        icon: 'mail',
        button: ''
    }, {
        title: 'Share it on Social Media',
        icon: 'globe',
        button: ''
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

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit() {}

  async controlBrightness() {
    console.log("brightness ", this.brightnessValue)
    
    await ScreenBrightness.setBrightness( this.brightnessValue ); 
   }

  goBack() {
    window.history.back();
  }

  click(clickName: string) {
    console.log("click function ", clickName)
    if (clickName.match('reset')) {
      this.authService.ForgotPassword(this.userService.user.email)
    }
    
  }
}
