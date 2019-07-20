import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Globals } from './../_services/globalvariables';
import { OrderService } from './../_services/orderService';

import { DomSanitizer } from '@angular/platform-browser';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['../orders/orders.component.scss', './orderdetails.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  orderNumber: string;
  orderData: any;
  isPriceVisible = true;
  isB2B = false;
  isBulkOrder = false;
  fileUrl;
  constructor(private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private router: Router,
    private route: ActivatedRoute,
    private global: Globals,
    private toast: ToastrManager
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

        this.orderNumber = params.order_id;
      });
    //this.orderNumber = this.route.snapshot.paramMap.get('id');
    this.getOrderDetails(this.orderNumber);
    this.isPriceVisible = this.global.isPriceVisible;
    this.isB2B = this.global.isB2B;
    this.isBulkOrder = this.global.isBulkOrder;
    //this.GenarateReportPDF();
  }
  getOrderDetails(orderNumber: string) {
    this.spinner.show();
    this.orderService.getOrderDetails(orderNumber).subscribe(
      result => {
        if (result.IsSuccess === true) {
          this.orderData = result.Data;
          console.log(result.Data);
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
  GenarateReportPDF(orderId) {
    this.spinner.show();
    this.orderService.downloadPdf(orderId).subscribe(
      result => {
        if (result.IsSuccess === true) {
          this.toast.successToastr("Please check you mail. Invoice sent successfully.");
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        }
        else {
          this.toast.successToastr(result.Message);
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
