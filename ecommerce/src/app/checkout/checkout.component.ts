import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MyCartService } from '../_services/mycartService';
import { UserService } from '../_services/userService';
import { HeaderMenuService } from './../_services/headerMenuService';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../_models/user';
import { MatStepper } from '@angular/material';
import { OrderService } from '../_services/orderService';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckOutComponent implements OnInit {
  isLinear = false;
  loginForm: FormGroup;
  loginModel: User;
  loading = false;
  submitted = false;
  userName: string;
  isLogged = false;
  productCartList: any;
  productData: any;
  encryptedProductDetailsId: string;
  otraker: string;
  customerAddressList: any;
  selectedAddressId = '';
  isOrderSummaryVisible = false;
  isPaymentOptionsVisible = false;
  paymentType = 0;


  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrManager,
    private myCartService: MyCartService,
    private userService: UserService,
    private headerService: HeaderMenuService,
    private orderService: OrderService) {

  }

  ngOnInit() {
    this.loginModel = new User();
    this.route.queryParams
      .subscribe(params => {
        this.otraker = params.otracker;
      });

    this.userService.pricechange.subscribe(status => {
      if (status) {
        if (this.otraker != '' && this.otraker == 'buynow_click')
          this.getBuyNowCartList();
        else
          this.getCartList();
      }
    });

    if (localStorage.getItem("currentidentity")) {
      this.isLogged = true;
      this.userName = JSON.parse(localStorage.getItem("currentidentity")).name;
      this.getAddressList();
      if (this.otraker != '' && this.otraker == 'buynow_click')
        this.getBuyNowCartList();
      else
        this.getCartList();
      // alert(this.productCartList.length);
      // if (this.productCartList.length === undefined)
      //   this.router.navigate(['/viewcart']);
      // if (this.productCartList == null) {
      //   this.router.navigate(['/viewcart']);
      // }
      // if (this.productCartList.length <= 0) {
      //   this.router.navigate(['/viewcart']);
      // }
    }

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
          this.router.navigate(['/viewcart']);
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        }
      },
      (err) => {
        this.router.navigate(['/viewcart']);
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
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
          this.router.navigate(['/viewcart']);
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        }
      },
      (err) => {
        this.router.navigate(['/viewcart']);
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
      });
  }
  onLogin(stepper: MatStepper) {
    this.spinner.show();
    this.submitted = true;
    this.authenticationService.login(this.loginModel)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.isLogged = true;
            this.userName = JSON.parse(localStorage.getItem("currentidentity")).name;
            this.getAddressList();
            stepper.next();
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }
          else {
            this.toastr.errorToastr(result.Message, '');
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          this.toastr.errorToastr(error, '');
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
  }
  getAddressList() {
    if (localStorage.getItem("currentidentity")) {
      this.isLogged = true;
      this.userService.getUserAddressDetails()
        .subscribe(
          result => {
            if (result.IsSuccess) {
              this.customerAddressList = result.Data;
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
          error => {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          });
    }
  }

  SetAddressId(encryptedAddressId) {
    this.selectedAddressId = encryptedAddressId;
  }
  RemoveProduct(encryptedProductDetailsId, ProductDetailsId) {
    this.spinner.show();
    if (this.otraker != '' && this.otraker == 'buynow_click') {
      localStorage.removeItem("buynow")

      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
    }
    else {
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
      if (this.otraker != '' && this.otraker == 'buynow_click') {
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
      this.toastr.errorToastr("Only " + maximumQuantity + " product allowed.");
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
    }
  }
  SubtractProductQuantity(encryptedProductDetailsId, ProductDetailsId, encryptedProductId, ProductQuantity, minimumQuantity) {
    alert(ProductQuantity);
    this.spinner.show();
    if (minimumQuantity <= ProductQuantity - 1) {
      if (this.otraker != '' && this.otraker == 'buynow_click') {
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
      this.toastr.errorToastr("At Least " + minimumQuantity + " product added into cart.");
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
    }
  }
  OpenOrderSummary(stepper: MatStepper) {
    this.isOrderSummaryVisible = true;
    stepper.next();
  }
  OpenPaymentOptions(stepper: MatStepper) {
    this.isPaymentOptionsVisible = true;
    stepper.next();
  }
  SetPaymentOptions() {
    this.paymentType = 1;
  }
  SaveOrderDetails() {
    this.spinner.show();
    if (this.otraker != '' && this.otraker == 'buynow_click') {
      this.orderService.savebuynoworder(this.paymentType, this.selectedAddressId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            this.toastr.successToastr(result.Message);
            localStorage.removeItem("buynow");
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.router.navigate(["/account/orders"]);
          }
          else {
            this.toastr.errorToastr(result.Message);
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }
        },
        (err) => {
          this.toastr.errorToastr(err);
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
    }
    else {
      this.orderService.saveOrderDetails(this.paymentType, this.selectedAddressId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            this.toastr.successToastr(result.Message);
            this.userService.changeCartValue(0);
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.router.navigate(["/account/orders"]);
          }
          else {
            this.toastr.errorToastr(result.Message);
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }
        },
        (err) => {
          this.toastr.errorToastr(err);
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
    }
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
      return;
    }

    this.loading = true;
    //   this.authenticationService.login(this.f.username.value, this.f.password.value)
    //     .subscribe(
    //       result => {
    //         if (result.IsSuccess) {
    //           setTimeout(() => {
    //             this.spinner.hide();
    //           }, 1000)
    //           this.loginForm.reset();
    //           this.loading = false;
    //           this.ngOnInit();
    //         }
    //         else {
    //           this.toastr.error(result.Message);
    //           this.loading = false;
    //           setTimeout(() => {
    //             this.spinner.hide();
    //           }, 1000)
    //         }

    //       },
    //       error => {
    //         alert("error");
    //         this.toastr.error(error);
    //         this.loading = false;
    //         setTimeout(() => {
    //           this.spinner.hide();
    //         }, 1000)
    //       });
    //   this.loading = false;
  }
}
