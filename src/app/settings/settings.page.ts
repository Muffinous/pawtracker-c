import { Component, OnInit } from '@angular/core';
import { ScreenBrightness } from '@capacitor-community/screen-brightness';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/auth/user/user.service';
import { PersonalinfoComponent } from './personalinfo/personalinfo.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  brightnessValue;
  isModalOpen = false;

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
      button: 'personalinfo'
    }]
    // }, {
    // title: 'Settings',
    // icon: 'settings',
    // children: [{
    //     title: 'Sound settings',
    //     icon: 'volume-high',
    //     button: ''
    // }, {
    //     title: 'Notification settings',
    //     icon: 'options',
    //     button: ''
    // }]
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
        title: 'We are the BuddyPaw team.'
    }]
  }]
  presentingElement = undefined;

  constructor(private authService: AuthService, private userService: UserService, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.brightnessValue = 1
    this.presentingElement = document.querySelector('.ion-page');

  }

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
    } else if (clickName.match('personalinfo')) {
      this.openModal()
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: PersonalinfoComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    console.log('data', data)
  }

}
