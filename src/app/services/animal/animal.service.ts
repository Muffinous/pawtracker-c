import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Buddy } from 'src/app/models/buddy';
import { UserService } from '../auth/user/user.service';

@Injectable({
  providedIn: 'root'
})

export class AnimalService {
  buddyname: string
  buddyage: number
  buddyGender: string
  buddyBreed: []
  buddyBday: string
  userAnimals = [];

  constructor(public database: AngularFirestore, private userService: UserService) { }

  async loadUserBuddies(username: string) {

    await this.database.collection(`/users/${username}/buddies/`).get()
    .forEach(snapshot => { // get all buddies 4 that user
      //console.log('snapshot', snapshot.docs.map(snapshot => snapshot.data()))
      snapshot.forEach(doc => {
          const animal = doc.data() as Buddy
          var index = this.userAnimals.findIndex(x => x.buddyName == animal.buddyName); 
          // console.log('index ', index, 'for animal', animal.buddyName)
          if(index === -1) {
            this.userAnimals.push(animal)
          }
      })
      console.log('ARRAY ANIMALS', this.userAnimals)
    })
  }

  getBuddyImage(buddyName: string):  Promise<any>{
    let buddypic
    return this.database.doc(`/users/${this.userService.user.username}/buddies/${buddyName}`).ref.get().then(snapshot => {
      if (snapshot.exists) {
        const buddy = snapshot.data() as Buddy       
        buddypic = buddy.buddyPic
        return buddypic
      } else {
        return 'Error loading image. Please restart.'
      }
      })
  }
}

async function presentAlert(message: string) {
  const alert = document.createElement('ion-alert');
  alert.cssClass = 'my-custom-class';
  alert.header = 'Error';
  alert.message = message;
  alert.buttons = ['OK'];

  document.body.appendChild(alert);
  await alert.present();
}