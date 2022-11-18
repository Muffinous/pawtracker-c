import { formatDate, getLocaleDateFormat } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, NavParams } from '@ionic/angular';
import { Buddy } from 'src/app/models/buddy';
import { AnimalService } from 'src/app/services/animal/animal.service';
import { UserService } from 'src/app/services/auth/user/user.service';
import { IonLoaderService } from 'src/app/services/ion-loader.service';

@Component({
  selector: 'app-buddy',
  templateUrl: './buddy.page.html',
  styleUrls: ['./buddy.page.scss'],
})
export class BuddyPage implements OnInit {
  buddy = {} as Buddy
  bday
  editMode = false;
  breedString;
  public ionicForm: FormGroup;
  image;
  
  constructor(public modalControler: ModalController, private afs: AngularFirestore, public navParams: NavParams, private animalService: AnimalService,  
    private ionLoaderService: IonLoaderService, private formBuilder: FormBuilder, private alertCtrl: AlertController,
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

    this.breedString = this.buddy.buddyBreed.toString();
    
    this.bday = formatDate(this.buddy.buddyBday, 'dd-MM-yyyy', 'es-ES')
  
    console.log('buddypage', this.buddy, 'bday', this.bday)
  }
  
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
    this.ionicForm = this.formBuilder.group({
      id: [this.buddy.id],
      edit_buddyName: ['', [Validators.minLength(2)]], 
      edit_buddyGender: [''],
      edit_buddyType: [''],
      edit_buddyAge: [''],
      edit_buddyBreed: [''],
      edit_buddyBday: [''],   
      edit_buddyPic: ['']
    })
  }

  saveEdit() {
    let buddyPreview = {} as Buddy
    buddyPreview = this.buddy;

    const userBuddiesRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${this.userService.user.username}/buddies/${this.buddy.buddyName}`
      ); 
      console.log('userBuddiesRef values ', userBuddiesRef)

      console.log('Ionic form values ', this.ionicForm.value)
      if (this.ionicForm.value.edit_buddyName) {
        console.log("update buddy name ", this.buddy.buddyName ," to ", this.ionicForm.value.edit_buddyName)
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
      // userBuddiesRef.update({buddyName: this.ionicForm.value.attributes.edit_buddyName}), {
      //   merge: true
      // }
      let subheader : string = "You're gonna update your buddy's info. Is everything correct?"
      let message : string = `<ul><li>  Buddy name : ${buddyPreview.buddyName}</li>
                              <li>Buddy gender : ${buddyPreview.buddyGender}</li>
                              <li>Buddy type : ${buddyPreview.buddyType}</li>
                              <li>Buddy breed : ${buddyPreview.buddyBreed}</li>
                              <li>Buddy birthday : ${formatDate(buddyPreview.buddyBday, 'dd-MM-yyyy', 'es-ES')}</li>
                              <li>Buddy description : ${buddyPreview.buddyDescription}</li></ul>`

      this.ionLoaderService.presentAlert(message, "Update Buddy Info", subheader)
  }

  cancelEdit() {
    this.editMode = false;
  }

  changeBreed(typeofAnimal) {
    console.log("change breed before console.log typeofanimal")
    console.log('value : ', typeofAnimal)
    this.animalService.setActualBreed(typeofAnimal)
  }

  
  onFileSelected(event, id) {
    const file = event.target.files[0]; // info de la imagen
    let reader = new FileReader();

    reader.onload = (e: any) => {
        this.buddy.buddyPic = e.target.result
    }
    reader.readAsDataURL(file) // para que aparezca la imagen en la pantalla

    //this.uploadImage(event, id)
  }
}
