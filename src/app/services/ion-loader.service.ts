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
    autoLoader() {
      this.loadingController.create({
        message: 'Loader hides after 4 seconds',
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
}
