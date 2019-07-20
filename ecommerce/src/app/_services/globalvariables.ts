import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable()
export class Globals {
  isPriceVisible: true;
  isB2B:false;
  isBulkOrder:false;
  list:any;
  constructor( private spinner:NgxSpinnerService) {
      this.setGlobalVariables();
    }
    setGlobalVariables()
    {
      
      this.spinner.show();
           this.list=JSON.parse(localStorage.getItem('homedetails'));
           if(this.list!=null && this.list.CommonSettingDetails!=null)
           {
            this.isPriceVisible=this.list.CommonSettingDetails.IsPriceVisible;
            this.isB2B=this.list.CommonSettingDetails.IsB2B;
            this.isBulkOrder=this.list.CommonSettingDetails.IsBulkOrder;
           }
           else
           {
             this.isPriceVisible=true;
             this.isB2B=false;
             this.isBulkOrder=false;
           }
           setTimeout(() => {
            this.spinner.hide();
          }, 1000)
           
    }
}