import { Component, ContentChild, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit {
  @ContentChild(IonInput) input: IonInput;
  ionicForm: FormGroup;
  showPassword = false;
  showConfPassword = false;
  passwordToggleIcon;
  passwordToggleIcon2;
  showPasswordC = false;
  passwordToggleIconC;
  form: FormGroup;
  
  user = {} as User

  validation_messages = {
    'name': [
      { type: 'required', message: 'Name is required.' },
      { type: 'pattern',  message: 'Just use alphabet character' },
      { type: 'minlength', message: 'Name must be at least 6 characters long.' },
      { type: 'maxlength', message: 'Name cannot be more than 30 characters long.' }    
    ],
    'surname': [
      { type: 'required', message: 'Surname is required.' },
      { type: 'minlength', message: 'Surname must be at least 6 characters long.' },
      { type: 'maxlength', message: 'Surname cannot be more than 30 characters long.' }
    ],
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Minimum 6 characters' },
      { type: 'maxlength', message: 'Maximum 30 characters' },
      { type: 'validUsername', message: 'Your username has already been taken.' }
    ],
    'email': [
      { type: 'required', message: 'Email required.' },
      { type: 'pattern', message: 'Invalid Email!' }
    ],  
    'password': [
      { type: 'required', message: 'Password required.' },
      { type: 'minlength', message: 'Passwod must be at least 6 characters long.' },
      { type: 'maxlength', message: 'Password cannot be more than 30 characters long.' },
    ],  
  }

  constructor(private router: Router, public formBuilder: FormBuilder,  public fb: FormBuilder, public authService: AuthService) { 

    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.ionicForm = fb.group({
      name: ['', Validators.compose([
          //UsernameValidator.validUsername,
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.pattern('[a-zA-Z ]*'),
          Validators.required
      ])],
      surname: ['', Validators.compose([
          Validators.required, 
          Validators.pattern('[a-zA-Z ]*'), 
          Validators.minLength(6),
          Validators.maxLength(30)
      ])],    
      username: ['', Validators.compose([
        Validators.required, 
        Validators.minLength(6),
        Validators.maxLength(30)
    ])],   
      email: ['', Validators.compose([
          Validators.required,
          Validators.pattern(EMAILPATTERN)            
      ])],
      password: ['', Validators.compose([
          Validators.minLength(6),
          Validators.maxLength(30),
          Validators.required,
          // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$') //this is for the letters (both uppercase and lowercase) and numbers validation
      ])],
      confirmed_password: ['', Validators.required],
  }, { validator: this.matchingPasswords('password', 'confirmed_password')})

  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      
      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }

  ngOnInit() {
    this.passwordToggleIcon = 'eye';
    this.passwordToggleIconC = 'eye';
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye') {
          this.passwordToggleIcon = 'eye-off';
    } else {
      console.log('not eye');
      this.passwordToggleIcon = 'eye';
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

  signUp() {
    if (!this.ionicForm.valid) {
      console.log(this.ionicForm)
      console.log(this.ionicForm.value)
      console.log('Please provide all the required values!')
      return false;
    } else {
      this.user.name = this.ionicForm.get("name").value
      this.user.surname = this.ionicForm.get("surname").value
      this.user.username = this.ionicForm.get("username").value
      this.user.email = this.ionicForm.get("email").value
      this.user.nAnimals = 0
      
      console.log("USER INTERFACE ", this.user)
      this.authService.SignUp(this.user, this.ionicForm.get("password").value)
     // await setDoc(doc(this.db, "user", this.ionicForm.value.username), this.user.User)
     this.router.navigateByUrl('/signup-animal', {state: this.ionicForm.value, replaceUrl:true})
    }
  }
}
