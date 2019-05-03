import { Component, OnInit } from '@angular/core';
import { OrderService } from '../_services/orderService';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orderList: any;
  orderDetailsList: any;
  constructor(private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.getOrderList();
    this.getOrderDetailsList();
  }
  getOrderList() {
    this.spinner.show();
    this.orderService.getOrderList().subscribe(
      result => {
        if (result.IsSuccess === true) {
          this.orderList = result.Data;
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
        this.snackBar.open(err, '');
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)

      });
  }
  getOrderDetailsList() {
    this.spinner.show();
    this.orderService.getOrderDetailsList().subscribe(
      result => {
        if (result.IsSuccess === true) {
          this.orderDetailsList = result.Data;
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
        this.snackBar.open(err, '');
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)

      });
  }
  getOrderDetails(encryptedOrderId) {
    if (this.orderDetailsList != null && this.orderDetailsList.length > 0)
      return this.orderDetailsList.filter((x) => x.EncryptedOrderId == encryptedOrderId);
    else
      return this.orderDetailsList;
  }

}
