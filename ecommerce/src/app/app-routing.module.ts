import { ListingComponent } from './listing/listing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ReturnPolicyComponent } from './returnpolicy/returnpolicy.component';
import { ProductListComponent } from './productlist/productlist.component';

import { ProductDetailsResolve } from './_services/productDetails.reslove';
import { OrdersComponent } from './orders/orders.component';
import { OrderDetailsComponent } from './orderdetails/orderdetails.component';
import { CancelOrderComponent } from './cancelorder/cancelorder.component';
import { ReturnOrderComponent } from './returnorder/returnorder.component';
import { WriteReviewsComponent } from './writereviews/writereviews.component';
import { ViewCartComponent } from './viewcart/viewcart.component';
import { CheckOutComponent } from './checkout/checkout.component';
import { WishListComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' }
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'productdetails/id',
    component: ProductDetailsComponent,
    resolve: {
      productDetails: ProductDetailsResolve
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'productdetails',
    component: ProductDetailsComponent,
    resolve: {
      productDetails: ProductDetailsResolve
    },
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'account/orders',
    component: OrdersComponent
  },
  {
    path: 'order_details',
    component: OrderDetailsComponent
  },
  {
    path: 'orders/cancel-order', component: CancelOrderComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'orders/return-order', component: ReturnOrderComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'viewcart', component: ViewCartComponent,
    
  },
  {
    path: 'checkout', component: CheckOutComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'checkout', component: CheckOutComponent,
    
  },
  {
    path: 'write-reviews/:id', component: WriteReviewsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'listing',
    component: ListingComponent
  },
  {
    path: 'wishlist',
    component: WishListComponent
  },
  {
    path: 'about-us',
    component: AboutusComponent
  },
  {
    path: 'return-policy',
    component: ReturnPolicyComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'productlist', component: ProductListComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],




exports: [RouterModule]
})
export class AppRoutingModule { }
