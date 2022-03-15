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
  private profilePage: ProfilePage

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

  async getUserBuddies(username: string) {
    console.log('searching buddies 4', username)
    const animals = [];

    const query = await this.database.collection(`/users/${username}/buddies/`).get()
    query.forEach(snapshot => { // get all events 4 that user
      console.log('first', snapshot)
      snapshot.forEach(doc => {
          const animal = doc.data()
          animals.push(animal)
      })
      console.log('ARRAY ANIMALS', animals)
    })
    return animals
    }
    // this.database.collection(`/users/${username}/buddies/`).get().then(snapshot => {
    //   if (snapshot.docs) {
    //     console.log(snapshot.docs)
    //   }
    // })
}
