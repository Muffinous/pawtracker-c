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
    let userPreview = JSON.parse(JSON.stringify(this.userService.user)) as User // copy buddy image to buddypreview to keep all the values
    console.log(' user preview ' , userPreview)
    console.log('cambios ', this.user)

    if ((this.user.name != "") && (this.user.name.localeCompare(this.userService.user.name) !== 0)) {
      userPreview.name = this.user.name
    }
    if ((this.user.surname != "") && (this.user.name.localeCompare(this.userService.user.surname) !== 0)) {
      userPreview.surname = this.user.surname
    }
    if ((this.user.email != "") && (this.user.name.localeCompare(this.userService.user.email) !== 0)) {
      userPreview.email = this.user.email
    }
    if ((this.user.username != "") && (this.user.name.localeCompare(this.userService.user.username) !== 0)) {
      userPreview.username = this.user.username
    }
    console.log('user cambiado ', userPreview)

    // this.modalCtrl.dismiss({user: this.user})
    }

}
