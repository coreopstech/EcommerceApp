import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  slides = [
    {img: 'assets/images/f1.jpg'},
    {img: 'assets/images/f1.jpg'},
    {img: 'assets/images/f1.jpg'},
    {img: 'assets/images/f1.jpg'},
    {img: 'assets/images/f1.jpg'},
    {img: 'assets/images/f1.jpg'},
    {img: 'assets/images/f1.jpg'},
    {img: 'assets/images/f1.jpg'}
  ];
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    /* autoplay: true,
    autoplaySpeed: 2000, */
  };
  constructor() { }

  ngOnInit() {
  }

}
