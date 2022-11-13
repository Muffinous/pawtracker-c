import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { AdoptModalComponent } from './adopt-modal/adopt-modal.component';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.page.html',
  styleUrls: ['./adopt.page.scss'],
})
export class AdoptPage implements OnInit {
  public ionicForm: FormGroup;

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
  mybuddiesAdopt = [];

  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder, private animalService: AnimalService) {
    this.mybuddiesAdopt = this.animalService.userAnimalsAdoption
    console.log("mybuddiesAdoption ", this.mybuddiesAdopt)
   }

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
      console.log("After new adoption modal", result);
      if (result) {
        let eventData = result.data.animals;  
        this.mybuddiesAdopt = eventData;  
      }
    }).catch((error) => {
      console.log('Error getting newAdoption() result', error)
      return error
    });
  }

}
