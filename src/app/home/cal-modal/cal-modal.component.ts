import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Event } from 'src/app/models/event';
import { User } from 'src/app/models/user';
import { DataService } from '../../services/data.service';
import { UserService } from 'src/app/services/auth/user/user.service';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.component.html',
  styleUrls: ['./cal-modal.component.scss'],
})
export class CalModalComponent implements OnInit {

  viewTitle: string;
  images: any[] = [];
  // user = {} as User
  event = {} as Event

  monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December' ];
  modalReady = false;

  constructor(private userService: UserService, private animalService: AnimalService, public db: AngularFirestore, private modalCtrl: ModalController, public navCtrl: NavController, private dataService: DataService, private authService: AuthService, private storage: AngularFireStorage) { 
    this.event.startTime = this.dataService.selectedDate.toISOString()
    this.event.endTime = this.dataService.selectedDate.toISOString()

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
    let animals = this.userService.user.nAnimals
    let i
    let animalsArray = this.animalService.userAnimals

    for(i=0; i<animals; i++) {
      console.log('animals array ', animalsArray[i])
      const imageRef = this.storage.ref(animalsArray[i].buddyPic)
      
      imageRef.child(animalsArray[i].buddyPic).getDownloadURL()

      this.images[i] = animalsArray[i].buddyPic; // this.userService.
    }
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

  close() {
    this.modalCtrl.dismiss();
  }

}

