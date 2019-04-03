import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { NgxSpinnerModule } from 'ngx-spinner';

//Component
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { BannerComponent } from './banner/banner.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ListingComponent } from './listing/listing.component';
import { ModalComponent } from './modal/modal.component';

//Services
import { HeaderMenuService } from './_services/headerMenuService';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/userService';
import { HomeService } from './_services/home.service';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ReturnPolicyComponent } from './returnpolicy/returnpolicy.component';
import { ProductListComponent } from './productlist/productlist.component';
import { ProductService } from './_services/productService';
import { PagerService } from './_services/pager.service';
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    BannerComponent,
    ProductDetailsComponent,
    ListingComponent,
    ModalComponent,
    AboutusComponent,
    ReturnPolicyComponent,
    ProductListComponent
  ],
  imports: [
  BrowserModule,
    AppRoutingModule,
    FormsModule,
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
    MatPaginatorModule

   
  ],
  providers: [
     //By Ajeet //
     HeaderMenuService,
     AuthenticationService,
     UserService,
     HomeService,
     ProductService,
     PagerService
  ],
  entryComponents: [ModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
