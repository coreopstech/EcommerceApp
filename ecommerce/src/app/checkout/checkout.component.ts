import { Component, OnInit, ViewChild } from '@angular/core';
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
import { UserAddress } from '../_models/userAddress';
import { Globals } from './../_services/globalvariables';
import { createHash, createHmac } from 'crypto';
import { Buffer } from 'buffer';
import * as crypto from "crypto";

declare const $;
declare var jQuery: any;
declare var Razorpay: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckOutComponent implements OnInit {
  @ViewChild('stepper') stepper;
  shypliteData: any;
  customerAddress: UserAddress;
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
  isAddNewAddress = false;
  cities: any;
  isPriceVisible: true;
  isB2B: false;
  isBulkOrder: false;
  userDetails: any;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrManager,
    private myCartService: MyCartService,
    private userService: UserService,
    private headerService: HeaderMenuService,
    private orderService: OrderService,
    private global: Globals) {

  }

  ngOnInit() {
    this.loginModel = new User();
    this.route.queryParams
      .subscribe(params => {
        this.otraker = params.otracker;
      });
    this.isPriceVisible = this.global.isPriceVisible;
    this.isB2B = this.global.isB2B;
    this.isBulkOrder = this.global.isBulkOrder;
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
      this.userDetails = JSON.parse(localStorage.getItem("currentidentity"));

      this.userName = JSON.parse(localStorage.getItem("currentidentity")).name;

      if (this.otraker != '' && this.otraker == 'buynow_click') {
        this.getBuyNowCartList();
      }

      else
        this.getCartList();
      this.getAddressList();
      this.stepper.completed = true;
      this.stepper.selectedIndex = 1;
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
    var buyNowData = localStorage.getItem("buynow");
    if (buyNowData != null) {
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
    else {
      this.router.navigate(['/viewcart']);
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
    }
  }
  getCartWithAddressList() {
    this.spinner.show();
    this.productCartList = this.myCartService.getSavedCartWithAddressList(this.selectedAddressId).subscribe(
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
  getBuyNowCartWithAddressList() {
    this.spinner.show();
    var buyNowData = localStorage.getItem("buynow");
    if (buyNowData != null) {
      this.productCartList = this.myCartService.getBuyNowCartWithAddressList(this.selectedAddressId).subscribe(
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
    else {
      this.router.navigate(['/viewcart']);
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
    }
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
    this.isAddNewAddress = false;
  }
  RemoveProduct(encryptedProductDetailsId, ProductDetailsId) {
    this.spinner.show();
    if (this.otraker != '' && this.otraker == 'buynow_click') {
      localStorage.removeItem("buynow");
      var buyNowData = localStorage.getItem("buynow");
      if (buyNowData != null) {
        this.productCartList = this.getBuyNowCartList();
        this.userService.changePriceCalculation(true);
      }
      else {
        if (this.productCartList == null) {
          this.router.navigate(['/viewcart']);
        }
        if (this.productCartList.length <= 0) {
          this.router.navigate(['/viewcart']);
        }
      }

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
    this.spinner.show();
    if (this.otraker != '' && this.otraker == 'buynow_click')
      this.getBuyNowCartWithAddressList();
    else
      this.getCartWithAddressList();

    this.isOrderSummaryVisible = true;
    stepper.next();
  }

  OpenPaymentOptions(stepper: MatStepper) {
    this.isPaymentOptionsVisible = true;
    stepper.next();
  }
  OpenAddNewAddress() {
    this.isAddNewAddress = true;
    this.customerAddress = new UserAddress();
    this.ShowAddressDetails('0');
  }

  SetPaymentOptions(str) {
    if (str == "COD")
      this.paymentType = 1;
    else
      this.paymentType = 2;
  }
  SaveOrderDetails() {
    this.spinner.show();

    if (this.otraker != '' && this.otraker == 'buynow_click') {

      if (this.paymentType == 1) {
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

        let options = {
          key: "rzp_test_glA246D8rCFOVc",
          amount: this.productData.TotalPayableAmount * 100,
          name: this.userDetails.name,
          description: "",
          prefill: {
            name: this.userDetails.name,
            email: this.userDetails.email
          },
          notes: {
            address: this.userDetails.address
          },
          theme: {
            color: "green"
          },
          handler: this.paymentBuyNowResponseHander.bind(this)
        }

        let rzp = new Razorpay(options);
        rzp.open();
      }

    }
    else {
      if (this.paymentType == 1) {
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
      else {
        let options = {
          key: "rzp_test_rTbSgxsGTPjexX",
          amount: this.productData.TotalPayableAmount * 100,
          name: this.userDetails.name,
          description: "",
          prefill: {
            name: this.userDetails.name,
            email: this.userDetails.email,
          },
          notes: {
            address: this.userDetails.Address
          },
          theme: {
            color: "green"
          },
          handler: this.paymentResponseHander.bind(this)
        }

        let rzp = new Razorpay(options);
        rzp.open();
      }
    }
  }
  paymentBuyNowResponseHander(response) {
    if (response.razorpay_payment_id != null && response.razorpay_payment_id != '') {
      this.orderService.saveonlinebuynoworder(this.paymentType, this.selectedAddressId, response.razorpay_payment_id).subscribe(
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
      this.toastr.errorToastr("Payment Failed");
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)

    }
  }
  paymentResponseHander(response) {
    if (response.razorpay_payment_id != null && response.razorpay_payment_id != '') {
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
    else {
      this.toastr.errorToastr("Payment Failed");
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)

    }
  }
  ShowAddressDetails(addressId) {
    this.spinner.show();

    if (addressId === '')
      addressId = 0;
    this.userService.getAddressDetails(addressId)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.customerAddress = result.Data;
            if (this.customerAddress.CityList != null && this.customerAddress.CityList.length > 0) {
              this.cities = this.customerAddress.CityList;
              this.customerAddress = result.Data;
            }
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
  SaveAddress(stepper: MatStepper) {
    this.spinner.show();
    this.userService.saveUserAddressDetails(this.customerAddress)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.selectedAddressId = result.EncryptedAddressId;
            this.isAddNewAddress = false;
            this.getAddressList();
            this.customerAddress = new UserAddress();
            this.ShowAddressDetails('0');
            if (this.otraker != '' && this.otraker == 'buynow_click')
              this.getBuyNowCartWithAddressList();
            else
              this.getCartWithAddressList();

            this.isOrderSummaryVisible = true;
            stepper.next();
          }
          else {
            this.toastr.errorToastr(result.Message);
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          this.toastr.errorToastr(error);
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });

  }
  onStateChange(stateId) {
    this.userService.getCityList(stateId)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.cities = result.Data;
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
  }
}
