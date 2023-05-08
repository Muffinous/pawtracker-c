import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { UserService } from 'src/app/services/auth/user/user.service';
import { AdoptModalComponent } from './adopt-modal/adopt-modal.component';
import { BuddyContactPage } from './buddy-contact/buddy-contact.page';

@Component({
  selector: 'app-adopt',
  templateUrl: './adopt.page.html',
  styleUrls: ['./adopt.page.scss'],
})
export class AdoptPage implements OnInit {
  public ionicForm: FormGroup;

  mybuddiesAdopt = [];
  buddiesInAdoption = [];
  buddy = {};

  constructor(private modalCtrl: ModalController, private formBuilder: FormBuilder, private animalService: AnimalService, 
    public modalController: ModalController, private userService: UserService) {
    this.mybuddiesAdopt = this.animalService.userAnimalsAdoption
    this.buddiesInAdoption = this.animalService.buddiesInAdoption
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
   -
    modal.onDidDismiss().then((result) => {
      this.animalService.loadUserBuddiesAdoption(this.userService.user);
      this.animalService.loadBuddiesinAdoption();
      console.log("After new adoption modal", result);
      if (result) {
        // let eventData = result.data.animals;  
        // this.mybuddiesAdopt = eventData;  
      }
    }).catch((error) => {
      console.log('Error getting newAdoption() result', error)
      return error
    });
  }

  async onAnimalSelected(buddy) {
      this.buddy = buddy
      console.log('buddy', buddy)
      const modal = await this.modalController.create({
        component: BuddyContactPage,
        componentProps: buddy
      })
      await modal.present()
      
      modal.onDidDismiss().then((result) => {
        this.animalService.loadUserBuddiesAdoption(this.userService.user);
        this.animalService.loadBuddiesinAdoption();
        console.log("After buddy contact modal", result);
        if (result) {
          this.mybuddiesAdopt = this.animalService.userAnimalsAdoption
          this.buddiesInAdoption = this.animalService.buddiesInAdoption
          console.log('mybuddiesAdopt ', this.mybuddiesAdopt)
          console.log('buddiesInAdoption ', this.buddiesInAdoption)

        }
      }).catch((error) => {
        console.log('Error loading info after BuddyContactPage result', error)
        return error
      });
    }

}
