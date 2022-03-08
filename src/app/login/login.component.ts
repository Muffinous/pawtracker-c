import { Component, ContentChild, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IonInput } from '@ionic/angular';
import { AuthService } from '../services/auth/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  showPassword = false;
  passwordToggleIcon;
  username: string;
  password: string;

  @ContentChild(IonInput) input: IonInput;

  validation_messages = {
    'username': [
      { type: 'exists', message: 'Username does not exist.' },
    ],
    'password': [
      { type: 'required', message: 'Password required.' },
      { type: 'minlength', message: 'Passwod must be at least 6 characters long.' },
      { type: 'maxlength', message: 'Password cannot be more than 30 characters long.' },    
    ]
  }
  // DATABASE
  constructor(public database: AngularFirestore, private authService: AuthService) {  
  }

  ngOnInit() {
    this.passwordToggleIcon = 'eye';
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye') {
          this.passwordToggleIcon = 'eye-off';
    } else {
      this.passwordToggleIcon = 'eye';
    }
  }
  
  login(){
      this.database.doc(`/users/${this.username}`).ref.get().then(snapshot => {
        if (snapshot.exists) {
          const myuser = snapshot.data() as User
          this.authService.SignIn(myuser.email, this.password) // this sign in goes to home || this.route.navigate(['/home']);
          .then(function(error) {
            // Handle Errors here.
            if (error) {
              var errorCode = error.code;
              var errorMessage : string = error.message;            
              console.log('errorcode' , errorCode);
              console.log('error' , errorMessage);
              if (errorCode === 'auth/wrong-password') {
                presentAlert('Wrong password!')
              } else {
                presentAlert(errorMessage)
              }              
            }
          });
        } else {
          presentAlert('Wrong username!')
        }
      });
  }

}

async function presentAlert(message: string) {
  const alert = document.createElement('ion-alert');
  alert.cssClass = 'my-custom-class';
  alert.header = 'Error';
  // alert.subHeader = 'Subtitle';
  alert.message = message;
  alert.buttons = ['OK'];

  document.body.appendChild(alert);
  await alert.present();
}

