import { Component, OnInit } from '@angular/core';
import { BulkOrder } from './../_models/bulkOrder';
import { Cart } from './../_models/cart';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar, MatDialog } from '@angular/material';
import { UserService } from '../_services/userService';
import { FormBuilder } from '@angular/forms';
import { WishListService } from '../_services/wishListService';
import { ProductDetailService } from '../_services/productDetailsService';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Globals } from './../_services/globalvariables';
import { ModalComponent } from './../modal/modal.component';
declare const $;
declare var jQuery: any;
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

export class ProductDetailsComponent implements OnInit {
  slideConfig = {
    slidesToShow: 6,
    slidesToScroll: 6,
  };
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
  maximumQuantity = 0;
  isPriceVisible:true;
  isB2B:false;
  isBulkOrder:false;
  bulkOrder:BulkOrder;
  constructor(private route: ActivatedRoute, private router: Router, private productDetailService: ProductDetailService,
    private spinner: NgxSpinnerService,
    private toast: ToastrManager,
    private userService: UserService,
    private wishlistService: WishListService,
    private formBuilder: FormBuilder,
    private global:Globals,
    public dialog: MatDialog,
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
    this.route.queryParams
      .subscribe(params => {
        this.productId = params.p;
        this.productDetailId = params.pd;
      });
    
    this.route.data.subscribe((data => { this.products = data.productDetails }));
    // this.products = this.route.snapshot.data['productDetails'];
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
    this.isPriceVisible=this.global.isPriceVisible;
    this.isB2B=this.global.isB2B;
    this.isBulkOrder=this.global.isBulkOrder;
  }
  getColorList(productId: string, productDetailId: string): any {
    this.spinner.show();
    this.productDetailService.getProductColorList(productId, productDetailId).subscribe(
      result => {
        if (result.IsSuccess === true) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
          return this.productColorList = result.Data;
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

  getVariantList(productId: string, productDetailId: string): any {
    this.spinner.show();
    this.productDetailService.getProductVariantList(productId, productDetailId).subscribe(
      result => {
        if (result.IsSuccess === true) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
          return this.productVariantList = result.Data;
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
  getVariantGroupList(productId: string, productDetailId: string): any {
    this.spinner.show();
    this.productDetailService.getProductVariantGroupList(productId, productDetailId).subscribe(
      result => {
        if (result.IsSuccess === true) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
          return this.productVariantGroupList = result.Data;
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
            setTimeout(() => {
              this.spinner.hide();

            }, 1000)
            this.userService.changeCartValue(0);
            this.toast.successToastr('Added to bag', '');
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
        if (totalProduct == this.maximumQuantity) {
          this.toast.infoToastr("Only" + this.maximumQuantity + "items allowed", '');
        }
        else {
          this.myCart.push(new Cart(productDetailsId, encryptedproductDetailsId, 1, false));
          localStorage.setItem("cartList", JSON.stringify(this.myCart));
          this.userService.changeCartValue(0);
          this.toast.successToastr("Added to bag");
          
        }
      }
      else {
        this.myCart.push(new Cart(productDetailsId, encryptedproductDetailsId, 1, false));
        localStorage.setItem("cartList", JSON.stringify(this.myCart));
        this.userService.changeCartValue(0);
        this.toast.successToastr("Added to bag");
        
      }
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
    }
    setTimeout(() => 1000);
    return this.router.navigate(["/viewcart"]);
  }
  BuyNow(encryptedproductDetailsId: string, productDetailsId: number, encryptedProductId, productId) {
    this.spinner.show();
    var body = {
      EncryptedProductDetailsId: encryptedproductDetailsId,
      ProductDetailsId: productDetailsId,
      ProductQuantity: 1
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 1000)
    localStorage.setItem('buynow', JSON.stringify({ itemId: encryptedproductDetailsId, quantity: 1 }));
    this.router.navigate(['checkout'], { queryParams: { otracker: "buynow_click" } });
  }
  AddToWishList(encryptedproductDetailsId, encryptedProductId) {
    this.spinner.show();
    if (localStorage.getItem("currentidentity")) {
      this.wishlistService.saveProductIntoWishList(encryptedproductDetailsId, encryptedProductId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            this.toast.successToastr("Added to your WishList");
          }
          else {

          }
        },
        (err) => {


        });
    }
    else {
      this.toast.infoToastr("Please login for wishlisting a product");
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 1000)
  }
  RemoveToWishList(encryptedproductDetailsId, encryptedProductId) {
    this.spinner.show();
    if (localStorage.getItem("currentidentity")) {
      this.wishlistService.removeProductIntoWishList(encryptedproductDetailsId, encryptedProductId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            this.toast.successToastr("Removed from your Wishlist");
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
    this.bulkOrderData.MobileNumber = "";
    this.bulkOrderData.Email = "";
    this.bulkOrderData.ProductQuantity = 0;
    jQuery('#BulkOrderModel').modal('show');
  }
  onSubmit() {
    this.spinner.show();
    this.submitted = true;


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
            this.toast.successToastr("Your Order has been Confirmed. Will connect with you soon!");
            // this.toast.success("Your Order has been Confirmed. Will connect with you soon!");
            this.loading = false;
          }
          else {
            this.toast.errorToastr(result.Message, '');

            this.loading = false;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          this.toast.errorToastr(error, '')
          this.loading = false;
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
    this.loading = false;
  }
  onBulkOrder(encryptedproductDetailsId: string,encryptedProductId: string) {
    this.bulkOrder = new BulkOrder();
    this.bulkOrder.EncryptedProductDetailsId=encryptedproductDetailsId;
    this.bulkOrder.EncryptedProductId=encryptedProductId;
    this.bulkOrder.ProductQuantity=0;
    this.bulkOrder.Email='';
    this.bulkOrder.MobileNumber='';
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { action: 'bulkOrder', title: 'Bulk Order', bulkOrder: this.bulkOrder }
    });
  }

}
