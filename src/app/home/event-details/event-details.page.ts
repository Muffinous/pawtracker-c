import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Event } from 'src/app/models/event';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/services/auth/user/user.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event : Event;
  img = "../../../assets/img/gifblue.gif"

  start
  end
  minutesStart
  minutesEnd
  editMode = false;
  public ionicForm: FormGroup;
  edit_allDay
  
  pickerStart: string 
  pickerEnd: string

  constructor(public modalControler: ModalController, private alertCtrl: AlertController, public navParams: NavParams, private dataService: DataService, 
    public database: AngularFirestore, private userService: UserService, private formBuilder: FormBuilder ) { 
    this.event = this.navParams.get('ev');
    this.edit_allDay = this.event.allDay

    console.log('event edit ', this.edit_allDay)

    this.img = this.navParams.get("img");
    this.start = new Date(this.event.startTime)
    this.pickerStart = this.start.toISOString()
    // save full start hour
    this.end = new Date(this.event.endTime)    // save full end hour
    this.pickerEnd = this.end.toISOString()

    this.minutesConverter()
  }

  ngOnInit() {
    //console.log('IMG', this.img)
  }

  close() {
    this.modalControler.dismiss();
  }

  minutesConverter() {
    // MINUTES CONVERSION. IF THERE IS ONLY 1 DIGIT --> CONVERT TO TWO DIGITS. 0 MINUTES -> 00 MINUTES
    this.minutesStart = this.start.getMinutes()
    this.minutesEnd = this.end.getMinutes()
  
    // (this.start.getMinutes()<10?'0':'') + this.start.getMinutes()  // if getMinutes() is less than 10, return a 0, if greater, return an empty string
        if (this.minutesStart < 10) {
      this.minutesStart = '0' + this.minutesStart
    } 
    if (this.minutesEnd < 10) {
      this.minutesEnd = '0' + this.minutesEnd
    } 
    // MINUTES CONVERSION. IF THERE IS ONLY 1 DIGIT --> CONVERT TO TWO DIGITS. 0 MINUTES -> 00 MINUTES
  }

  deleteEvent(){
    this.showConfirm();
  }

  showConfirm() {
    this.alertCtrl.create({
      header: 'Delete Event',
      subHeader: 'Beware lets confirm',
      message: 'Are you sure? You want to delete this event?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('I care about humanity');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.database.doc((`/users/${this.userService.user.id}/events/${this.event.id}`)).delete().then( res => {
              this.dataService.deleteEvent(this.event.id)
              this.modalControler.dismiss(null)                 
            })
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  editEvent() {
    this.editMode = true;
    this.ionicForm = this.formBuilder.group({
      id: [this.event.id],
      edit_eventTitle: ['', [Validators.minLength(2)]], 
      edit_eventDescription: [''],
      edit_eventEndTime: [this.pickerEnd],
      edit_eventStartTime: [this.pickerStart],      
      edit_eventDay: [''],
      edit_eventMonth: [''],   
      edit_eventYear: [''],
      edit_eventAllDay: [this.edit_allDay]
    })
  }

  onToogleChange() {
    console.log('ALL DAY', this.edit_allDay)
    this.edit_allDay = !this.edit_allDay
  }

}

