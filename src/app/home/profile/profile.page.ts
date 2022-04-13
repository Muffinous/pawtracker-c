import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonInfiniteScroll, ModalController, ToastController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { UserService } from 'src/app/services/auth/user/user.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';
import { BuddyPage } from '../buddy/buddy.page';
import { Camera, CameraResultType } from '@capacitor/camera';
import { CameraService } from 'src/app/services/camera/camera.service';

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
  constructor(private router: Router, private userService: UserService, private animalService: AnimalService, private toastController: ToastController, 
    public modalController: ModalController, private actionSheetCtrl: ActionSheetController, private cameraService: CameraService) {
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

  changePhoto() {
    console.log('changepic')
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


  async presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Select Photo',
          role: 'selected',
          handler: () => {
            this.cameraService.pickImage(0)
            console.log('Select Photo clicked');
          }
        }, {
          text: 'Take Photo',
          role: 'selected',
          handler: () => {
            this.cameraService.pickImage(1)
            console.log('Take Photo clicked');        
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    (await actionSheet).present();
  }

  onFileChoose(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const pattern = /image-*/;
    const reader = new FileReader();

    if (!file.type.match(pattern)) {
      console.log('File format not supported');
      return;
    }

    reader.onload = () => {
      var photo = reader.result.toString();
    };
    reader.readAsDataURL(file);

  }
}
