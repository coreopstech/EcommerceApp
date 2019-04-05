import { Component, OnInit } from '@angular/core';
import { BulkOrder } from './../_models/bulkOrder';
import { Cart } from './../_models/cart';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../_services/userService';
import { FormBuilder } from '@angular/forms';
import { WishListService } from '../_services/wishListService';
import { ProductDetailService } from '../_services/productDetailsService';
declare const $;
declare var jQuery: any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {
  loading = false;
  submitted = false;
  bulkOrderData: BulkOrder;
  productId: string;        ////product Id
  productDetailId: string;   //// ProductDetilId
  productDetails: any;
  products: any;
  productImageList: any;
  productFirstImageList: any;
  productVariantList: any;
  productAttributeList: any;
  productDescription: any;
  isDataAvailable: boolean = false;
  productColorList: any;
  productVariantGroupList: any;
  imagesUrl: any;
  myCart: Cart[] = new Array();
  buyNowCart: Cart;
  constructor(private route: ActivatedRoute, private router: Router, private productDetailService: ProductDetailService,
    private spinner: NgxSpinnerService, 
    private snackBar: MatSnackBar,
    private userService: UserService,
    private wishlistService: WishListService,
    private formBuilder: FormBuilder,
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.spinner.show();
    this.route.queryParams
    .subscribe(params => {
      this.productId = params.p;
      this.productDetailId =  params.pd;
    });
    //this.productId = this.route.snapshot.paramMap.get('id');
    
    this.products = this.route.snapshot.data['productDetails'];
    this.productDetails = this.products.Data;
    this.productImageList = this.productDetails.ProductImagesList;
    this.productFirstImageList = this.productDetails.ProductImagesList[0];
    this.productDescription = this.productDetails.ProductDetailsList[0];
    this.productColorList = this.getColorList(this.productId, this.productDetailId);
    this.productVariantList = this.getVariantList(this.productId, this.productDetailId);
    this.productVariantGroupList = this.getVariantGroupList(this.productId, this.productDetailId);
    this.getProductImagesList();
    $(function () {
      var $easyzoom = $('.easyzoom').easyZoom();
      var api1 = $easyzoom.filter('.easyzoom--with-thumbnails').data('easyZoom');
      $('.thumbnails').on('click', 'a', function (e) {
        var $this = $(this);
        e.preventDefault();
        // Use EasyZoom's `swap` method
        api1.swap($this.data('standard'), $this.attr('href'));
      });
    });
    setTimeout(() => {
      this.spinner.hide();
    }, 1000)
  }
  getColorList(productId: string, productDetailId: string): any {
    this.productDetailService.getProductColorList(productId, productDetailId).subscribe(
      result => {
        if (result.IsSuccess === true) {
          return this.productColorList = result.Data;
        }
        else {
        }
      },
      (err) => {

      });
  }

  getVariantList(productId: string, productDetailId: string): any {
    this.productDetailService.getProductVariantList(productId, productDetailId).subscribe(
      result => {
        if (result.IsSuccess === true) {
          return this.productVariantList = result.Data;
        }
        else {
        }
      },
      (err) => {

      });
  }
  getVariantGroupList(productId: string, productDetailId: string): any {
    this.productDetailService.getProductVariantGroupList(productId, productDetailId).subscribe(
      result => {
        if (result.IsSuccess === true) {
          return this.productVariantGroupList = result.Data;
        }
        else {
        }
      },
      (err) => {

      });
  }
  getProductImagesList(): any {
    return this.productImageList = this.productDetails.ProductImagesList;
  }
  getVariantValueList(variantGroupId) {
    if (this.productVariantList != null && this.productVariantList.length > 0)
      return this.productVariantList.filter((x) => parseInt(x.VariantGroupId) == parseInt(variantGroupId));
    else
      return this.productVariantList;

  }
  AddToCart(encryptedproductDetailsId, productDetailsId, encryptedProductId, productId) {
    this.spinner.show();
    if (localStorage.getItem("currentidentity")) {
      this.productDetailService.saveProductIntoCart(encryptedproductDetailsId, encryptedProductId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            this.snackBar.open('Added to bag', '', {
              duration: 3000,
            });
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
    else {
      if (localStorage.getItem("cartList"))
        this.myCart = JSON.parse(localStorage.getItem("cartList"));
      if (this.myCart != null && this.myCart.length > 0 && this.myCart.filter((x) => x.IsSavedForLater == false).length > 0) {
        var totalProduct = this.myCart.filter((x) => x.ProductDetailsId === productDetailsId && x.IsSavedForLater == false).length;
        if (totalProduct == 4) {
          this.snackBar.open("Only 4 items allowed", '', {
            duration: 3000,
          });
        }
        else {
          this.myCart.push(new Cart(productDetailsId, encryptedproductDetailsId, 1, false));
          localStorage.setItem("cartList", JSON.stringify(this.myCart));
          this.snackBar.open("Added to bag", '', {
            duration: 3000,
          });
        }
      }
      else {
        this.myCart.push(new Cart(productDetailsId, encryptedproductDetailsId, 1, false));
        localStorage.setItem("cartList", JSON.stringify(this.myCart));
        this.snackBar.open("Added to bag", '', {
          duration: 3000,
        });
      }
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
    }
    setTimeout(() => {
      this.spinner.hide();
      this.router.navigate(["/viewcart"]);
    }, 1000)
    this.userService.changeCartValue(0);
  }
  BuyNow(encryptedproductDetailsId: string, productDetailsId: number, encryptedProductId, productId) {
    this.spinner.show();
    alert(encryptedproductDetailsId);
    alert(productDetailsId);
    var body = {
      EncryptedProductDetailsId: encryptedproductDetailsId,
      ProductDetailsId: productDetailsId,
      ProductQuantity: 1
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 1000)
    this.router.navigate(["/checkout"]);
  }
  AddToWishList(encryptedproductDetailsId, encryptedProductId) {
    this.spinner.show();
    if (localStorage.getItem("currentidentity")) {
      this.wishlistService.saveProductIntoWishList(encryptedproductDetailsId, encryptedProductId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            this.snackBar.open("Added to your WishList", '', {
              duration: 3000,
            });
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
    else {
      this.snackBar.open("Please login for wishlisting a product", '', {
        duration: 3000,
      });
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)

    }
  }
  RemoveToWishList(encryptedproductDetailsId, encryptedProductId) {
    this.spinner.show();
    if (localStorage.getItem("currentidentity")) {
      this.wishlistService.removeProductIntoWishList(encryptedproductDetailsId, encryptedProductId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            this.snackBar.open("Removed from your Wishlist", '', {
              duration: 3000,
            });
            
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
  OpenBulkOrderModal(encryptedproductDetailsId: string, productDetailsId, encryptedProductId: string, productId) {

    this.bulkOrderData = new BulkOrder();
    this.bulkOrderData.EncryptedProductDetailsId = encryptedproductDetailsId;
    this.bulkOrderData.EncryptedProductId = encryptedProductId;
    this.bulkOrderData.MobileNumber="";
    this.bulkOrderData.Email="";
    this.bulkOrderData.ProductQuantity=0;
    jQuery('#BulkOrderModel').modal('show');
  }
  onSubmit() {
    this.spinner.show();
    this.submitted = true;

    // stop here if form is invalid
    // if (this.bulkForm.invalid) {
    //   setTimeout(() => {
    //     this.spinner.hide();
    //   }, 1000)
    //   return;
    // }

    this.loading = true;
    this.productDetailService.saveBulkOrder(this.bulkOrderData)
      .subscribe(
        result => {
          if (result.IsSuccess) {

            setTimeout(() => {
              this.spinner.hide();
            }, 1000)

            //this.router.navigate([this.returnUrl]);
            jQuery('#BulkOrderModel').modal('hide');
            this.snackBar.open("Your Order has been Confirmed. Will connect with you soon!", '', {
              duration: 3000,
            });
           // this.toast.success("Your Order has been Confirmed. Will connect with you soon!");
            this.loading = false;
          }
          else {
            this.snackBar.open(result.Message, '', {
              duration: 3000,
            });
            
            this.loading = false;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          this.snackBar.open(error, '', {
            duration: 3000,
          });
          this.loading = false;
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
    this.loading = false;
  }

}
