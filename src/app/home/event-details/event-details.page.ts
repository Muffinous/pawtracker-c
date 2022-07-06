import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Event } from 'src/app/models/event';
import { AnimalService } from 'src/app/services/animal/animal.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event : Event;
  img = "../../../assets/img/gifblue.gif"

  start
  end
  minutesStart
  minutesEnd

  constructor(public modalControler: ModalController, public navParams: NavParams, private animalService: AnimalService) { 
    this.event = this.navParams.get('ev');
    console.log('ev', this.event)
    this.img = this.navParams.get("img");
    this.start = new Date(this.event.startTime) // save full start hour
    this.end = new Date(this.event.endTime)    // save full end hour
    this.minutesConverter()
  }

  ngOnInit() {
    console.log('IMG', this.img)
  }

  close() {
    this.modalControler.dismiss();
  }

  minutesConverter() {
    // MINUTES CONVERSION. IF THERE IS ONLY 1 DIGIT --> CONVERT TO TWO DIGITS. 0 MINUTES -> 00 MINUTES
    this.minutesStart = this.start.getMinutes()
    this.minutesEnd = this.end.getMinutes()
  
    // (this.start.getMinutes()<10?'0':'') + this.start.getMinutes()  // if getMinutes() is less than 10, return a 0, if greater, return an empty string
        if (this.minutesStart < 10) {
      this.minutesStart = '0' + this.minutesStart
    } 
    if (this.minutesEnd < 10) {
      this.minutesEnd = '0' + this.minutesEnd
    } 
    // MINUTES CONVERSION. IF THERE IS ONLY 1 DIGIT --> CONVERT TO TWO DIGITS. 0 MINUTES -> 00 MINUTES
  }
}
