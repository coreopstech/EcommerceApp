import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProductDetailService } from './productDetailsService';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable()
export class ProductDetailsResolve implements Resolve<any> {

  constructor(private dataservice: ProductDetailService, private spinner: NgxSpinnerService) { }
  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Promise<any>|any {
let data:any=this.dataservice.getProductDetails(route.queryParams['p'], route.queryParams['pd']);
    if(data)
    {
      debugger;
      return data;
    }
  }
}