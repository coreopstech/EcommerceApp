import { ListingComponent } from './listing/listing.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ReturnPolicyComponent } from './returnpolicy/returnpolicy.component';
import { ProductListComponent } from './productlist/productlist.component';
import { ProductDetailsResolve } from './_services/productDetails.reslove';

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
    path: 'listing',
    component: ListingComponent
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
