import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/userService';
import { OrderService } from '../_services/orderService';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment-options',
  templateUrl: './payment-options.component.html',
  styleUrls: ['./payment-options.component.scss']
})
export class PaymentOptionsComponent implements OnInit {

  encryptedAddressId = "";
  paymentType: number;
  isCOD = false;
  otraker: string;
  constructor(private userService: UserService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private toast: ToastrManager, private spinner: NgxSpinnerService, private router: Router) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.otraker = params.otracker;
      });
    this.userService.orderchange.subscribe(encryptedAddressId => {
      if (encryptedAddressId != '') {
        this.encryptedAddressId = encryptedAddressId;
      }
      else {
        this.encryptedAddressId = '';
      }
    });
  }
  SaveOrderDetails() {
    this.spinner.show();
    if (this.otraker.toLowerCase() == 'buynow_click') {
      this.orderService.savebuynoworder(this.paymentType, this.encryptedAddressId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            this.toast.successToastr(result.Message);
            localStorage.removeItem("buynow");
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.router.navigate(["/account/orders"]);
          }
          else {
            this.toast.errorToastr(result.Message);
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }
        }, 
        (err) => {
          this.toast.errorToastr(err);
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        }); 
    }
    else {
      this.orderService.saveOrderDetails(this.paymentType, this.encryptedAddressId).subscribe(
        result => {
          if (result.IsSuccess === true) {
            this.toast.successToastr(result.Message);
            this.userService.changeCartValue(0);
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.router.navigate(["/account/orders"]);
          }
          else {
            this.toast.errorToastr(result.Message);
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }
        },
        (err) => {
          this.toast.errorToastr(err);
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
    }
  }
  OpenCashOnDelivery(paymentType) {
    this.isCOD = true;
    this.paymentType = 1; ////for COD 
  }

  DoPayment() {
    this.userService.setAddressId_Order(this.encryptedAddressId);
    this.router.navigate(["/payment"]);
  }



}
