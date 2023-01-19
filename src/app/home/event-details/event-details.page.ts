import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Event } from 'src/app/models/event';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/services/auth/user/user.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event : Event;
  editedEvent = {edit_eventTitle: '', edit_eventDescription: '', edit_eventStartTime : '', edit_eventEndTime: '', edit_allDay: false}
  img = "../../../assets/img/gifblue.gif"

  start
  end
  minutesStart
  minutesEnd
  editMode = false;
  public ionicForm: FormGroup;
  edit_allDay
  
  edit_eventStartTime: string 
  edit_eventEndTime: string
  edit_eventTitle: ''

  constructor(public modalControler: ModalController, private alertCtrl: AlertController, public navParams: NavParams, private dataService: DataService, 
    public database: AngularFirestore, private userService: UserService, private formBuilder: FormBuilder ) { 
    this.event = this.navParams.get('ev');
    this.edit_allDay = this.event.allDay

    console.log('event edit ', this.event)

    this.img = this.navParams.get("img");
    this.start = new Date(this.event.startTime)
    this.edit_eventStartTime = this.start.toISOString()
    // save full start hour
    this.end = new Date(this.event.endTime)    // save full end hour
    this.edit_eventEndTime = this.end.toISOString()

    // EVENT EDITED
    // this.editedEvent.edit_eventTitle = this.event.title
    // this.editedEvent.edit_eventDescription = this.event.description
     this.editedEvent.edit_eventStartTime = this.edit_eventStartTime
     this.editedEvent.edit_eventEndTime = this.edit_eventEndTime
     this.editedEvent.edit_allDay = this.event.allDay
    // EVENT EDITED

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
    // this.ionicForm = this.formBuilder.group({
    //   id: [this.event.id],
    //   edit_eventTitle: ['', [Validators.minLength(2)]], 
    //   edit_eventDescription: [''],
    //   edit_eventEndTime: [this.edit_eventEndTime],
    //   edit_eventStartTime: [this.edit_eventStartTime],      
    //   edit_eventDay: [''],
    //   edit_eventMonth: [''],   
    //   edit_eventYear: [''],
    //   edit_eventAllDay: ['']
    // })
  }

  onToogleChange() {
    console.log('ALL DAY', this.editedEvent.edit_allDay)
    this.editedEvent.edit_allDay = !this.editedEvent.edit_allDay
  }

  saveEdit() {
  console.log("SAVE BUTTON ")
     let newEvent = JSON.parse(JSON.stringify(this.event)) as Event 
      console.log("edited event ", this.editedEvent)
      console.log("new event ", newEvent)

    if ((this.notEmpty(this.editedEvent.edit_eventTitle)) && (this.editedEvent.edit_eventTitle !== this.event.title)) {
      newEvent.title = this.editedEvent.edit_eventTitle
      console.log("update event title  '", this.event.title ,"' to ", this.editedEvent.edit_eventTitle)
    }

    if (this.notEmpty(this.editedEvent.edit_eventDescription) && (this.editedEvent.edit_eventDescription !== this.event.description)) {
      newEvent.description = this.event.description
      console.log("update event description  '", this.event.description ,"' to ", this.editedEvent.edit_eventDescription)
    }

    if (this.editedEvent.edit_eventStartTime !== this.event.startTime) {
      console.log("update event startime  '", this.event.startTime ,"' to ", this.editedEvent.edit_eventStartTime)
    }
    // this.start = new Date(this.event.startTime)

    if (this.editedEvent.edit_eventEndTime !== this.event.startTime) {
      console.log("update event endtime  '", this.event.startTime ,"' to ", this.editedEvent.edit_eventStartTime)
    }

    if (this.editedEvent.edit_allDay !== this.event.allDay) {
      console.log("update event endtime  '", this.event.allDay ,"' to ", this.editedEvent.edit_allDay)
    }

    console.log("new event ", newEvent)
    let subheader : string = "You're gonna update your event. Is everything correct?"
    let message : string = `<ul><li>  Title : ${this.editedEvent.edit_eventTitle}</li>
                            <li>Description : ${this.editedEvent.edit_eventDescription}</li>
                            <li>All day : ${this.editedEvent.edit_allDay}</li>
                            <li>Start Time : ${formatDate(this.editedEvent.edit_eventStartTime, 'dd-MM-yyyy', 'es-ES')}</li>
                            <li>End Time : ${formatDate(this.editedEvent.edit_eventEndTime, 'dd-MM-yyyy', 'es-ES')}</li>`

    this.presentAlert(message, "Update Event Info", subheader, this.editedEvent)

  }

  cancelEdit() {
    this.editMode = false;
  }

  notEmpty(val1) {
    return ((val1 !== "") && (val1.length > 2))
  }

  async presentAlert(message: string, header: string, subheader: string, eventNewInfo) {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = header;
    alert.subHeader = subheader;
    alert.message = message;
    alert.buttons = [
    {
      text: 'Cancel',
      handler: () => {
      }
    },
    {
      text: 'Save',
      handler: () => {
        console.log('Save option clicked ', this.event, ' eventnewinfo ', eventNewInfo)
        // this.animalService.updateBuddy(this.userService.user, this.buddy, buddyNewInfo).then(result => {
        //   this.modalControler.dismiss(null)           
        // })
      }
    }
   ];
    //document.body.appendChild(alert);
    await alert.present();
  }

}


