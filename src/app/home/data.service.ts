import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  events = [] as Event[]

  constructor() { }
  selectedDate: Date;

  setSelectedDate(data) {
   // let preselectedDate = moment(data.format());
    console.log("service ", data, '->')
    this.selectedDate = data;
  }

  getSelectedDate(){
     return this.selectedDate;
  }

  
  addEvent(event: Event){
    this.events.push(event);
  }

  getAllEvents():Event[]{  
    return this.events;
  }

}
