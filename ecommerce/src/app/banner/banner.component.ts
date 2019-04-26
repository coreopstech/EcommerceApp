import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeService } from './../_services/home.service';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {
  list:any;
  slides:any;
  // slides = [
  //   {img: 'assets/images/banner.jpg'},
  //   {img: 'assets/images/banner.jpg'},
  //   {img: 'assets/images/banner.jpg'},
  //   {img: 'assets/images/banner.jpg'}
  // ];
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  constructor(private homeService:HomeService,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.getBannerList();
  }
  getBannerList(){
    this.spinner.show();
    this.list=JSON.parse(localStorage.getItem('homedetails'));
    this.slides=this.list.HomeBannerList;
    setTimeout(() => {
      this.spinner.hide();
    }, 1000)
  }
}
