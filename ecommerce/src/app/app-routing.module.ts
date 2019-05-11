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
import { ShippingComponent } from './shipping/shipping.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { FaqComponent } from './faq/faq.component';
import { SecurityComponent } from './security/security.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { PaymentsComponent } from './payments/payments.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AccountComponent } from './account/account.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { HomeProductListComponent } from './home-product-list/home-product-list.component';

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
    path: 'homeproducts/:id',
    component: HomeProductListComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
    
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'productdetails/:id',
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
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'account/orders',
    component: OrdersComponent
  },
  {
    path: 'account/addresses',
    component: AccountComponent
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
    path: 'account/reviews',
    component: AccountComponent
  },
  {
    path: 'listing',
    component: ListingComponent
  },
  {
    path: 'account/wishlist',
    component: AccountComponent
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
    path: 'shipping-policy',
    component: ShippingComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'cancellation-policy',
    component: CancellationComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'helpcenter',
    component: FaqComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'security',
    component: SecurityComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'terms',
    component: TermsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'payments',
    component: PaymentsComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange'
  },
  {
    path: 'contact-us',
    component: ContactusComponent,
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
