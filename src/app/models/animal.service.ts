import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {
  buddyname: string
  buddyage: number
  buddyGender: string
  buddyBreed: []
  buddyBday: string
  
  constructor() { }
}
