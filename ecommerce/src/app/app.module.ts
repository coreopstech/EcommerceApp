import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 import { ToastrModule } from 'ng6-toastr-notifications';

import {
  MatToolbarModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule,
  MatBadgeModule,
  MatMenuModule,
  MatExpansionModule,
  MatCheckboxModule,
  MatSliderModule,
  MatSelectModule,
  MatDialogModule,
  MatSnackBar,
  MatSnackBarModule,
  MatCardModule,
  MatChipsModule,
  MatPaginatorModule,
  MatRadioModule
  } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSpinnerModule } from 'ngx-spinner';
import { RatingModule } from'ngx-rating';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Component
import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { ListingComponent } from './listing/listing.component';
import { ModalComponent } from './modal/modal.component';
import { OrderDetailsComponent } from './orderdetails/orderdetails.component';
import { CancelOrderComponent } from './cancelorder/cancelorder.component';
import { ReturnOrderComponent } from './returnorder/returnorder.component';
import { WriteReviewsComponent } from './writereviews/writereviews.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ReturnPolicyComponent } from './returnpolicy/returnpolicy.component';
import { ProductListComponent } from './productlist/productlist.component';

//Services
import { HeaderMenuService } from './_services/headerMenuService';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/userService';
import { HomeService } from './_services/home.service';
import { ProductService } from './_services/productService';
import { PagerService } from './_services/pager.service';
import { WishListService } from './_services/wishListService';
import { ProductDetailsResolve } from './_services/productDetails.reslove';
import { ProductDetailService } from './_services/productDetailsService';
import { OrderService } from './_services/orderService';
import { ReviewRatingService } from './_services/reviewRatingService';
import { ViewCartComponent } from './viewcart/viewcart.component';
import { CheckOutComponent } from './checkout/checkout.component';
import { MyCartService } from './_services/mycartService';
import { CustomerAddressComponent } from './customer-address/customer-address.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { PaymentOptionsComponent } from './payment-options/payment-options.component';
import { WishListComponent } from './wishlist/wishlist.component';
import { ShippingComponent } from './shipping/shipping.component';
import { CancellationComponent } from './cancellation/cancellation.component';
import { FaqComponent } from './faq/faq.component';
import { TermsComponent } from './terms/terms.component';
import { SecurityComponent } from './security/security.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { PaymentsComponent } from './payments/payments.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AccountComponent } from './account/account.component';
import { AccountmenuComponent } from './accountmenu/accountmenu.component';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { HomeProductListComponent } from './home-product-list/home-product-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    BannerComponent,
    ListingComponent,
    ModalComponent,
    AboutusComponent,
    ReturnPolicyComponent,
    ProductListComponent,
    ProductDetailsComponent,
    OrdersComponent,
    OrderDetailsComponent,
    CancelOrderComponent,
    ReturnOrderComponent,
    WriteReviewsComponent,
    ViewCartComponent,
    CheckOutComponent,
    CustomerAddressComponent,
    OrderSummaryComponent,
    PaymentOptionsComponent,
    WishListComponent,
    ShippingComponent,
    CancellationComponent,
    FaqComponent,
    TermsComponent,
    SecurityComponent,
    PrivacyComponent,
    PaymentsComponent,
    ContactusComponent,
    AccountComponent,
    AccountmenuComponent,
    CustomerlistComponent,
    ReviewsComponent,
    HomeProductListComponent
  ],
  imports: [



BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatBadgeModule,
    SlickCarouselModule,
    MatMenuModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatSliderModule,
    MatSelectModule,
    MatDialogModule,
    NgxSpinnerModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCardModule,
    MatChipsModule,
    MatPaginatorModule,
    MatRadioModule,
    FormsModule,
    ReactiveFormsModule,
     ToastrModule.forRoot(),
     RatingModule
     
   
  ],
  providers: [
     //By Ajeet //
     HeaderMenuService,
     AuthenticationService,
     UserService,
     HomeService,
     ProductService,
     PagerService,
     WishListService,
     ProductDetailsResolve,
     ProductDetailService,
     OrderService,
     ReviewRatingService,
     MyCartService

  ],
  entryComponents: [ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
