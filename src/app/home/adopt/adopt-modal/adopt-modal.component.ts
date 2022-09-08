import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-adopt-modal',
  templateUrl: './adopt-modal.component.html',
  styleUrls: ['./adopt-modal.component.scss'],
})
export class AdoptModalComponent implements OnInit {

  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }
}
