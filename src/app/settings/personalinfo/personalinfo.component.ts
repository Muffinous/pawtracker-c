import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/auth/user/user.service';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss'],
})
export class PersonalinfoComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private userService: UserService) { }
  user = {} as User
  name: string;
  surname: string;
  email: string;
  username: string;

  ngOnInit() {
    // console.log('User ', this.userService.user)
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    console.log('User Service before', this.userService.user)
    let userPreview = JSON.parse(JSON.stringify(this.userService.user)) as User // copy buddy image to buddypreview to keep all the values
    console.log('User Preview before ', userPreview)

    console.log('cambios ', this.user)

    if (((this.user.name != "") && (typeof this.user.name !== "undefined")) && (this.user.name.localeCompare(this.userService.user.name) !== 0)) {
      userPreview.name = this.user.name
    }

    if (((this.user.surname != "") && (typeof this.user.username !== "undefined")) && (this.user.surname.localeCompare(this.userService.user.surname) !== 0)) {
      userPreview.surname = this.user.surname
    }

    if (((this.user.email != "") && (typeof this.user.email  !== "undefined")) && (this.user.email.localeCompare(this.userService.user.email) !== 0)) {
        userPreview.email = this.user.email
    }

    if (((this.user.username != "") && (typeof this.user.username  !== "undefined")) && (this.user.username.localeCompare(this.userService.user.username) !== 0)) {
      userPreview.username = this.user.username
    }
    console.log('User Preview after ', userPreview)

    let subheader : string = "You're gonna update your buddy's info. Is everything correct?"
    let message : string = `<ul><li>Name : ${userPreview.name}</li>
                                <li>Surname : ${userPreview.surname}</li>
                                <li>Email : ${userPreview.email}</li>
                                <li>Username : ${userPreview.username}</li>`

    this.presentAlert(message, "Update User Info", subheader, userPreview)
  }

  async presentAlert(message: string, header: string, subheader: string, userNewInfo) {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-alert';
    alert.header = header;
    alert.subHeader = subheader;
    alert.message = message;
    alert.buttons = [
    {
      text: 'Cancel',
      handler: () => {
      }
    },
    {
      text: 'Save',
      handler: () => {
        console.log('Save option clicked ', this.user, ' userNewInfo ', userNewInfo)
        this.userService.updateUser(this.userService.user, userNewInfo).then(result => {
          this.modalCtrl.dismiss(null)           
        })
      }
    }
   ];
    document.body.appendChild(alert);
    await alert.present();
  }

}
