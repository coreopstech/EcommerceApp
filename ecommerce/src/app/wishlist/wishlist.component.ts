import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { WishListService } from '../_services/wishListService';
import { UserService } from '../_services/userService';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishListComponent implements OnInit {
  wishList: any;
  totalWishCount: 0;
  isRemoveModelVisible=false;
  constructor(private toastr: ToastrManager,
    private spinner: NgxSpinnerService,
    private userService:UserService,
    private route: ActivatedRoute, private router: Router, private wishlistService: WishListService) {

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

    this.getProductWishList();
  }
  getProductWishList() {
    this.wishlistService.getWishList()
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.wishList = result.Data;
            this.totalWishCount = result.Data.length;
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
  RemoveToWishList(encryptedId) {
    this.spinner.show();
    if (localStorage.getItem("currentidentity")) {
      this.wishlistService.removeProductIntoWishListWithId(encryptedId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            this.toastr.successToastr("Removed from your Wishlist");
            
            this.ngOnInit();
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }
          else {
            this.toastr.errorToastr(result.Message);
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
  MoveToCart(encryptedId)
  {
    
    this.spinner.show();
    if (localStorage.getItem("currentidentity")) {
      this.wishlistService.moveProductIntoCart(encryptedId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            this.toastr.successToastr("Product moved to your cart");
            this.userService.changeCartValue(0);
            this.ngOnInit();
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

  // ShowRemoveModel(divId)
  // {
  //   alert("open");
  //   $(function () {
      
  //     $("#"+divId).show();
  //   });
  // }
  // HideRemoveModel(divId)
  // {
  //   $(function () {
      
  //     $("#"+divId).hide();
  //   });
  // }

}
