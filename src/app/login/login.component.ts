import { Component, ContentChild, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { docSnapshots } from '@angular/fire/firestore';
import { IonInput } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
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
  usernameExists: boolean
  
  @ContentChild(IonInput) input: IonInput;

  // DATABASE
  constructor( public database: AngularFirestore, private authService: AuthService) {}

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
  
  async login(){
    // this.database.collection("users").ref.where('username', '==', this.username).get().then(function(querySnapshot) {
    //   querySnapshot.forEach(function(doc) {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.id, " => ", doc.data() as User);
    //       const docData = doc.data() as User
    //       console.log(docData.email)
    //   });
    // });

    this.database.doc(`/users/${this.username}`).ref.get().then(snapshot => {
      const myuser = snapshot.data() as User
      console.log(myuser.email)
      this.usernameExists = snapshot.exists
      if (this.usernameExists) {
        this.authService.SignIn(myuser.email, this.password)
      } else {
        console.log('username DOES NOT exist');
      }
    });
    // this.route.navigate(['/home']);
    console.log('navigate');
  }
}
