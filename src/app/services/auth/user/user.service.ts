import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/models/user';
import { DataService } from '../../data.service';
import { Event } from 'src/app/models/event';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = {} as User
  eventSource: Event[] = []

  constructor(public database: AngularFirestore, private dataService: DataService) { }
 
  loadEvents() {
    console.log("Loading user events ", this.user.username)
    this.database.collection(`/users/${this.user.username}/events/`).get().subscribe(snapshot => { // load all events from user DB
      snapshot.forEach(snap => {
        let event:any = snap.data()         
        // console.log('constructor event ', event)
        event.startTime = event.startTime.toDate()
        event.endTime = event.endTime.toDate()
        this.dataService.addEvent(event)
      })
      this.eventSource = this.dataService.getAllEvents(); // loadd events in calendar
      let events = this.eventSource;
      // console.log("eventsource ", this.eventSource)
      setTimeout(() => {
        this.eventSource = events;
      });  
    })
  }



}
