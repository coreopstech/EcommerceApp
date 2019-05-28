import { Injectable } from '@angular/core';


@Injectable()
export class Globals {
  isPriceVisible: true;
  isB2B:false;
  isBulkOrder:false;
  list:any;
  constructor() {
      this.setGlobalVariables();
    }
    setGlobalVariables()
    {
           this.list=JSON.parse(localStorage.getItem('homedetails'));
           this.isPriceVisible=this.list.CommonSettingDetails.IsPriceVisible;
            this.isB2B=this.list.CommonSettingDetails.IsB2B;
            this.isBulkOrder=this.list.CommonSettingDetails.IsBulkOrder;
    }
}