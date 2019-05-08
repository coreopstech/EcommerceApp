import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { OrderService } from '../_services/orderService';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-cancelorder',
  templateUrl: './cancelorder.component.html',
  styleUrls: ['./cancelorder.component.scss']
})
export class CancelOrderComponent implements OnInit {

  itemId: string;
  orderId: string;
  productOrderDetails: any;
  isOrderReasonSelected=false;
  reasonId=0;
  reasonText="";
  remarkText="";
  constructor(private route: ActivatedRoute, private router: Router,
    private spinner: NgxSpinnerService, public toastr: ToastrManager,
    private orderService: OrderService) {

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
        this.itemId = params.itemId;
        this.orderId = params.orderId;
      });
    this.getOrderDetails(this.itemId);
  }
  getOrderDetails(itemId: string) {
    this.spinner.show();
    this.orderService.getItemsOrderDetails(itemId,'1').subscribe(
      result => {
        if (result.IsSuccess === true) {
          this.productOrderDetails = result.Data;
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
        this.toastr.errorToastr(err,'Oops!');
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
      });
  }
  openRefundStatus(reasonList,remark)
  {
    this.spinner.show()
    if(parseInt(reasonList.value)<=0)
    {
      this.toastr.errorToastr("Please Select Reason for Cancellation!",'Oops!');
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
      return;
    }
    if(remark.value==null)
    {
      this.toastr.errorToastr("Please Enter Cancellation Remark!",'Oops!');
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
      return;
    }
    if(remark.value=="")
    {
      this.toastr.errorToastr("Please Enter Cancellation Remark!",'Oops!');
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
      return;
    }
    this.reasonId=parseInt(reasonList.value);
    this.remarkText=remark.value;
    this.reasonText=this.productOrderDetails.ReasonList.filter((x)=>x.Value==this.reasonId)[0]["Text"];
    this.isOrderReasonSelected=true;
    setTimeout(() => {
      this.spinner.hide();
    }, 1000)
    return;
  }
  SaveOrderCancelRequest(reasonList,remark,encryptedOrderDetailsId:string,encryptedOrderId:string)
  {
    
    if(parseInt(reasonList.value)<=0)
    {
      this.toastr.errorToastr("Please Select Reason for Cancellation!",'Oops!');
      return;
    }
    if(remark.value==null)
    {
      this.toastr.errorToastr("Please Enter Cancellation Remark!",'Oops!');
      return; 
    }
    if(remark.value=="")
    {
      this.toastr.errorToastr("Please Enter Cancellation Remark!",'Oops!');
     return;
    }
    this.spinner.show()
    this.reasonId=parseInt(reasonList.value);
    this.remarkText=remark.value;
    this.reasonText=this.productOrderDetails.ReasonList.filter((x)=>x.Value==this.reasonId)[0]["Text"];

    this.orderService.saveOrderCancelDetails(encryptedOrderDetailsId,encryptedOrderId,this.reasonId,this.remarkText).subscribe(
      result => {
        if (result.IsSuccess === true) {
          this.router.navigate(['order_details'],{ queryParams: { order_id:this.productOrderDetails.OrderNumber } });
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
        this.toastr.errorToastr(err);
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
      });
  }
  saveOrderCancel(encryptedOrderDetailsId:string,encryptedOrderId:string)
  {
    this.spinner.show();
    this.orderService.saveOrderCancelDetails(encryptedOrderDetailsId,encryptedOrderId,this.reasonId,this.remarkText).subscribe(
      result => {
        if (result.IsSuccess === true) {
          this.router.navigate(['order_details'],{ queryParams: { order_id:this.productOrderDetails.OrderNumber } });
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
        this.toastr.errorToastr(err);
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
      });
  }
  OpenCancellation()
  {
    this.isOrderReasonSelected=false;
  }

}
