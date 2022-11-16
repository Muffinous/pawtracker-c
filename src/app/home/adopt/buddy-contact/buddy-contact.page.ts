import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { Buddy } from 'src/app/models/buddy';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { sendEmailVerification } from 'firebase/auth';

@Component({
  selector: 'app-buddy-contact',
  templateUrl: './buddy-contact.page.html',
  styleUrls: ['./buddy-contact.page.scss'],
})
export class BuddyContactPage implements OnInit {
  buddy = {} as Buddy
  bday
  
  constructor(public modalControler: ModalController, public navParams: NavParams, private callNumber: CallNumber, private emailComposer: EmailComposer) { 
    this.buddy.buddyName = this.navParams.get('buddyName');
    this.buddy.buddyAge = this.navParams.get('buddyAge');
    this.buddy.buddyBreed = this.navParams.get('buddyBreed');
    this.buddy.buddyGender = this.navParams.get('buddyGender');
    this.buddy.buddyBday = this.navParams.get('buddyBday');
    this.buddy.buddyType = this.navParams.get('buddyType');
    this.buddy.buddyLocation = this.navParams.get('buddyLocation');
    this.buddy.buddyDescription = this.navParams.get('buddyDescription');
    this.buddy.buddyPic = this.navParams.get('buddyPic');

    this.bday = formatDate(this.buddy.buddyBday, 'dd-MM-yyyy', 'es-ES')
  
    console.log('buddypage', this.buddy, 'bday', this.bday)
  }

  ngOnInit() {
  }

  close() {
    this.modalControler.dismiss();
  }

  callOwner() {
    this.callNumber.callNumber("+34644562994", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  sendEmail() {
    let email = {
      to: 'max@mustermann.de',
      cc: 'erika@mustermann.de',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    }

    this.emailComposer.open(email);
  }
}
