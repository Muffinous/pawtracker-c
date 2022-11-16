import { formatDate, getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Buddy } from 'src/app/models/buddy';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { UserService } from 'src/app/services/auth/user/user.service';

@Component({
  selector: 'app-buddy',
  templateUrl: './buddy.page.html',
  styleUrls: ['./buddy.page.scss'],
})
export class BuddyPage implements OnInit {
  buddy = {} as Buddy
  bday
  editMode = false;

  constructor(public modalControler: ModalController, public navParams: NavParams, private animalService: AnimalService, private alertCtrl: AlertController,
    private userService: UserService) { 
    this.buddy.buddyName = this.navParams.get('buddyName');
    this.buddy.buddyAge = this.navParams.get('buddyAge');
    this.buddy.buddyBreed = this.navParams.get('buddyBreed');
    this.buddy.buddyGender = this.navParams.get('buddyGender');
    this.buddy.buddyBday = this.navParams.get('buddyBday');
    this.buddy.buddyType = this.navParams.get('buddyType');
    this.buddy.buddyPic = this.navParams.get('buddyPic');
    this.buddy.buddyDescription = this.navParams.get('buddyDescription');
    this.buddy.id = this.navParams.get('id');

    this.bday = formatDate(this.buddy.buddyBday, 'dd-MM-yyyy', 'es-ES')
  
    console.log('buddypage', this.buddy, 'bday', this.bday)
  }
  
  ngOnInit() {
  }

  close() {
    this.modalControler.dismiss();
  }

  deleteBuddy() {
    this.showConfirm();
  }

  showConfirm() {
    this.alertCtrl.create({
      header: 'Delete Buddy',
      subHeader: 'Beware lets confirm',
      message: 'Are you sure? You want to delete this buddy?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('I care about humanity');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.animalService.deleteBuddy(this.userService.user, this.buddy).then(result => {
              this.modalControler.dismiss(null)           
            })
          }
        }
      ]
    }).then(res => {
      res.present();
    });
  }

  editBuddy() {
    this.editMode = true;
  }

  cancelEdit() {
    this.editMode = false;
  }
}
