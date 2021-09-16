import { Component, Inject, LOCALE_ID, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import locale from '@angular/common/locales/es';
import { formatDate, registerLocaleData } from '@angular/common';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ModalController } from '@ionic/angular';
import { CalModalPage } from '../cal-modal/cal-modal.page';

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
  eventSource = []; 
  viewTitle: string;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  }
  selectedDate = new Date();

  @ViewChild(CalendarComponent) myCal: CalendarComponent;
  // calendar shit

  public modalController: ModalController

  constructor(private db: AngularFirestore,private alertCtrl: AlertController, private modalCtrl: ModalController, @Inject(LOCALE_ID) private locale: string,  ) {
    this.db.collection(`events`).snapshotChanges().subscribe(colSnap => {
      this.eventSource = [];
      colSnap.forEach(snap => {
        let event:any = snap.payload.doc.data();
        event.id = snap.payload.doc['id'];
        this.eventSource.push(event);
      });
    });  
  }

  ngOnInit() {
    registerLocaleData(locale);
    this.loadMap();
  }

  loadMap() {
    const mapEle: HTMLElement = document.getElementById('map');
    console.log(mapEle);
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
    console.log(title);
  }

  onEventSelected(event) {
    console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title); 
  }

  onTimeSelected(ev) {
    console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  onCurrentDateChanged(event: Date) {
    console.log('current date change: ' + event);
  }

  onRangeChanged(ev) {
    console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }

  async openCalModal() {
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        if (event.allDay) {
          let start = event.startTime;
          event.startTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate()
            )
          );
          event.endTime = new Date(
            Date.UTC(
              start.getUTCFullYear(),
              start.getUTCMonth(),
              start.getUTCDate() + 1
            )
          );
        }
        this.eventSource.push(result.data.event);
        this.myCal.loadEvents();
      }
    });
  }
  async addNewEvent(event) {

    let now = formatDate(new Date(), "medium", this.locale);
    let end = formatDate(new Date(), "medium", this.locale);

    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: event.desc,
      message: 'From: ' + now + '<br><br>To: ' + end,
      buttons: ['OK'],
    });
    alert.present();

    // end.setMinutes(end.getMinutes() + 60);
    // let event = {
    // title: 'Event #' + now.getMinutes(), 
    // startTime: now,
    // endTime: end,
    // allDay: true
    // }
    console.log(event);
 //   this.db.collection(`events`).add(event);
  }
}
