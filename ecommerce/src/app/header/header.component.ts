
import { Component, OnInit, Renderer2 } from '@angular/core';
import { HeaderMenuService } from './../_services/headerMenuService';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  headerMenuList: any;
  parentMenuList: any;
  level1MenuList: any;
  list:any;
  constructor(private spinner:NgxSpinnerService) {
  }

  ngOnInit() {
    this.GetParentMenusList();
  }
  GetParentMenusList(): void {
    this.spinner.show();

    this.list=JSON.parse(localStorage.getItem('homedetails'));
     this.headerMenuList=this.list.HomeHeaderList;
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
      return this.parentMenuList = this.headerMenuList.filter((x) => x.ParentId === 0);
  }
  GetLevel1sList(id: any) {
    return this.headerMenuList.filter((x) => x.ParentId === id);
  }
}

