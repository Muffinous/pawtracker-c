import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }
  date: Date;

  setSelectedDate(data) {
    console.log("service ", data)
      this.date = data;
  }

  getSelectedDate(){
     return this.date;
  }
}
