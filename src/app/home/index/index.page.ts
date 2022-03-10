import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import locale from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { AlertController, ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { CalModalComponent } from '../cal-modal/cal-modal.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Event } from 'src/app/models/event';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';

declare var google;

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})

export class IndexPage implements OnInit {
  map = null;
  @ViewChild('mapElement') mapElement;
  public folder: string;
  rootPage:any = 'TabsPage';
  
  // calendar shit
  eventSource: Event[] = []
  viewTitle: string
  user = {} as User

  dateRange: { from: string; to: string; }
  type: 'string'
  calendar = {
    mode: 'month',
    currentDate: new Date()
  }
  selectedDate = new Date();

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
 // @ViewChild(CalModalComponent) calModal: CalModalComponent;
  // calendar shit
  public modalController: ModalController

  constructor(public db: AngularFirestore, private alertCtrl: AlertController, private modalCtrl: ModalController, 
    @Inject(LOCALE_ID) private locale: string, private dataService: DataService, private authService: AuthService, ) {

  }

  ngOnInit() {    
    //this.calModal.getUserEvents()
    this.getUserEvents(this.user.username)
    registerLocaleData(locale);
    //this.loadMap();
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    const myLatLng = { lat: -34.397, lng: 150.644};
    this.map = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12
    });

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      mapEle.classList.add('show-map');
    });
  }

  // calendar events

  onViewTitleChanged(title) {
    // console.log(title);
  }

  onEventSelected(event) {
    // console.log('Event selected INDEX :' + event.startTime + '-' + event.endTime + ',' + event.title); 
  }

  onTimeSelected(ev) {
    this.selectedDate = ev.selectedTime;
    // console.log('Selected time INDEX : ' + ev.selectedTime + ', hasEvents: ' +
    //   (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event) {
    this.selectedDate = event.selectedTime
   // console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    // console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  async openCalModal() {
    this.dataService.setSelectedDate(this.selectedDate);
    const modal = await this.modalCtrl.create({
      component: CalModalComponent,
      cssClass: 'cal-modal',
      backdropDismiss: false,
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let eventData = result.data.event;
        console.log('EVENTDATA', eventData)
        if (eventData.allDay) { // manage if event is allday or not
          eventData.startTime = new Date(this.selectedDate);
          eventData.endTime = new Date(this.selectedDate)
        } else {
          eventData.startTime = new Date(result.data.event.startTime);
          eventData.endTime = new Date(result.data.event.endTime)          
        }

        console.log('event', eventData)
        this.dataService.addEvent(eventData) // makes the push to array
        this.eventSource = this.dataService.getAllEvents(); // ARRAY
        console.log('EVENTSOURCE', this.eventSource)
        let events = this.eventSource;
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });      
      }
      this.myCal.update()
      this.myCal.loadEvents()
    }).catch((error) => {
      console.log('Error getting openCalModal() result', error)
      return error
    });
  }

  getUserEvents(username) {
    this.db.collection(`/users/${username}/events/`).get().forEach(snapshot => { // get all events 4 that user
      const evs = [];
      snapshot.forEach(doc => {
          let ev
          ev = doc.data()
          //this.dataService.addEvent(ev)
          evs.push(ev)
      })
    }).catch((error) => {
      console.log('Error getting users events', error)
      return error
    });    
       this.eventSource = this.dataService.getAllEvents(); // ARRAY
      //  console.log('eventsource', this.eventSource)
      // let events = this.eventSource;
      // this.eventSource = [];
      // setTimeout(() => {
      //   this.eventSource = events;
      // }); 
      // this.myCal.update()
      // this.myCal.loadEvents()
  }
}
