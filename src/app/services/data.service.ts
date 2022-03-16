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
    console.log("service ", data, '->')
    this.selectedDate = data;
  }

  getSelectedDate(){
     return this.selectedDate;
  }

  
  addEvent(event){
    this.events.push(event);
    
    console.log('new event added array', this.events)
  }

  getAllEvents():Event[]{  
    return this.events;
  }

}
