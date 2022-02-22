import { Component, ContentChild, OnInit } from '@angular/core';
<<<<<<< HEAD
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
=======
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
>>>>>>> 39b87c9 (sign up almost done, starting settings.)
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  @ContentChild(IonInput) input: IonInput;
  ionicForm: FormGroup;

  showPassword = false;
<<<<<<< HEAD
  showConfPassword = false;
  passwordToggleIcon;
  passwordToggleIcon2;
=======
  showPasswordC = false;
  passwordToggleIcon;
  passwordToggleIconC;
  
>>>>>>> 39b87c9 (sign up almost done, starting settings.)
  username: string;
  name: string;
  lastname: string;

  password: string;
<<<<<<< HEAD
  name: string;
  surname: string;
  email: string;
  form: FormGroup;
  
  @ContentChild(IonInput) input: IonInput;

  constructor(private route:Router, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      newbuddy: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.passwordToggleIcon = 'eye';
    this.passwordToggleIcon2 = 'eye';
=======
  confirmed_password: string;


  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' }
    ],
    'surname': [
      { type: 'required', message: 'Surname is required.' }
    ],
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 12 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 8 characters long.' },
    ],  
    'confirmed_password': [
      { type: 'required', message: 'Confirmed password is required.' },
      { type: 'minlength', message: 'Confirmed Password must be at least 8 characters long.' },
    ],  
  }
  constructor(private route:Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.passwordToggleIcon = 'eye';
    this.passwordToggleIconC = 'eye';

    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmed_password: ['', [Validators.required]],
    })
>>>>>>> 39b87c9 (sign up almost done, starting settings.)
  }

  toggleShow(name) {
    let btn = name.target.id;
    if (btn ==="pass") {
      this.passToggle();
    } else {
      this.confirmPassToggle();
    }
  }

<<<<<<< HEAD
  passToggle() {
      this.showPassword = !this.showPassword;
      if (this.passwordToggleIcon === 'eye') {
            this.passwordToggleIcon = 'eye-off';
      } else {
        console.log('not eye');
        this.passwordToggleIcon = 'eye';
      }
  }

  confirmPassToggle() {
      this.showConfPassword = !this.showConfPassword;
      if (this.passwordToggleIcon2 === 'eye') {
            this.passwordToggleIcon2 = 'eye-off';
      } else {
        console.log('not eye');
        this.passwordToggleIcon2 = 'eye';
      }    
  }

  // https://stackblitz.com/edit/angular-form-array-example-dv2q7y?file=src%2Fapp%2Fapp.component.ts
  addBuddy() {
    console.log('new buddy')
    const buddy = this.form.controls.newbuddy as FormArray;
    buddy.push(
      this.formBuilder.group({
        name: '',
        breed: '',
      })
    );
=======
  toggleShowC() {
    this.showPasswordC = !this.showPasswordC;
    if (this.passwordToggleIconC === 'eye') {
          this.passwordToggleIconC = 'eye-off';
    } else {
      console.log('not eye');
      this.passwordToggleIconC = 'eye';
    }
  }

  login() {
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
      this.route.navigateByUrl('/signup-animal', {replaceUrl:true})
    }
>>>>>>> 39b87c9 (sign up almost done, starting settings.)
  }
}
