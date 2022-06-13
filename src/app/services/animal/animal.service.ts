import { SlicePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProfilePage } from 'src/app/home/profile/profile.page';
import { Buddy } from 'src/app/models/buddy';

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

  constructor(public database: AngularFirestore) { }

  async loadUserBuddies(username: string) {
    console.log('searching buddies 4', username)

    await this.database.collection(`/users/${username}/buddies/`).get()
    .forEach(snapshot => { // get all buddies 4 that user
      //console.log('snapshot', snapshot.docs.map(snapshot => snapshot.data()))
      snapshot.forEach(doc => {
          const animal = doc.data() as Buddy
          console.log('animal', animal) 
          var index = this.userAnimals.findIndex(x => x.buddyName == animal.buddyName); 
          console.log('index ', index, 'for animal', animal.buddyName)
          if(index === -1) {
            console.log('New buddy', animal)          
            this.userAnimals.push(animal)
          }
      })
      console.log('ARRAY ANIMALS', this.userAnimals)
    })
    }
}
