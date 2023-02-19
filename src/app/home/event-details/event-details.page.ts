import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Event } from 'src/app/models/event';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserService } from 'src/app/services/auth/user/user.service';
import { DataService } from 'src/app/services/data.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  event : Event;
  editedEvent = {} as Event

  // editedEvent = {edit_eventTitle: '', edit_eventDescription: '', edit_eventStartTime : '', edit_eventEndTime: '', edit_allDay: false}
  img = "../../../assets/img/gifblue.gif"
  monthNames = [ 'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December' ];
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

    console.log('event to edit ', this.event)

    this.img = this.navParams.get("img");
    this.start = new Date(this.event.startTime)
    this.edit_eventStartTime = this.start.toISOString()
    // save full start hour
    this.end = new Date(this.event.endTime)    // save full end hour
    this.edit_eventEndTime = this.end.toISOString()

    // EVENT EDITED
      this.editedEvent.startTime = this.edit_eventStartTime
      this.editedEvent.endTime = this.edit_eventEndTime
      this.editedEvent.allDay = this.event.allDay
    // EVENT EDITED

    this.minutesConverter()
  }

  ngOnInit() {
  }

  setDate(seldate: Date) {
    this.event.day = seldate.getDate();
    this.event.month = this.monthNames[seldate.getMonth()]; // get the name -> this.monthNames[seldate.getMonth()];
    this.event.year = seldate.getFullYear();
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
  }

  onToogleChange() {
    console.log('ALL DAY', this.editedEvent.allDay)
    this.editedEvent.allDay = !this.editedEvent.allDay
  }

  saveEdit() {  
     let newEvent = JSON.parse(JSON.stringify(this.event)) as Event 

     newEvent.startTime = this.event.startTime
      newEvent.endTime = this.event.endTime

    if ((this.notEmpty(this.editedEvent.title)) && (this.editedEvent.title !== this.event.title)) {
      newEvent.title = this.editedEvent.title
    }

    if (this.notEmpty(this.editedEvent.description) && (this.editedEvent.description !== this.event.description)) {
      newEvent.description = this.editedEvent.description
    }

    let start_oldDate = new Date(this.event.startTime)
    let start_newDate = new Date(this.editedEvent.startTime)

    if (start_oldDate.getTime() !== start_newDate.getTime()) {
      newEvent.startTime = start_newDate
    }

    let end_oldDate = new Date(this.event.endTime)
    let end_newDate = new Date(this.editedEvent.endTime)

    if (end_oldDate.getTime() !==  end_newDate.getTime()) {
      newEvent.endTime = end_newDate
    }

    
    if (this.editedEvent.allDay !== this.event.allDay) {
      newEvent.allDay = this.editedEvent.allDay
    }

    // console.log("new event ", newEvent)
    let subheader : string = "You're gonna update your event. Is everything correct?"
    let message : string = `<ul><li>  Title : ${newEvent.title}</li>
                            <li>Description : ${newEvent.description}</li>
                            <li>All day : ${newEvent.allDay}</li>
                            <li>Start Time : ${formatDate(newEvent.startTime, 'dd-MM-yyyy HH:mm', 'es-ES')}</li>
                            <li>End Time : ${formatDate(newEvent.endTime, 'dd-MM-yyyy HH:mm', 'es-ES')}</li>`

    this.presentAlert(message, "Update Event Info", subheader, newEvent)

  }

  cancelEdit() {
    this.editMode = false;
  }

  notEmpty(val1: String) {
    if ((val1 !== "") && (val1 !== undefined)) {
        return (val1.length > 2)
    } 
    return false
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
        // console.log('Save option clicked ', this.event, ' eventnewinfo ', eventNewInfo)
         this.dataService.updateEvent(this.userService.user, this.event, eventNewInfo).then(result => {
           this.modalControler.dismiss(null)           
         })
      }
    }
   ];
    document.body.appendChild(alert);
    await alert.present();
  }

}


