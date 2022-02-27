import { Component, AfterViewInit } from '@angular/core';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { DataService } from '../data.service';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { doc, setDoc } from 'firebase/firestore';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})

export class CalModalPage implements AfterViewInit {
  viewTitle: string;
  images: any[] = [];

  event = {
    title: '',
    desc: '',
    day: 1,
    month: 'September',
    year: 2020,
    startTime: '1990-02-19T07:43Z',
    allDay: true
  };
 
  monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December' ];
  modalReady = false;
 
  constructor(private db: Firestore, private modalCtrl: ModalController, public navCtrl: NavController, private dataService: DataService) { 
    const collect = collection(db, 'events');
    //this.event = collectionData(collect)
  }
 
  ngOnInit() {
    this.setDate(this.dataService.getSelectedDate());
    this.getBuddiesImages();
    console.log(this.images);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }
 
  setDate(seldate: Date) {
    console.log("cal ", seldate);
    this.event.day = seldate.getDate();
    this.event.month = this.monthNames[seldate.getMonth()];
    this.event.year = seldate.getFullYear();
  }

  getBuddiesImages() {
    this.images[0] = "../../assets/img/slide-1.jpg";
    this.images[1] = "../../assets/img/slide-2.jpg";
    this.images[2] = "../../assets/img/slide-2.jpg";
    this.images[3] = "../../assets/img/slide-2.jpg";
    this.images[4] = "../../assets/img/slide-2.jpg";
    this.images[5] = "../../assets/img/slide-2.jpg";
  }

  async save() {    
    console.log(this.event.startTime)   

    this.modalCtrl.dismiss({event: this.event})
    console.log(this.event)
    await setDoc(doc(this.db, "event", this.event.title), this.event)
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 

  onTimeSelected(ev) {
    console.log('hiya')
    console.log('Selectedd time: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  close() {
    this.modalCtrl.dismiss();
  }
}