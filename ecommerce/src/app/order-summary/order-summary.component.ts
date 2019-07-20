import { Component, OnInit } from '@angular/core';
import { Cart } from './../_models/cart';
import { UserService } from '../_services/userService';
import { MyCartService } from '../_services/mycartService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {

  encryptedAddressId = "";
  productCartList: any;
  productData: any;
  selectedEncryptAddressId = "";
  buyNowCart: Cart;
  otraker: string;
  constructor(private userService: UserService, private myCartService: MyCartService,
    private spinner: NgxSpinnerService,
    private toast: ToastrManager,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.otraker = params.otracker;
      });
    this.userService.change.subscribe(encryptedAddressId => {
      if (encryptedAddressId != '') {
        this.encryptedAddressId = encryptedAddressId;
        if (this.otraker!='' && this.otraker == 'buynow_click')
          this.getBuyNowCartList();
        else
          this.getCartList();
      }
      else {
        this.encryptedAddressId = '';
      }
    });

  }
  getBuyNowCartList() {
    this.spinner.show();
    this.productCartList = this.myCartService.getBuyNowCartList().subscribe(
      result => {
        if (result.IsSuccess === true) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
          this.productData = result.Data;
          return this.productCartList = result.Data.productList;
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

  getCartList() {
    this.spinner.show();
    this.productCartList = this.myCartService.getSavedCartList().subscribe(
      result => {
        if (result.IsSuccess === true) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
          this.productData = result.Data;
          return this.productCartList = result.Data.productList;
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
  RemoveProduct(encryptedProductDetailsId, ProductDetailsId) {
    this.spinner.show();
    if (this.otraker!='' && this.otraker == 'buynow_click') {
      localStorage.removeItem("buynow")
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
    }
    else{
    this.myCartService.RemoveProductIntoCart(encryptedProductDetailsId).subscribe(
      result => {
        if (result.IsSuccess === true) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
          this.productCartList = this.getCartList();
          this.userService.changePriceCalculation(true);
          this.userService.changeCartValue(0);
          if (this.productCartList == null) {
            this.router.navigate(['/viewcart']);
          }
          if (this.productCartList.length <= 0) {
            this.router.navigate(['/viewcart']);
          }
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
  AddProductQuantity(encryptedProductDetailsId, ProductDetailsId, encryptedProductId, ProductQuantity, maximumQuantity) {
    this.spinner.show();
    if (maximumQuantity >= ProductQuantity + 1) {
      if (this.otraker!='' && this.otraker== 'buynow_click') {
        var buyNowCart = JSON.parse(localStorage.getItem("buynow"));
        localStorage.setItem("buynow", JSON.stringify({ itemId: buyNowCart.itemId, quantity: buyNowCart.quantity + 1 }));
        this.userService.changePriceCalculation(true);
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
      }
      else {
        this.myCartService.UpdateProductQuantity(encryptedProductDetailsId, encryptedProductId, ProductQuantity + 1).subscribe(
          result => {
            if (result.IsSuccess === true) {
              setTimeout(() => {
                this.spinner.hide();
              }, 1000)
              this.getCartList();

              this.userService.changePriceCalculation(true);
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
    else {
      this.toast.errorToastr("Only " + maximumQuantity + " product allowed.");
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
    }
  }
  SubtractProductQuantity(encryptedProductDetailsId, ProductDetailsId, encryptedProductId, ProductQuantity, minimumQuantity) {
    
    this.spinner.show();
    if (minimumQuantity <= ProductQuantity - 1) {
      if (this.otraker!='' && this.otraker == 'buynow_click') {
        var buyNowCart = JSON.parse(localStorage.getItem("buynow"));
        localStorage.setItem("buynow", JSON.stringify({ itemId: buyNowCart.itemId, quantity: buyNowCart.quantity - 1 }));
        this.userService.changePriceCalculation(true);
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
      }
      else {
        this.myCartService.UpdateProductQuantity(encryptedProductDetailsId, encryptedProductId, ProductQuantity - 1).subscribe(
          result => {
            if (result.IsSuccess === true) {
              setTimeout(() => {
                this.spinner.hide();
              }, 1000)
              this.getCartList();
              this.userService.changePriceCalculation(true);
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
    else {
      this.toast.errorToastr("At Least " + minimumQuantity + " product added into cart.");
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
    }
  }
  OpenPaymentOptions(encryptedAddressId) {
    this.userService.setAddressId_Order(encryptedAddressId);
    this.selectedEncryptAddressId = encryptedAddressId;
  }
  ShowOrderSummary() {
    this.userService.setAddressId_Order('');
    this.selectedEncryptAddressId = '';
    this.ngOnInit();
  }


}
