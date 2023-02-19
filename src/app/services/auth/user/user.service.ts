import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/models/user';
import { DataService } from '../../data.service';
import { Event } from 'src/app/models/event';
import { IonLoaderService } from '../../ion-loader.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user = {} as User
  eventSource: Event[] = []

  constructor(public database: AngularFirestore, private dataService: DataService, private ionloaderService: IonLoaderService) { }
 
  loadEvents() {
    console.log("Loading user events ", this.user)
    this.database.collection(`/users/${this.user.id}/events/`).get().subscribe(snapshot => { // load all events from user DB
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

  updateUser(user: User, newInfoUser : User) {
    return this.database.doc(`/users/${user.id}`).update(newInfoUser).then(() => {
      this.addUserService(newInfoUser)
      this.ionloaderService.autoLoader('Buddy updated');
      console.log('User updated ')
    })
  }

  addUserService(loggedUser: User) {
    console.log('ADD USER SERVICE', loggedUser)
    this.user.id = loggedUser.id
    this.user.email = loggedUser.email
    this.user.uid = loggedUser.uid
    this.user.name = loggedUser.name
    this.user.surname = loggedUser.surname
    this.user.emailVerified = loggedUser.emailVerified
    this.user.username = loggedUser.username
    this.user.nAnimals = loggedUser.nAnimals
  }
}
