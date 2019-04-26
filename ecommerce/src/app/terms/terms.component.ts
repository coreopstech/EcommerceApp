import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from './../_services/home.service';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss']
})
export class TermsComponent implements OnInit {

  encryptedMenuId:string;
  footerPageData:any;
    constructor(private spinner:NgxSpinnerService,
      private route: ActivatedRoute,
      private homeService:HomeService) { }
  
    ngOnInit() {
      this.route.queryParams
        .subscribe(params => {
          this.encryptedMenuId=params.q;
        });
        this.getFooterPageDetails();
    }
  getFooterPageDetails()
  {
    this.spinner.show();
    this.homeService.getFooterPagesDetails(this.encryptedMenuId)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.footerPageData=result.Data;
          }
          else {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
  }

}
