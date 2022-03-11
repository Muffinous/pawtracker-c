import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/auth/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = {} as User

  constructor(private router: Router, private userService: UserService) {
      console.log('USERSERVICE USER ', this.userService.user)
  }

  ngOnInit() {
  }

}
