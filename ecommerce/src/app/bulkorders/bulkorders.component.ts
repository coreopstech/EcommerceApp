import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { OrderService } from '../_services/orderService';
import { Globals } from './../_services/globalvariables';

@Component({
  selector: 'app-bulkorders',
  templateUrl: './bulkorders.component.html',
  styleUrls: ['./bulkorders.component.scss']
})
export class BulkordersComponent implements OnInit {

  orderList: any;
  orderDetailsList: any;
  isPriceVisible=true;
  isB2B=false;
  isBulkOrder=false;
  constructor(private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private global:Globals
  ) { }

  ngOnInit() {
    this.getBulkOrderList();
    this.getBulkOrderDetailsList();
    this.isPriceVisible=this.global.isPriceVisible;
    this.isB2B=this.global.isB2B;
    this.isBulkOrder=this.global.isBulkOrder;
  }
  getBulkOrderList() {
    this.spinner.show();
    this.orderService.getBulkOrderList().subscribe(
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
  getBulkOrderDetailsList() {
    this.spinner.show();
    this.orderService.getBulkOrderDetailsList().subscribe(
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
  getBulkOrderDetails(encryptedOrderId) {
    if (this.orderDetailsList != null && this.orderDetailsList.length > 0)
      return this.orderDetailsList.filter((x) => x.EncryptedOrderId == encryptedOrderId);
    else
      return this.orderDetailsList;
  }

}

