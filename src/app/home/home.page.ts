import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth/auth.service';
import { UserService } from '../services/auth/user/user.service';

declare var google;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  map = null
  @ViewChild('mapElement') mapElement
  public folder: string
  rootPage:any = 'TabsPage'
  user = {} as User
  selectedIndex

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, private userService: UserService) { 
    this.activatedRoute.params.subscribe(params => {
      if (params) {
        this.user.username = params.username
      }
    })
  }

  ngOnInit() {
    this.selectedIndex = -1
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    // this.loadMap();      
  }

  public appPages = [
    { title: 'My profile', url: 'profile', icon: 'person', index: 0},
    { title: 'Buddies', url: 'buddies', icon: 'paw', index: 1},
    { title: 'Settings', url: `/settingsnew`, icon: 'settings', index: 2 },
    { title: 'Dark mode', url: '', icon: 'toggle', index: 3 },
    // { title: 'Sign Out', url: `this.authService.SignOut()`, icon: 'log-out', index: 4 },
  ];

  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];  

  setUser() {
    const us = this.authService.getAuthUser()
    console.log('USSSSS', us)
    // this.user.email = us.email
    // this.user.username = us.displayName
    // this.user.uid = us.uid
  }

  goSettings() {
    console.log('gosettings')
    this.router.navigateByUrl('/settingsnew')
  }

  public getUser() {
    return this.user
  }
  // loadMap() {
  //   const mapEle: HTMLElement = document.getElementById('map');
  //   console.log(mapEle);
  //   const myLatLng = { lat: -34.397, lng: 150.644};
  //   this.map = new google.maps.Map(mapEle, {
  //     center: myLatLng,
  //     zoom: 12
  //   });

  //   google.maps.event.addListenerOnce(this.map, 'idle', () => {
  //     mapEle.classList.add('show-map');
  //   });
  // }
}
