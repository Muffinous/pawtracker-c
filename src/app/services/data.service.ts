import { Injectable } from '@angular/core';
import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  events = [] as Event[]

  constructor() { }
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

}
