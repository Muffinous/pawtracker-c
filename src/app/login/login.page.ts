import { Component, ContentChild, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import {Router} from '@angular/router'; 
import { collection, doc, getDoc, query, where } from 'firebase/firestore';
import { docSnapshots, Firestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  showPassword = false;
  passwordToggleIcon;
  username: string;
  password: string;

  @ContentChild(IonInput) input: IonInput;

  constructor(private db: Firestore, private route:Router) {
    const users = collection(db, "Users")
   }

  ngOnInit() {
    this.passwordToggleIcon = 'eye';
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
  
  async login(){
    console.log('submitted');
    console.log(this.username);
    console.log(this.password);
    const docRef = query(collection(this.db, "Users"), where("username", "==", this.username))

    if (docRef) {
      console.log("Document data: ", docRef)
    } else {
      console.log("No exists")
    }
    // this.route.navigate(['/home']);
    console.log('navigate');
  }
}