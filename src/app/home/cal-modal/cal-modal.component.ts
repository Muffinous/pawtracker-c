import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Event } from 'src/app/models/event';
import { DataService } from '../../services/data.service';
import { UserService } from 'src/app/services/auth/user/user.service';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { LocalNotifications } from '@capacitor/local-notifications';

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
  selectedBuddy
  monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December' ];
  modalReady = false;
  animalsArray

  constructor(private userService: UserService, private animalService: AnimalService, public db: AngularFirestore, private modalCtrl: ModalController, 
    public navCtrl: NavController, private dataService: DataService) { 
    this.event.startTime = this.dataService.selectedDate.toISOString()
    console.log("start time cal modal ", this.dataService.selectedDate, "TOISO =", this.event.startTime)
    this.event.endTime = this.dataService.selectedDate.toISOString()

  }
 
  async ngOnInit() {
    await LocalNotifications.requestPermissions()

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
    this.animalsArray = this.animalService.userAnimals

    for(i=0; i<animals; i++) {
      this.images[i] = this.animalsArray[i].buddyPic;
      console.log('animals array ', this.animalsArray[i], 'foto', this.images[i])
    }
  }

  async save() { 
    console.log("event ", this.event) 
    console.log( (this.event.allDay || (this.event.startTime && this.event.endTime)) )
    if ((this.event.title) && (this.event.allDay || (this.event.startTime && this.event.endTime))) {
      let idEv = this.db.createId()
      this.event.id = idEv
      this.modalCtrl.dismiss({event: this.event})      
    } else {
      presentAlert("Please enter a title for your appointment.")
    }
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onToogleChange() {
    this.event.allDay = !this.event.allDay
  }

  close() {
    this.modalCtrl.dismiss();
  }

  onBuddyClicked(buddy) {
    console.log('buddy selected for date ', buddy)
    this.selectedBuddy = buddy.buddyName
    this.event.buddyId = buddy.id
    this.event.buddyName = this.selectedBuddy
    console.log(this.selectedBuddy)
  }
}

async function presentAlert(message: string) {
  console.log('alert')
  const alert = document.createElement('ion-alert');
  alert.cssClass = 'my-custom-class';
  alert.header = 'Error';
  // alert.subHeader = 'Subtitle';
  alert.message = message;
  alert.buttons = ['OK'];

  document.body.appendChild(alert);
  await alert.present();
}