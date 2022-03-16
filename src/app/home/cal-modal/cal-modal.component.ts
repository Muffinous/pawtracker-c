import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Event } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { DataService } from '../../services/data.service';
import { UserService } from 'src/app/services/auth/user/user.service';

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

  constructor(private userService: UserService, public db: AngularFirestore, private modalCtrl: ModalController, public navCtrl: NavController, private dataService: DataService, private authService: AuthService) { 
    console.log(this.dataService.selectedDate)
    this.event.startTime = this.dataService.selectedDate.toISOString()
    this.event.endTime = this.dataService.selectedDate.toISOString()
    console.log('constr', this.event.startTime)
  }
 
  ngOnInit() {
    // this.getUserEvents(this.userService.user.username)
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
    this.event.month = this.monthNames[seldate.getMonth()]; // get the name -> this.monthNames[seldate.getMonth()];
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
    console.log('event to save', this.event)
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onToogleChange() {
    console.log('ALL DAY', this.event.allDay)
    this.event.allDay = !this.event.allDay
  }

  startTimeSelected(ev) {
    console.log('Selected time', this.event.startTime)
    // let time = new Date(this.event.startTime)
    // time.setDate(this.event.day)
    // // time.setMonth(this.event.month)
    // // time.setFullYear(this.event.year, this.event.month, this.event.day)
    // console.log('time', time)
  }

  endTimeSelected(ev) {
    // console.log('Selected time', this.event.endTime.setDate(7))
    // let time = new Date(this.event.endTime)
    // time.setDate(this.event.day)
    // // time.setMonth(this.event.month)
    // // time.setFullYear(this.event.year, this.event.month, this.event.day)
    // console.log('time', time)
  }

  close() {
    this.modalCtrl.dismiss();
  }

}

