import { Component, ContentChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  showPassword = false;
  passwordToggleIcon;
  username: string;
  password: string;

  @ContentChild(IonInput) input: IonInput;

  constructor(private route:Router) { }

  ngOnInit() {
    this.passwordToggleIcon = 'eye';
  }

  toggleShow() {
    this.showPassword = !this.showPassword;
    if (this.passwordToggleIcon === 'eye') {
          this.passwordToggleIcon = 'eye-off';
    } else {
      console.log('not eye');
      this.passwordToggleIcon = 'eye';
    }
  }
}
