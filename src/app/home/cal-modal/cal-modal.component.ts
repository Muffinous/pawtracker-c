import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Event } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { DataService } from '../../services/data.service';

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
    console.log('save in calmodal', this.event)
    this.user.username = this.authService.getCurrentUsername()
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

  // getUserEvents() {
  //   this.user.username = this.authService.getCurrentUsername()
  //   console.log('calmodal getuserev', this.user.username)
  //   this.db.collection(`/users/${this.user.username}/events/`).get().forEach(snapshot => { // get all events 4 that user
  //     const evs = [];
  //     console.log('first', snapshot)
  //     snapshot.forEach(doc => {
  //         const ev = { [doc.id]: doc.data()}
  //         evs.push(ev)
  //     })
  //     console.log(evs)
  //   })
  // }
}
