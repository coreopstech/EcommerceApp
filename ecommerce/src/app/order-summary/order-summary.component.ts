import { Component, OnInit } from '@angular/core';
import { Cart } from './../_models/cart';
import { UserService } from '../_services/userService';
import { MyCartService } from '../_services/mycartService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';

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
  constructor(private userService: UserService, private myCartService: MyCartService,
    private spinner: NgxSpinnerService,
    private toast: ToastrManager,
    private router: Router) { }

  ngOnInit() {
    this.userService.change.subscribe(encryptedAddressId => {
      if (encryptedAddressId != '') {
        this.encryptedAddressId = encryptedAddressId;
        this.getCartList();
      }
      else {
        this.encryptedAddressId = '';
      }
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
  AddProductQuantity(encryptedProductDetailsId, ProductDetailsId, encryptedProductId, ProductQuantity, maximumQuantity) {
    this.spinner.show();
    if (maximumQuantity >= ProductQuantity + 1) {

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
    else {
      this.toast.errorToastr("Only " + maximumQuantity + " product allowed.");
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
    }
  }
  SubtractProductQuantity(encryptedProductDetailsId, ProductDetailsId, encryptedProductId, ProductQuantity, minimumQuantity) {
    alert(ProductQuantity);
    this.spinner.show();
    if (minimumQuantity <= ProductQuantity - 1) {
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
