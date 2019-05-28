import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../_services/productService';
import { Globals } from '../_services/globalvariables';

@Component({
  selector: 'app-home-product-list',
  templateUrl: './home-product-list.component.html',
  styleUrls: ['./home-product-list.component.scss']
})
export class HomeProductListComponent implements OnInit {
productList:any;
encryptedSliderId:string;
isPriceVisible=true;
isB2B=false;
isBulkOrder=false;
  constructor(private router: Router,
    private spinner: NgxSpinnerService,
    private productService:ProductService,
    private route: ActivatedRoute,private global:Globals) { }

  ngOnInit() {
   this.encryptedSliderId=this.route.snapshot.paramMap.get('id');
    this.GetHomeProductList(this.encryptedSliderId);
    this.isPriceVisible=this.global.isPriceVisible;
    this.isB2B=this.global.isB2B;
    this.isBulkOrder=this.global.isBulkOrder;
  }
  GetHomeProductList(encryptedSliderId)
  {
    this.spinner.show();
    this.productService.getHomeProductList(encryptedSliderId).subscribe(
      result => {
        if (result.IsSuccess === true) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
          this.productList = result.Data;
          return this.productList;
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
