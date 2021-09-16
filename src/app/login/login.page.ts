import { Component, ContentChild, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';
import {Router} from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
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
  
  login(){
    console.log('submitted');
    console.log(this.username);
    console.log(this.password);
    this.route.navigate(['/home']);
    console.log('navigate');
  }
}