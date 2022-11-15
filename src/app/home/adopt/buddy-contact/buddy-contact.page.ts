import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Buddy } from 'src/app/models/buddy';

@Component({
  selector: 'app-buddy-contact',
  templateUrl: './buddy-contact.page.html',
  styleUrls: ['./buddy-contact.page.scss'],
})
export class BuddyContactPage implements OnInit {
  buddy = {} as Buddy
  bday
  
  constructor(public modalControler: ModalController, public navParams: NavParams) { 
    this.buddy.buddyName = this.navParams.get('buddyName');
    this.buddy.buddyAge = this.navParams.get('buddyAge');
    this.buddy.buddyBreed = this.navParams.get('buddyBreed');
    this.buddy.buddyGender = this.navParams.get('buddyGender');
    this.buddy.buddyBday = this.navParams.get('buddyBday');
    this.buddy.buddyType = this.navParams.get('buddyType');
    this.buddy.buddyPic = this.navParams.get('buddyPic');

    this.bday = formatDate(this.buddy.buddyBday, 'dd-MM-yyyy', 'es-ES')
  
    console.log('buddypage', this.buddy, 'bday', this.bday)
  }
  ngOnInit() {
  }

  close() {
    this.modalControler.dismiss();
  }
}
