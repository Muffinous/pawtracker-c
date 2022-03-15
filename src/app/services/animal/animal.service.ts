import { SlicePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ProfilePage } from 'src/app/home/profile/profile.page';

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
    .forEach(snapshot => { // get all events 4 that user
      //console.log('snapshot', snapshot.docs.map(snapshot => snapshot.data()))
      snapshot.forEach(doc => {
          const animal = doc.data()        
          console.log('each animal', animal)
          this.userAnimals.push(animal)
      })
      console.log('ARRAY ANIMALS', this.userAnimals)
    })
    }
}
