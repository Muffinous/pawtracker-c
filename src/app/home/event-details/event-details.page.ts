import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Event } from 'src/app/models/event';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event = {} as Event;
  img: string

  constructor(public modalControler: ModalController, public navParams: NavParams) { 
    this.event.title = this.navParams.get('title');
    this.event.description = this.navParams.get('description');
    //this.img = this.navParams.get('img');
    this.event.startTime = this.navParams.get('startTime');
    this.event.endTime = this.navParams.get('endTime');
    console.log('event', this.event)
  }

  ngOnInit() {
  }

  close() {
    this.modalControler.dismiss();
  }

}