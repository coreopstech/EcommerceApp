import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  footerMenuList: any;
  parentMenuList: any;
  level1MenuList: any;
  list:any;
  settingModel:any;
  constructor(private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.GetParentMenusList();
  }
  GetParentMenusList(): void {
    this.spinner.show();

    this.list=JSON.parse(localStorage.getItem('homedetails'));
     this.footerMenuList=this.list.HomeFooterList;
     this.settingModel=this.list.CommonSettingDetails;
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
      
      
      return this.parentMenuList = this.footerMenuList.filter((x) => x.ParentId === 0);
  }
  GetLevel1sList(id): any {
    return this.footerMenuList.filter((x) => x.ParentId === id);
  }

}
