import { Component, OnInit } from '@angular/core';
import { MyCartService } from '../_services/mycartService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from '../_services/userService';
import { HeaderMenuService } from './../_services/headerMenuService';

@Component({
  selector: 'app-viewcart',
  templateUrl: './viewcart.component.html',
  styleUrls: ['./viewcart.component.scss']
})
export class ViewCartComponent implements OnInit {

  productCartList: any;
  productData: any;
  savedProductData: any;
  productSavedForLaterList: any;
  constructor(private myCartService: MyCartService,
    private spinner: NgxSpinnerService,
    private toast: ToastrManager,
    private router: Router,
    private userService: UserService,
    private headerService: HeaderMenuService) {

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

    this.getCartList();
    this.getSavedForLaterList();
  }
  getCartList() {
    this.spinner.show();
    this.productCartList = this.myCartService.getCartList().subscribe(
      result => {
        if (result.IsSuccess === true) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
          this.productData = result.Data;
          return this.productCartList = result.Data.productList;
        }
        else {
          this.productData = result.Data;
          return this.productCartList = result.Data.productList;
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
    this.userService.changeCartValue(0);
  }
  getSavedForLaterList() {
    this.spinner.show();
    this.myCartService.getSavedForLaterList().subscribe(
      result => {
        if (result.IsSuccess === true) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
          this.savedProductData = result.Data;
          return this.productSavedForLaterList = result.Data.productList;
        }
        else {
          this.savedProductData = result.Data;
          return this.productSavedForLaterList = result.Data.productList;
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
    if (localStorage.getItem("currentidentity")) {
      this.myCartService.RemoveProductIntoCart(encryptedProductDetailsId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)

            this.ngOnInit();
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
      if (localStorage.getItem("cartList")) {
        var cart = JSON.parse(localStorage.getItem("cartList"));
        cart = cart.filter((x) => x.ProductDetailsId != ProductDetailsId && x.IsSavedForLater == false);
        if (cart != null && cart.length > 0) {
          localStorage.setItem("cartList", JSON.stringify(cart));
        }
        else {
          localStorage.removeItem("cartList");
        }
      }
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)

      this.ngOnInit();
    }
    this.userService.changeCartValue(0);
  }
  RemoveProductSavedLater(encryptedProductDetailsId, ProductDetailsId) {
    this.spinner.show();
    if (localStorage.getItem("currentidentity")) {
      this.myCartService.RemoveProductIntoSavedLater(encryptedProductDetailsId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)

            this.ngOnInit();
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
      if (localStorage.getItem("cartList")) {
        var cart = JSON.parse(localStorage.getItem("cartList"));
        cart = cart.filter((x) => x.ProductDetailsId != ProductDetailsId && x.IsSavedForLater == true);
        if (cart != null && cart.length > 0) {
          localStorage.setItem("cartList", JSON.stringify(cart));
        }
        else {
          localStorage.removeItem("cartList");
        }
      }
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
      this.ngOnInit();
    }
  }
  AddProductQuantity(encryptedProductDetailsId, ProductDetailsId, encryptedProductId, ProductQuantity, maximumQuantity) {
    alert(maximumQuantity);
    //alert(ProductQuantity);
    this.spinner.show();
    if (maximumQuantity >= ProductQuantity + 1) {
      if (localStorage.getItem("currentidentity")) {
        this.myCartService.UpdateProductQuantity(encryptedProductDetailsId, encryptedProductId, ProductQuantity + 1).subscribe(
          result => {
            if (result.IsSuccess === true) {
              setTimeout(() => {
                this.spinner.hide();
              }, 1000)
              this.ngOnInit();
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
        if (localStorage.getItem("cartList")) {
          var cart = JSON.parse(localStorage.getItem("cartList"));
          var index = cart.findIndex((element) => element.ProductDetailsId === ProductDetailsId && element.IsSavedForLater == false);
          cart[index].ProductQuantity = ProductQuantity + 1;
          console.log(cart);
          if (cart != null && cart.length > 0) {
            localStorage.setItem("cartList", JSON.stringify(cart));
          }
          else {
            localStorage.removeItem("cartList");
          }
        }
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
        this.ngOnInit();
      }
    }
    else {
      this.toast.errorToastr("Only " + maximumQuantity + " product allowed.");
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
    }
    this.userService.changeCartValue(0);
  }
  SubtractProductQuantity(encryptedProductDetailsId, ProductDetailsId, encryptedProductId, ProductQuantity, minimumQuantity) {
    alert(ProductQuantity);
    this.spinner.show();
    if (minimumQuantity <= ProductQuantity - 1) {
      if (localStorage.getItem("currentidentity")) {
        this.myCartService.UpdateProductQuantity(encryptedProductDetailsId, encryptedProductId, ProductQuantity - 1).subscribe(
          result => {
            if (result.IsSuccess === true) {
              setTimeout(() => {
                this.spinner.hide();
              }, 1000)
              this.ngOnInit();
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
        if (localStorage.getItem("cartList")) {
          var cart = JSON.parse(localStorage.getItem("cartList"));
          var index = cart.findIndex((element) => element.ProductDetailsId === ProductDetailsId && element.IsSavedForLater == false);
          cart[index].ProductQuantity = ProductQuantity - 1;
          console.log(cart);
          if (cart != null && cart.length > 0) {
            localStorage.setItem("cartList", JSON.stringify(cart));
          }
          else {
            localStorage.removeItem("cartList");
          }
        }
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
        this.ngOnInit();
      }
    }
    else {
      this.toast.errorToastr("At Least " + minimumQuantity + " product added into cart.");
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
    }
    this.userService.changeCartValue(0);
  }
  MoveProductIntoCart(encryptedProductDetailsId, ProductDetailsId) {
    this.spinner.show();
    if (localStorage.getItem("currentidentity")) {
      this.myCartService.MovedToCart(encryptedProductDetailsId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.userService.changeCartValue(0);
            this.ngOnInit();
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
      if (localStorage.getItem("cartList")) {
        var cart = JSON.parse(localStorage.getItem("cartList"));
        var index = cart.findIndex((element) => element.ProductDetailsId === ProductDetailsId && element.IsSavedForLater == true);
        cart[index].IsSavedForLater = false;
        if (cart != null && cart.length > 0) {
          localStorage.setItem("cartList", JSON.stringify(cart));
        }
        else {
          localStorage.removeItem("cartList");
        }
      }
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
      this.ngOnInit();
    }
  }
  MoveProductIntoSavedLater(encryptedProductDetailsId, ProductDetailsId) {
    this.spinner.show();
    if (localStorage.getItem("currentidentity")) {
      this.myCartService.MovedToSavedLater(encryptedProductDetailsId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.userService.changeCartValue(0);
            this.ngOnInit();
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
      if (localStorage.getItem("cartList")) {
        var cart = JSON.parse(localStorage.getItem("cartList"));
        var index = cart.findIndex((element) => element.ProductDetailsId === ProductDetailsId && element.IsSavedForLater == false);
        cart[index].IsSavedForLater = true;
        if (cart != null && cart.length > 0) {
          localStorage.setItem("cartList", JSON.stringify(cart));
        }
        else {
          localStorage.removeItem("cartList");
        }
      }
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
      this.ngOnInit();
    }
  }
}
