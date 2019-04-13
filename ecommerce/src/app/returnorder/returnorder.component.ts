import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { OrderService } from '../_services/orderService';
import { ToastrManager } from 'ng6-toastr-notifications';


@Component({
  selector: 'app-returnorder',
  templateUrl: './returnorder.component.html',
  styleUrls: ['./returnorder.component.scss']
})
export class ReturnOrderComponent implements OnInit {
  itemId: string;
  orderId: string;
  productOrderDetails: any;
  isOrderReasonSelected=false;
  reasonId=0;
  reasonText="";
  remarkText="";
  constructor(private route: ActivatedRoute, private router: Router,
    private spinner: NgxSpinnerService, private toast: ToastrManager,
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
    this.orderService.getItemsOrderDetails(itemId,'2').subscribe(
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
        this.toast.errorToastr(err,);
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
      });
  }
  openReturnStatus(reasonList,remark)
  {
    this.spinner.show()
    if(parseInt(reasonList.value)<=0)
    {
      this.toast.errorToastr("Please Select Reason for Return!");
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
      return;
    }
    if(remark.value==null)
    {
      this.toast.errorToastr("Please Enter Return Remark!");
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
      return;
    }
    if(remark.value=="")
    {
      this.toast.errorToastr("Please Enter Return Remark!");
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
  saveOrderReturn(encryptedOrderDetailsId:string,encryptedOrderId:string)
  {
    this.spinner.show();
    this.orderService.saveOrderReturnDetails(encryptedOrderDetailsId,encryptedOrderId,this.reasonId,this.remarkText).subscribe(
      result => {
        if (result.IsSuccess === true) {
          this.router.navigate(['order_details'],{ queryParams: { order_Id:this.productOrderDetails.OrderNumber } });
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
        this.toast.errorToastr(err);
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
      });
  }
  OpenReturn()
  {
    this.isOrderReasonSelected=false;
  }


}
