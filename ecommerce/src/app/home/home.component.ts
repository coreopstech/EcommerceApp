import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HomeService } from './../_services/home.service';
import { Globals } from './../_services/globalvariables';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  list:any;
  homeProductList:any;
  isPriceVisible=true;
  isB2B=false;
  isBulkOrder=false;
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      }, {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false
        }
      }
    ]
    /* autoplay: true,
    autoplaySpeed: 2000, */
  };
  constructor(private router: Router,
    private homeService:HomeService,
    private global:Globals) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
    this.isPriceVisible=this.global.isPriceVisible;
    this.isB2B=this.global.isB2B;
    this.isBulkOrder=this.global.isBulkOrder;
   }

  ngOnInit() {
    this.list=JSON.parse(localStorage.getItem('homedetails'));
    this.homeProductList=this.list.HomeProducts;
    
  
  }

}
