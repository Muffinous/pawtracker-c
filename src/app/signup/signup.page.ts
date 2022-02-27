import { Component, ContentChild, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { doc, setDoc } from 'firebase/firestore';
import { UserModel } from '../models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  @ContentChild(IonInput) input: IonInput;
  ionicForm: FormGroup;

  showPassword = false;
  showConfPassword = false;
  passwordToggleIcon;
  passwordToggleIcon2;
  showPasswordC = false;
  passwordToggleIconC;
  
  username : string;
  form: FormGroup;
  confirmed_password: string;

  user : UserModel

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
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'minlength', message: 'Email must be at least 8 characters long.' },
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
  constructor(private db: Firestore, private route:Router, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.passwordToggleIcon = 'eye';
    this.passwordToggleIconC = 'eye';

    this.ionicForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required]],
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmed_password: ['', [Validators.required]],
    })
  }

  toggleShow(name) {
    let btn = name.target.id;
    if (btn ==="pass") {
      this.passToggle();
    } else {
      this.confirmPassToggle();
    }
  }

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

  toggleShowC() { 
    this.showPasswordC = !this.showPasswordC;
    if (this.passwordToggleIconC === 'eye') {
          this.passwordToggleIconC = 'eye-off';
    } else {
      console.log('not eye');
      this.passwordToggleIconC = 'eye';
    }
  }

  async signUp() {
    // console.log("username ", this.ionicForm.value.username)
    this.username = this.ionicForm.value.username
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      this.user = new UserModel();
      this.user.setUsername(this.ionicForm.value.username)
      this.user.setSurname(this.ionicForm.value.surname)
      this.user.setName(this.ionicForm.value.name)
      this.user.setEmail(this.ionicForm.value.email)

      console.log(this.user)
      await setDoc(doc(this.db, "user", this.ionicForm.value.username), this.user.User)

      // await setDoc(doc(this.db, "Users", ), this.ionicForm)

    // this.route.navigateByUrl('/signup-animal', {state: this.ionicForm.value, replaceUrl:true})
    }
  }
}
