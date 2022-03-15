import { Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import SwiperCore, { Autoplay } from 'swiper';
import { IonInfiniteScroll, IonList } from '@ionic/angular';
import { UserService } from '../services/auth/user/user.service';

SwiperCore.use([Autoplay]);

@Component({
  selector: 'app-slides',
  templateUrl: './slides.page.html',
  styleUrls: ['./slides.page.scss'],
  encapsulation: ViewEncapsulation.None
})

export class SlidesPage implements OnInit {

  data = [
    {
      img: "slide-1.jpg", 
      title: "know always where your buddy is!", 
      description: "Don't worry about your buddy, <b>always</b> be aware of where he is."
    }, 
    {
      img: "slide-2.jpg", 
      title: "know always where your buddy is!", 
      description: "Track every step. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    }, 
    {
      img: "slide-1.jpg", 
      title: "know always where your buddy is!", 
      description: "Donec eget est ultrices, tincidunt orci in, venenatis magna. Suspendisse mattis congue tempor."
    }
  ]

  constructor(private userService: UserService) {}

  ngOnInit() {
  }


  onSlideChange() {
  }

}
