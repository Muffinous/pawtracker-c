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

  slideOptions = {
    initialSlide: 0,
    speed: 400,
  };

  constructor() {}

  ngOnInit() {
  }

  onSlideChange() {

  }

  afterslidesLoad(slides) {
    slides.startAutoplay();
  }
}
