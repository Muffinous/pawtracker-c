import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import locale from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { DataService } from '../../services/data.service';
import { CalModalComponent } from '../cal-modal/cal-modal.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Event } from 'src/app/models/event';
import { AuthService } from 'src/app/services/auth/auth.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/auth/user/user.service';
import { EventDetailsPage } from '../event-details/event-details.page';
import { AnimalService } from 'src/app/services/animal/animal.service';

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

  constructor(private userService: UserService , public db: AngularFirestore, private modalCtrl: ModalController, 
     private dataService: DataService, private authService: AuthService, private animalService: AnimalService ) {

      this.userService.loadEvents();
  }

  ngOnInit() {    
    registerLocaleData(locale);
  }

  // calendar events

  onViewTitleChanged(title) { // changes the month title
    this.currentMonth = title
  }

  async onEventSelected(ev) {
    this.newEvent = ev as Event
    let img
    this.animalService.getBuddyImage(this.newEvent.buddyName).then(function(buddypic) {      
      img = buddypic
    }).then(res => {
      this.showModalEvent(ev, img)
    })
  }

  async showModalEvent(ev, img) {
    const modal = await this.modalCtrl.create({
      component: EventDetailsPage,
      componentProps: {ev, img}
    })

    await modal.present();
   
    modal.onDidDismiss().then(() => {

      this.userService.eventSource = this.dataService.getAllEvents(); // return array with all of the events
      this.myCal.loadEvents()

      this.myCal.update()
      this.myCal.loadEvents()
    }).catch((error) => {
      console.log('Error getting openCalModal() result', error)
      return error
    });
  }
  
  onTimeSelected(ev) {    
    this.selectedDate = ev.selectedTime;
    this.currentDate = this.selectedDate.toDateString()
  }

  onCurrentDateChanged(event) {
    this.selectedDate = event.selectedTime
  }

  onRangeChanged(ev) {
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
        if (eventData.allDay) { // manage if event is allday or not
          eventData.startTime = new Date(this.selectedDate)
          eventData.endTime = new Date(this.selectedDate)
        } else {
          eventData.allDay = false
          eventData.startTime = new Date(eventData.startTime)
          eventData.endTime = new Date(eventData.endTime)    
        }
        this.saveEventDB(eventData) // save new event to firebase db

        this.dataService.addEvent(eventData) // makes the push to array
        this.userService.eventSource = this.dataService.getAllEvents(); // return array with all of the events

        let events = this.userService.eventSource;
        this.userService.eventSource = [];
        setTimeout(() => {
          this.userService.eventSource = events;
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
      alert.message = message;
      alert.buttons = ['OK'];
    
      document.body.appendChild(alert);
      await alert.present();
  }

  }
