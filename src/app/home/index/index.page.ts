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
import { UserService } from 'src/app/services/auth/user/user.service';
import { EventDetailsPage } from '../event-details/event-details.page';

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

  calendar = {
    mode: 'month',
    currentDate: new Date()
  }
  selectedDate = new Date();
  currentDate: string
  currentMonth: string
  newEvent

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private userService: UserService , public db: AngularFirestore, private alertCtrl: AlertController, private modalCtrl: ModalController, 
    @Inject(LOCALE_ID) private locale: string, private dataService: DataService, private authService: AuthService, ) {

      this.db.collection(`/users/testuser/events/`).get().subscribe(snapshot => { // load all events from user DB
        snapshot.forEach(snap => {
          let event:any = snap.data()         
          // console.log('constructor event ', event)
          event.id = snap.id
          event.startTime = event.startTime.toDate()
          event.endTime = event.endTime.toDate()
          this.dataService.addEvent(event)
        })
        this.eventSource = this.dataService.getAllEvents(); // loadd events in calendar
        let events = this.eventSource;
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });  
      })
  }

  ngOnInit() {    
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

  onViewTitleChanged(title) { // changes the month title
    this.currentMonth = title
  }

  async onEventSelected(ev) {
    this.newEvent = ev
    console.log('event', ev)
    const modal = await this.modalCtrl.create({
      component: EventDetailsPage,
      componentProps: ev
    })
    return await modal.present()
  }

  onTimeSelected(ev) {    
    this.selectedDate = ev.selectedTime;
    this.currentDate = this.selectedDate.toDateString()
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
      if (result.data.event) {
        let eventData = result.data.event;    
        console.log('event', eventData)
        console.log('ALL DAY', eventData.allDay)
        if (eventData.allDay) { // manage if event is allday or not
          eventData.startTime = new Date(this.selectedDate)
          eventData.endTime = new Date(this.selectedDate)
        } else {
          eventData.allDay = false
          eventData.startTime = new Date(eventData.startTime)
          eventData.endTime = new Date(eventData.endTime)    
        }
        console.log('ALL DAY 2', eventData.allDay)
        this.saveEventDB(eventData) // save new event to firebase db

        this.dataService.addEvent(eventData) // makes the push to array
        this.eventSource = this.dataService.getAllEvents(); // return array with all of the events

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

  saveEventDB(event) { // save the event in the database
    this.db.doc(`/users/${this.userService.user.username}`).ref.get().then(snapshot => {
      if (snapshot.exists) {
        this.db.doc(`/users/${this.userService.user.username}/events/${event.title}`).set(event).then(res => {
        }).catch(err => {
            console.log(err);
          });
      }
    }).catch((error) => {
      this.presentAlert(error)
    })
  }

  prevMonth() {
    this.myCal.slidePrev()
  }

  nextMonth() {
    this.myCal.slideNext()
  }

  today() { // set today date day calendar
    this.calendar.currentDate = new Date()
  }

  changeMode(mode){
    console.log('mode', mode)
    this.calendar.mode = mode
  }

  async presentAlert(message: string) {
      const alert = document.createElement('ion-alert');
      alert.cssClass = 'my-custom-class';
      alert.header = 'Error';
      // alert.subHeader = 'Subtitle';
      alert.message = message;
      alert.buttons = ['OK'];
    
      document.body.appendChild(alert);
      await alert.present();
  }

  monthString(month) {
    // months = ['January', 'February', '']
  }
  }
