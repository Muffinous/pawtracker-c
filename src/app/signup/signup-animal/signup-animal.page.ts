import { Component, ContentChild, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { AnimalService } from 'src/app/models/animal.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup-animal',
  templateUrl: './signup-animal.page.html',
  styleUrls: ['./signup-animal.page.scss'],
})
export class SignupAnimalPage implements OnInit {

  @ContentChild(IonInput) input: IonInput;
  public ionicForm: FormGroup;
  breeds: string[] = [
    'Abyssinian',
    'American Bobtail',
    'American Curl',
    'American Shorthair',
    'American Wirehair',
    'Balinese-Javanese',
    'Bengal',
    'British Shorthair',
    'Himalayan',
    'Maine Coon',
    'Munchkin',
    'Norwegian',
    'Ocicat',
    'Persian',
    'Russian Blue',
    'Scottish',
    'Siamese',
    'Siberian',
    'Somali',
    'Sphynx',
    'Turkish Angora'
  ]
  user = {} as User
  pass: string
  buddy = []

  validation_messages = {
    'buddyName': [
      { type: 'required', message: 'Name is required.' }
    ],
    'buddyGender': [
      { type: 'required', message: 'Gender is required.' }
    ],
    'buddyAge': [
      { type: 'required', message: 'Age is required.' }
    ], 
    'buddyBreed': [
      { type: 'required', message: 'Breed is required.' }
    ],
    'buddyBday': [
      { type: 'required', message: 'Birthday is required.' }
    ]
  }

  constructor(public afs: AngularFirestore, private router:Router, private formBuilder: FormBuilder,  private authService: AuthService) {
    if (router.getCurrentNavigation().extras.state) {
      this.user.name = this.router.getCurrentNavigation().extras.state.name;
      this.user.surname = this.router.getCurrentNavigation().extras.state.surname;
      this.user.username = this.router.getCurrentNavigation().extras.state.username;
      this.user.email = this.router.getCurrentNavigation().extras.state.email;
      this.pass = this.router.getCurrentNavigation().extras.state.password;
      console.log('sign up animal ', this.user)
    }
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      personName: ['', [Validators.required, Validators.minLength(2)]],   
      attributes: this.formBuilder.array([ this.initAttributesFields()]) 
    })
    this.ionicForm.get('personName').setValue(this.user.name)
  }

  initAttributesFields() : FormGroup {
    return this.formBuilder.group({
      buddyName: ['', [Validators.required, Validators.minLength(2)]], 
      buddyGender: ['', [Validators.required]],
      buddyAge: ['', [Validators.required]],
      buddyBreed: ['', [Validators.required]],
      buddyBday: ['', [Validators.required]],   
    })
  }

  change(value){
    console.log("result", value);
  }

  get formArr() {
    return this.ionicForm.get('attributes') as FormArray;
  }

  addbuddy() {
    //this.ionicForm.value.buddyBday= this.ionicForm.value.buddyBday.split('T')[0];
    this.formArr.push(this.initAttributesFields());
  }

  deleteBuddy(index: number) {
    this.formArr.removeAt(index)
  }

  async registerBuddies() {
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      
      let userAnimals = this.ionicForm.value.attributes.length
      console.log(userAnimals)
      for (let i=0; i<userAnimals; i++) {
        const userBuddiesRef: AngularFirestoreDocument<any> = this.afs.doc(
          `users/${this.user.username}/buddies/${this.ionicForm.value.attributes[i].buddyName}`
          );      
          userBuddiesRef.set(this.ionicForm.value.attributes[0], {
          merge: true,
      });
      }

      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${this.user.username}/`
      );      
      userRef.update({nAnimals: userAnimals}), {
        merge: true,
      }
      this.user.nAnimals = userAnimals // UPDATE USER ANIMALS NUMBER TO WHATEVER IT IS
      this.authService.SignIn(this.user, this.pass)
    }
  }
}