import { Component, ContentChild, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';

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
  buddyBDAY;

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

  constructor(private route:Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    console.log(this.breeds);
    this.ionicForm = this.formBuilder.group({
      personName: ['', [Validators.required, Validators.minLength(2)]],   
      attributes: this.formBuilder.array([ this.initAttributesFields() ]) 
    })
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

  login() {
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      this.ionicForm.value.buddyBday = this.ionicForm.value.buddyBday.split('T')[0];
      console.log(this.ionicForm.value)
      //this.route.navigateByUrl('/signup-animal', {replaceUrl:true})
    }
  }
}