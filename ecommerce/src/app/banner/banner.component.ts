import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  slides = [
    {img: 'assets/images/banner.jpg'},
    {img: 'assets/images/banner.jpg'},
    {img: 'assets/images/banner.jpg'},
    {img: 'assets/images/banner.jpg'}
  ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    /* autoplay: true,
    autoplaySpeed: 2000, */
  };
  constructor() { }

  ngOnInit() {
  }

}
