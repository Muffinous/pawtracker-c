import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { Event } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { DataService } from '../data.service';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.component.html',
  styleUrls: ['./cal-modal.component.scss'],
})
export class CalModalComponent implements OnInit {

  viewTitle: string;
  images: any[] = [];
  user = {} as User
  event = {} as Event

  monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December' ];
  modalReady = false;

  constructor(public db: AngularFirestore, private modalCtrl: ModalController, public navCtrl: NavController, private dataService: DataService, private authService: AuthService) { 
  }
 
  ngOnInit() {
    //this.getAllEvents()
    this.setDate(this.dataService.getSelectedDate());
    this.getBuddiesImages();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;      
    }, 0);
  }
 
  setDate(seldate: Date) {
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
    this.modalCtrl.dismiss({event: this.event})
    console.log(this.event)
    this.user.username = this.authService.getCurrentUsername()
    console.log(this.user.username)
    this.db.doc(`/users/${this.user.username}`).ref.get().then(snapshot => {
      if (snapshot.exists) {
        this.db.doc(`/users/${this.user.username}/events/${this.event.title}`).set(this.event).then(res => {
          console.log('uploaded')      
        }).catch(err => {
            console.log(err);
          });
      }
    })
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onToogleChange() {
    console.log('ALL DAY', this.event.allDay)
    this.event.allDay = !this.event.allDay
  }

  onTimeSelected(ev) {
    console.log('Selected time COMPONENT: ' + ev.selectedTime + ', hasEvents: ' +
      (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
  }

  close() {
    this.modalCtrl.dismiss();
  }

  getAllEvents() {
    this.user.username = this.authService.getCurrentUsername()
    console.log(this.user.username)
    this.db.doc(`/users/${this.user.username}/events/`).ref.get().then(snapshot => {
      if (snapshot.exists) {
        console.log(snapshot.data)
        // this.db.doc(`/users/${this.user.username}/events/${this.event.title}`).set(this.event).then(res => {
        //   console.log('uploaded', res)      
        // }).catch(err => {
        //     console.log(err);
        //   });
      }
    })
  }
}
