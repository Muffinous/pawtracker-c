import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Event } from '../models/event';
import { User } from '../models/user';
import { UserService } from './auth/user/user.service';
import { IonLoaderService } from './ion-loader.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  events = [] as Event[]

  constructor(public database: AngularFirestore, private ionloaderService: IonLoaderService) { }
  selectedDate: Date;

  setSelectedDate(data) {
    this.selectedDate = data;
  }

  getSelectedDate(){
     return this.selectedDate;
  }

  
  addEvent(event){
    this.events.push(event);
  }

  deleteEvent(event){
    this.events.forEach((value,index)=>{
      if(value.id===event) {
        this.events.splice(index,1); // removes element from array this.events
      } 
    });
  }

  getAllEvents():Event[]{  
    return this.events;
  }

  updateEvent(user: User, oldEvent: Event, newEvent: Event) {
    console.log("NUEVO EVENTO CON EDITS ", newEvent)
      return this.database.doc(`/users/${user.id}/events/${oldEvent.id}`).update(newEvent).then(() => {
        console.log("array antes ", this.events)
        this.events.forEach((item, index, array) => { 
          if(array[index].id === oldEvent.id ) {
            console.log("son iguales ")
            array[index] = newEvent
  
          };
          console.log('array despues ', this.events)
          this.ionloaderService.autoLoader('Buddy updated');
        })
  
    })
  }
}
