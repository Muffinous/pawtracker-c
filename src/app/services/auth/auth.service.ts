import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { NavigationExtras, Router } from '@angular/router';
import { User } from '../../models/user';
import { getAuth, reload, updateProfile } from 'firebase/auth';
import { IonLoaderService } from '../ion-loader.service';
import { UserService } from './user/user.service';
import { AnimalService } from '../animal/animal.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data
  curUser = {} as User

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public ionLoader: IonLoaderService,
    private userService: UserService,
    private animalService: AnimalService
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe((user) => {
      console.log('AFAUTH USER: ', user)
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }
  // Sign in with email/password
  SignIn(user: User, password: string) {
    console.log('sign in,,,,', user)
    this.openLoader()
    return this.afAuth
      .signInWithEmailAndPassword(user.email, password)
      .then((result) => {
        this.ngZone.run(() => {
          console.log(result.user)
          user.emailVerified = result.user.emailVerified
          user.uid = result.user.uid
          // localStorage.addItem(user)
          this.userService.setUserService(user) // save the user's info 
          this.loadUserAnimals(user)
          this.loadUserAnimalsAdoption(user)
          this.loadAnimalsAdoption()
          this.router.navigate(['home/' + user.username]);
        });
      //  this.SetUserData(result.user);
      })
      .catch((error) => {
        console.log('error in auth login', error)
        return error
      });
  }

  // Sign up with email/password
  async SignUp(user: User, password: string) {
    let idUser = this.afs.createId() // create id 4 each buddy
    user.id = idUser
    console.log("idUser ", idUser)

     return this.afs.doc(`/usernames/${user.username}`).ref.get().then(snapshot => { // checks if username exists
      if (!snapshot.exists) {
         return this.afAuth
          .createUserWithEmailAndPassword(user.email, password)
          .then((result) => {
            /* Call the SendVerificaitonMail() function when new user sign 
            up and returns promise */
          // this.SendVerificationMail();
            this.SetProfileData(result.user, user);          // if username doesnt exists, we save profile and user data in db  
            return true;
          })
          .catch((error) => {
            var errorCode = error.code;
            if (errorCode === 'auth/invalid-email') {
              presentAlert('Error', `You have entered an invalid email, please check that it's spelled correctly. Example: user@example.es`);
            } else if (errorCode === 'auth/email-already-in-use') {
              presentAlert('Error', `You have entered an email already registered, please use another one or log in.`);
            }
            return false
          });
      } else {
        presentAlert('Error', 'The username is already in use, please use another or log in.')
        return false
      }
    })
 }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  sendResetLink() {
    console.log("send reset link")
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail: string) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        presentAlert('Check your email', `Password reset email sent to <b>${passwordResetEmail}</b>, please check your inbox.`);
      })
      .catch((error) => {
        console.log('error ', error)
        var errorCode = error.code;
        if (errorCode === 'auth/invalid-email') {
          presentAlert('Error', `You have entered an invalid email, please check that it's spelled correctly. Example: user@example.es`);
        } else if (errorCode === 'auth/user-not-found') {
          presentAlert('Error', `You have entered an incorrect email, please enter the one you used to register.`);
        }
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null // && user.emailVerified !== false ? true : false; // if emailVerified is not false -> return true else return false
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        this.router.navigate(['dashboard']);
      }
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['dashboard']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }
  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    const userData = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified
    };
    console.log('userdata ', userData)
    return userRef.set(userData, {
      merge: true,
    });
  }

  /* Setting user data + profile data (name, surname, username) */
  async SetProfileData(user: any, profile: any) {
    console.log("USER ", user)
    console.log("PROFILE ", profile)
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${profile.id}`
    );
    const userData: User = {
      id: profile.id,
      uid: user.uid, // original UID FIREBASE, vinc with email - auth
      email: user.email,
      name: profile.name,
      surname: profile.surname,
      username: profile.username,
      emailVerified: user.emailVerified,
      nAnimals: profile.nAnimals
    };
    await updateProfile(auth.getAuth().currentUser, { displayName: profile.username }).catch( // save the username in displayname 4 future access
       (err) => console.log(err)
     );

    this.saveUsername(userData, profile.id)
    
    this.userService.setUserService(userData)

    console.log("USERDATA ", userData)

    return userRef.set(userData, {
      merge: true,
    });

  }

  saveUsername(user: User, id) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `usernames/${user.username}`
    );

    userRef.set({id: id}, {merge: true})
    
  }

  // Sign out
  SignOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      window.location.assign('/') // reload everything. resets all view cache: so data is reloaded
      // this.router.navigateByUrl('/', {replaceUrl: true});
    });
  }

  usernameExists(username:string) {
    this.afs.doc(`/users/${username}`).ref.get().then(snapshot => {
      return snapshot.exists
      // console.log('username ', username ,'exists', snapshot.exists)
    })
  }

  getAuthUser() {
    return JSON.parse(localStorage.getItem('user'));
  }  

  getCurrentUsername() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user)
    return user.displayName
  }  

  getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('CONS USER', user)
    this.afs.doc(`users/${user.displayName}/`).ref.get().then((snapshot) => {
      if (snapshot.exists) {
        const myuser = snapshot.data() as User
        this.curUser.email = myuser.email        
        this.curUser.emailVerified = myuser.emailVerified
        this.curUser.name = myuser.name
        this.curUser.uid = myuser.uid
        this.curUser.username = myuser.username
      }
    })
    .catch((error) => {
      window.alert(error.message);
    });        
  }

  getCurrentUserEmail() {
    return this.curUser.email
  }

  loadUserAnimals(user: User) {
    this.animalService.loadUserBuddies(user)
  }

  loadUserAnimalsAdoption(user: User) {
    this.animalService.loadUserBuddiesAdoption(user)
  }

  loadAnimalsAdoption(){
    this.animalService.loadBuddiesinAdoption()
  }

  async openLoader() {
    await this.ionLoader.simpleLoader()
  }
  
}
  async function presentAlert(header: string, message: string) {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
    alert.header = header;
    alert.message = message;
    alert.buttons = ['OK'];
  
    document.body.appendChild(alert);
    await alert.present();
  }