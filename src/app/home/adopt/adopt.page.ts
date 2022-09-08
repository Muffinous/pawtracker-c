import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AdoptModalComponent } from './adopt-modal/adopt-modal.component';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.page.html',
  styleUrls: ['./adopt.page.scss'],
})
export class AdoptPage implements OnInit {

  data = [
    {
      img: "slide-1.jpg", 
      title: "know always where your buddy is!", 
      description: "Don't worry about your buddy, <b>always</b> be aware of where he is."
    }, 
    {
      img: "slide-2.jpg", 
      title: "know always where your buddy is!", 
      description: "Track every step. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }, 
    {
      img: "slide-1.jpg", 
      title: "know always where your buddy is!", 
      description: "Donec eget est ultrices, tincidunt orci in, venenatis magna. Suspendisse mattis congue tempor."
    }
  ]

  
  buddies = [
    {
      img: "slide-1.jpg", 
      name: "buddy1", 
    }, 
    {
      img: "slide-2.jpg", 
      name: "buddy2", 
    }, 
    {
      img: "slide-1.jpg", 
      name: "buddy3", 
    },
    {
      img: "slide-1.jpg", 
      name: "buddy4", 
    },
    {
      img: "slide-1.jpg", 
      name: "buddy5", 
    },
    {
      img: "slide-1.jpg", 
      name: "buddy6", 
    },
    {
      img: "slide-1.jpg", 
      name: "buddy7", 
    }
  ]

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
  }

  async newAdoption() {
    const modal = await this.modalCtrl.create({
      component: AdoptModalComponent,
      cssClass: 'cal-modal',
      backdropDismiss: false,
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      // if (result.data.event) {
      //   let eventData = result.data.event;    
      //   if (eventData.allDay) { // manage if event is allday or not
      //     eventData.startTime = new Date(this.selectedDate)
      //     eventData.endTime = new Date(this.selectedDate)
      //   } else {
      //     eventData.allDay = false
      //     eventData.startTime = new Date(eventData.startTime)
      //     eventData.endTime = new Date(eventData.endTime)    
      //   }
      //   this.saveEventDB(eventData) // save new event to firebase db

      //   this.dataService.addEvent(eventData) // makes the push to array
      //   this.userService.eventSource = this.dataService.getAllEvents(); // return array with all of the events

      //   let events = this.userService.eventSource;
      //   this.userService.eventSource = [];
      //   setTimeout(() => {
      //     this.userService.eventSource = events;
      //   });      
      // }
      // this.myCal.update()
      // this.myCal.loadEvents()
    }).catch((error) => {
      console.log('Error getting openAnimalModal() result', error)
      return error
    });
  }
  

}
