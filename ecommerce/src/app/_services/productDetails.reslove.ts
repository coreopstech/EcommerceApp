import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProductDetailService } from './productDetailsService';
@Injectable()
export class ProductDetailsResolve implements Resolve<any> {
 constructor(private  dataservice: ProductDetailService){}
 resolve(route:ActivatedRouteSnapshot, 
        state:RouterStateSnapshot,
       ): any {
    return this.dataservice.getProductDetails(route.queryParams['p'],route.queryParams['pd']);  
  }
}