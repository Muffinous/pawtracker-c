import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import SwiperCore, { Autoplay } from 'swiper';

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
      title: "Have your buddy's information at a single click",
      description: "Don't worry about your buddy, <b>save</b> your buddy's important data in the app."
    }, 
    {
      img: "slide-2.jpg", 
      title: "Mark important appointments on the calendar",
      description: "Create a new event for each important <b>appointment</b> or <b>reminder</b> for your buddy!"
    }, 
    {
      img: "slide-3.jpg", 
      title: "With an adopt section, now you can have all in one app!",
      description: "Ideal for finding a <b>forever home</b> for an animal!"
    }
  ]

  constructor() {}

  ngOnInit() {
  }


  onSlideChange() {
  }

}
