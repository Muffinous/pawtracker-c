import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CallNumber } from '@awesome-cordova-plugins/call-number/ngx';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Buddy } from 'src/app/models/buddy';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { sendEmailVerification } from 'firebase/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/auth/user/user.service';
import { AnimalService } from 'src/app/services/animal/animal.service';

@Component({
  selector: 'app-buddy-contact',
  templateUrl: './buddy-contact.page.html',
  styleUrls: ['./buddy-contact.page.scss'],
})
export class BuddyContactPage implements OnInit {
  buddy = {} as Buddy
  bday
  editMode = false;
  public ionicForm: FormGroup;
  owner: boolean 

  constructor(public modalControler: ModalController, public navParams: NavParams, private formBuilder: FormBuilder, private callNumber: CallNumber, 
    private emailComposer: EmailComposer, private alertCtrl: AlertController, private userService: UserService, private animalService: AnimalService) { 
    this.buddy.buddyName = this.navParams.get('buddyName');
    this.buddy.buddyAge = this.navParams.get('buddyAge');
    this.buddy.buddyBreed = this.navParams.get('buddyBreed');
    this.buddy.buddyGender = this.navParams.get('buddyGender');
    this.buddy.buddyBday = this.navParams.get('buddyBday');
    this.buddy.buddyType = this.navParams.get('buddyType');
    this.buddy.buddyLocation = this.navParams.get('buddyLocation');
    this.buddy.buddyDescription = this.navParams.get('buddyDescription');
    this.buddy.buddyPic = this.navParams.get('buddyPic');
    this.buddy.id = this.navParams.get('id');

    this.bday = formatDate(this.buddy.buddyBday, 'dd-MM-yyyy', 'es-ES')


    console.log('userAnimalsAdoption', animalService.userAnimalsAdoption)
    console.log('buddy', this.buddy)
    this.userOwner()
    console.log('findIndex', animalService.userAnimalsAdoption.findIndex(buddy => buddy.id === this.buddy.id))

  }

  userOwner() { // check if the user has the buddy in adoption
    let index = this.animalService.userAnimalsAdoption.findIndex(buddy => buddy.id === this.buddy.id)
    console.log(index)
    if (index === -1) {
      this.owner = false
      console.log('no es el dueño ', this.owner)
    } else {
      this.owner = true
      console.log('es el dueño ', this.owner)
    }  }

  validation_messages = {
    'edit_BuddyName': [
      { type: 'required', message: 'Name is required.' }
    ],
    'edit_buddyType': [
      { type: 'required', message: 'Type is required.' }
    ],
    'edit_buddyGender': [
      { type: 'required', message: 'Gender is required.' }
    ],
    'edit_buddyAge': [
      { type: 'required', message: 'Age is required.' }
    ], 
    'edit_buddyBreed': [
      { type: 'required', message: 'Breed is required.' }
    ],
    'edit_buddyBday': [
      { type: 'required', message: 'Birthday is required.' }
    ]
  }
  
  ngOnInit() {
  }

  close() {
    this.modalControler.dismiss();
  }

  callOwner() {
    this.callNumber.callNumber("+34644562994", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }

  sendEmail() {
    let email = {
      to: 'max@mustermann.de',
      cc: 'erika@mustermann.de',
      bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        'file://img/logo.png',
        'res://icon.png',
        'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
        'file://README.pdf'
      ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    }

    this.emailComposer.open(email);
  }

  editBuddy() {
    this.editMode = true;
    this.ionicForm = this.formBuilder.group({
      id: [this.buddy.id],
      edit_buddyName: ['', [Validators.minLength(2)]], 
      edit_buddyGender: [''],
      edit_buddyType: [''],
      edit_buddyAge: [''],
      edit_buddyBreed: [''],
      edit_buddyBday: [''],   
      edit_buddyPic: [''],
      edit_BuddyDescription: ['']
    })
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

  saveEdit() {
    let buddyPreview = JSON.parse(JSON.stringify(this.buddy)) as Buddy // copy buddy image to buddypreview to keep all the values

      if (this.ionicForm.value.edit_buddyName) {
        console.log("update buddy name ", buddyPreview.buddyName ," to ", this.ionicForm.value.edit_buddyName)
        buddyPreview.buddyName = this.ionicForm.value.edit_buddyName
      }

      if (this.ionicForm.value.edit_buddyGender) {
        console.log("update buddy gender  ", this.buddy.buddyGender ," to ", this.ionicForm.value.edit_buddyGender)
        buddyPreview.buddyGender = this.ionicForm.value.edit_buddyGender

      }

      if (this.ionicForm.value.edit_buddyType) {
        console.log("update buddy type  ", this.buddy.buddyType ," to ", this.ionicForm.value.edit_buddyType)
        buddyPreview.buddyType = this.ionicForm.value.edit_buddyType

      }

      if (this.ionicForm.value.edit_buddyBreed) {
        console.log("update buddy breed  ", this.buddy.buddyBreed ," to ", this.ionicForm.value.edit_buddyBreed)
        buddyPreview.buddyBreed = this.ionicForm.value.edit_buddyBreed

      }

      if (this.ionicForm.value.edit_buddyBday) {
        console.log("update buddy bday  ", this.buddy.buddyBday ," to ", this.ionicForm.value.edit_buddyBday)
        buddyPreview.buddyBday = this.ionicForm.value.edit_buddyBday

      }

      if (this.ionicForm.value.edit_BuddyDescription) {
        console.log("update buddy description  ", this.buddy.buddyDescription ," to ", this.ionicForm.value.edit_BuddyDescription)
        buddyPreview.buddyDescription = this.ionicForm.value.edit_BuddyDescription

      }

      let subheader : string = "You're gonna update your buddy's info. Is everything correct?"
      let message : string = `<ul><li>  Buddy name : ${buddyPreview.buddyName}</li>
                              <li>Buddy gender : ${buddyPreview.buddyGender}</li>
                              <li>Buddy type : ${buddyPreview.buddyType}</li>
                              <li>Buddy breed : ${buddyPreview.buddyBreed}</li>
                              <li>Buddy birthday : ${formatDate(buddyPreview.buddyBday, 'dd-MM-yyyy', 'es-ES')}</li>
                              <li>Buddy description : ${buddyPreview.buddyDescription}</li></ul>`

      this.presentAlert(message, "Update Buddy Info", subheader, buddyPreview)
  }

  async presentAlert(message: string, header: string, subheader: string, buddyNewInfo) {
    const alert = document.createElement('ion-alert');
    alert.cssClass = 'my-custom-class';
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
        console.log('Save option clicked ', this.buddy, ' buddynewinfo ', buddyNewInfo)
        this.animalService.updateBuddyAdoption(this.userService.user, this.buddy, buddyNewInfo).then(result => {
          this.modalControler.dismiss(null)           
        })
      }
    }
   ];
    document.body.appendChild(alert);
    await alert.present();
  }

}
