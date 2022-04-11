import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { UserService } from 'src/app/services/auth/user/user.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { BuddyPage } from '../buddy/buddy.page';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = {} as User
  animals = []

  topLimit: number = 1
  showedAnimals = []

  length = 0;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  buddy = {}

  // userService is used in the html DO NOT TOUCH
  constructor(private router: Router, private userService: UserService, private animalService: AnimalService, private toastController: ToastController, public modalController: ModalController) {
       this.animals = this.animalService.userAnimals
       this.showedAnimals=this.animals.slice(0,1)     // add the first animal   
  }

  ngOnInit() {
    console.log('profile', this.animalService.userAnimals)      
    this.loadData()
  }

  loadData() {
    setTimeout(() => {  
      this.topLimit += 1
      this.showedAnimals = this.animals.slice(0, this.topLimit)
      this.infiniteScroll.complete()
      if (this.animals.length === this.showedAnimals.length){
        this.infiniteScroll.disabled        
        this.presentToast('No more data available', 2000);
        console.log('Done');  
      } else {
        console.log('No more data')
      }
       console.log('pushed', this.showedAnimals)
    }, 400);  
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      color: 'dark',
      duration: duration
    });
    toast.present();
  }

  async onAnimalSelected(buddy) {
    this.buddy = buddy
    console.log('buddy', buddy)
    const modal = await this.modalController.create({
      component: BuddyPage,
      componentProps: buddy
    })
    return await modal.present()
  }

}
