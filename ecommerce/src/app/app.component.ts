import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { HomeService } from './_services/home.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  {
  title = 'ecommerce';
  constructor(private router: Router,
    private homeService:HomeService,
    private spinner:NgxSpinnerService
    ) {
   }

  ngOnInit() {
    this. getHomeDetails();
 
  }
  getHomeDetails(){
     this.spinner.show();
    this.homeService.getHomeDetails().subscribe(
      result => {
        if (result.IsSuccess === true) {
          localStorage.setItem('homedetails',JSON.stringify(result.Data));
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        }
        else {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        }
      },
      (err) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
      });
  }

}

