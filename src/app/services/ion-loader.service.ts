import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonLoaderService {

  constructor( public loadingController: LoadingController ) { }

    // Simple loader
    async simpleLoader() {
      const loading = await this.loadingController.create({
        message: 'Loading...',
        duration: 2000
      });
      await loading.present(); 
    }
    // Dismiss loader
    dismissLoader() {
      this.loadingController.dismiss().then((response) => {
        console.log('Loader closed!', response);
      }).catch((err) => {
        console.log('Error occured : ', err);
      });
    }
    // Auto hide show loader
    autoLoader(message) {
      this.loadingController.create({
        message: message,
        duration: 500
      }).then((response) => {
        response.present();
        response.onDidDismiss().then((response) => {
          console.log('Loader dismissed', response);
        });
      });
    }   
    // Custom style + hide on tap loader
    customLoader() {
      this.loadingController.create({
        message: 'Loader with custom style',
        duration: 4000,
        cssClass:'loader-css-class',
        backdropDismiss:true
      }).then((res) => {
        res.present();
      });
    }  
    
    async presentAlert(message: string, header: string, subheader: string) {
      const alert = document.createElement('ion-alert');
      alert.cssClass = 'my-custom-class';
      alert.header = header;
      alert.subHeader = subheader;
      alert.message = message;
      alert.buttons = ['Cancel', 'OK'];
    
      document.body.appendChild(alert);
      await alert.present();
    }
}
