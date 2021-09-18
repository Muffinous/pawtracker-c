import { Component, ContentChild, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  showPassword = false;
  showConfPassword = false;
  passwordToggleIcon;
  passwordToggleIcon2;
  username: string;
  password: string;
  name: string;
  surname: string;
  email: string;
  form: FormGroup;
  
  @ContentChild(IonInput) input: IonInput;

  constructor(private route:Router, private formBuilder: FormBuilder) { 
    this.form = this.formBuilder.group({
      newbuddy: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.passwordToggleIcon = 'eye';
    this.passwordToggleIcon2 = 'eye';
  }

  toggleShow(name) {
    let btn = name.target.id;
    if (btn ==="pass") {
      this.passToggle();
    } else {
      this.confirmPassToggle();
    }
  }

  passToggle() {
      this.showPassword = !this.showPassword;
      if (this.passwordToggleIcon === 'eye') {
            this.passwordToggleIcon = 'eye-off';
      } else {
        console.log('not eye');
        this.passwordToggleIcon = 'eye';
      }
  }

  confirmPassToggle() {
      this.showConfPassword = !this.showConfPassword;
      if (this.passwordToggleIcon2 === 'eye') {
            this.passwordToggleIcon2 = 'eye-off';
      } else {
        console.log('not eye');
        this.passwordToggleIcon2 = 'eye';
      }    
  }

  // https://stackblitz.com/edit/angular-form-array-example-dv2q7y?file=src%2Fapp%2Fapp.component.ts
  addBuddy() {
    console.log('new buddy')
    const buddy = this.form.controls.newbuddy as FormArray;
    buddy.push(
      this.formBuilder.group({
        name: '',
        breed: '',
      })
    );
  }
}
