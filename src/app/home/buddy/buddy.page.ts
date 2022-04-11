import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Buddy } from 'src/app/models/buddy';

@Component({
  selector: 'app-buddy',
  templateUrl: './buddy.page.html',
  styleUrls: ['./buddy.page.scss'],
})
export class BuddyPage implements OnInit {
  buddy = {} as Buddy

  constructor(public modalControler: ModalController, public navParams: NavParams) { 
    console.log('buddy pass', this.navParams)
    this.buddy.buddyName = this.navParams.get('buddyName');
    this.buddy.buddyAge = this.navParams.get('buddyAge');
    this.buddy.buddyBreed = this.navParams.get('buddyBreed');
    this.buddy.buddyGender = this.navParams.get('buddyGender');
    this.buddy.buddyBday = this.navParams.get('buddyBday');

    //this.img = this.navParams.get('img');

    console.log('event', this.buddy)
  }
  
  ngOnInit() {
  }

  close() {
    this.modalControler.dismiss();
  }
}
