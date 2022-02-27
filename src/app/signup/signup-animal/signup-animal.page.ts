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
  personParams;

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

  constructor(private router:Router, private formBuilder: FormBuilder) {
    if (router.getCurrentNavigation().extras.state) {
      this.personParams = this.router.getCurrentNavigation().extras.state;
      console.log('sign up animal ', this.personParams)
    }
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      personName: ['', [Validators.required, Validators.minLength(2)]],   
      attributes: this.formBuilder.array([ this.initAttributesFields()]) 
    })
    this.ionicForm.get('personName').setValue(this.personParams.name)
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

  async login() {
    console.log('VALID', this.ionicForm.valid)
    if (!this.ionicForm.valid) {
      console.log('.value ', this.ionicForm.controls.attributes.value)
      console.log('buddyname ', this.ionicForm.value)
      console.log('.attributes ', this.ionicForm.get('attributes'))
      // console.log('buddyName: ', this.ionicForm.get('attributes').get('buddyName').hasError(this.validation_messages[0]))
      console.log('Please provide all the required values!')
      return false;
    } else {
      this.ionicForm.value.attributes[0].buddyBday = this.ionicForm.value.attributes[0].buddyBday.split('T')[0];
      console.log(this.ionicForm.value)
      return true
      //this.route.navigateByUrl('/signup-animal', {replaceUrl:true})
    }
  }
}