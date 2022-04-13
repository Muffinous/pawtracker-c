import { Injectable } from '@angular/core';
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(private storage: AngularFireStorage, private camera: Camera) { }
  downloadURL: Observable<string>;
  private file: File
  fb
  croppedImagepath = "";

  // onFileSelected(event, path, username) {
  //   console.log('event', event)
  //   var n = Date.now();
  //   const file = event.target.files[0];
  //   const filePath = `${path}/${username}/${n}`;
  //   const fileRef = this.storage.ref(filePath);
  //   const task = this.storage.upload(`${path}/${username}/${n}`, file);
  //   task
  //     .snapshotChanges()
  //     .pipe(
  //       finalize(() => {
  //         this.downloadURL = fileRef.getDownloadURL();
  //         this.downloadURL.subscribe(url => {
  //           if (url) {
  //             this.fb = url;
  //           }
  //           // console.log('url', this.downloadURL)
  //           // this.ionicForm.value.attributes[0].buddyPic = this.downloadURL
  //         });
  //       })
  //     )
  //     .subscribe(url => {
  //       if (url) {
  //         console.log(url);
  //       }
  //     });
  // }

  pickImage(option) {
    console.log('cameraservice', option)
    let sourceType
    if (option == 0) {
      sourceType = this.camera.PictureSourceType.PHOTOLIBRARY
    } else {
      sourceType = this.camera.PictureSourceType.CAMERA
    }
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      this.croppedImagepath = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

}
