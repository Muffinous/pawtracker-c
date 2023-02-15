import { Component, OnChanges, OnInit, Renderer2, ViewChild } from '@angular/core';
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
export class HomePage implements OnChanges{
  map = null
  @ViewChild('mapElement') mapElement
  public folder: string
  rootPage:any = 'TabsPage'
  user = {} as User
  selectedIndex
  selectedTheme: String;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private authService: AuthService, private userService: UserService, private renderer: Renderer2) {
    this.activatedRoute.params.subscribe(params => {
      console.log('PARAMS ', params)
      if (params) {
        this.user.username = params.username
      }
    })
  }

  ngOnChanges() {
    this.selectedIndex = 0
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    console.log('folder ', this.folder)
  }

  public appPages = [
    { title: 'My profile', url: 'profile', icon: 'person', selectedIndex: 1},    
    { title: 'Adopt', url: `adopt`, icon: 'heart', selectedIndex: 2 },    
    { title: 'Buddies', url: 'profile', icon: 'paw', selectedIndex: 3},
    { title: 'Settings', url: `/settings`, icon: 'settings', selectedIndex: 4 },

  ];

  coins(){
    console.log('coins clicked')
    this.router.navigate(['profile'], {relativeTo:this.activatedRoute});
  }

  // public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];  

  setUser() {
    const us = this.authService.getAuthUser()
  }

  darkMode(event) {
    if(event.detail.checked){
      this.renderer.setAttribute(document.body, 'color-theme', 'dark')
    } else {
      this.renderer.setAttribute(document.body, 'color-theme', 'light')
    }
  }

   colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('color-theme', 'dark');		
    } else {
      document.body.setAttribute('color-theme', 'light');
    }
  }
  public getUser() {
    return this.user
  }
}
