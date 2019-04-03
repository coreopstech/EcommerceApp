import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProductService } from '../_services/productService';
import { PagerService } from '../_services/pager.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductListComponent implements OnInit {

//----Paging---
public array: any;
public displayedColumns = ['', '', '', '', ''];
public dataSource: any;    

public pageSize = 12;
public currentPage = 0;
public totalSize = 0;

@ViewChild(MatPaginator) paginator: MatPaginator;

  category_Id: number;
  subCategory_Id: number;
  brand_Id: number;
  productList: any;
  filterProductCategoryList: any;
  filterProductAttributeGroupList: any;
  filterProductAttributeValueList: any;
  filterProductVariantGroupList: any;
  filterProductVariantValueList: any;
  filterProductColorList: any;
  filterMainCategory: string;
  attributeId: number;
  attributeName: string;
  filterAttributes: FilterAttributeItems[] = new Array();
  
  // array of all items to be paged
  private allItems: any[];
  private sortValue: "default";
  // pager object
  pager: any = {};
  queryString: string;
  // paged items
  pagedItems: any[];
  totalRecords: number;
  minRecords: number;
  maxRecords: number;
  isB2B=false;
  isBulkOrder=false;
  isPriceVisible=true;
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }
  constructor(private route: ActivatedRoute,
    private router: Router,
    private spinner: NgxSpinnerService,
    private productService: ProductService,
    private pagerService:PagerService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        this.router.navigated = false;
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.queryString = "?CategoryId=" + params.categoryId + "&SubCategoryId=" + params.subcategoryId + "&BrandId=" + params.brandId;
        this.category_Id = params.categoryId;
        this.subCategory_Id = params.subcategoryId;
        this.brand_Id = params.brandId;
      });
      this.bindCategoryAttributeVariantList();
      this.findProductBySubCategoryId(this.category_Id,this.subCategory_Id,this.brand_Id);
  }
  //paging//
  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.iterator();
  }
  private iterator() {
    const end = (this.currentPage + 1) * this.pageSize;
    const start = this.currentPage * this.pageSize;
    const part = this.array.slice(start, end);
    this.dataSource = part;
    this.change_Sorting(this.sortValue);
    window.scroll(0,0);
    
  }
  findProductBySubCategoryId(categoryId: number, subcategoryId: number, brandId: number): any {
    this.spinner.show();
    this.productService.getProductByCategoryList(categoryId, subcategoryId, brandId).subscribe(
      result => {
        if (result.IsSuccess) {
          this.dataSource = new MatTableDataSource<Element>(result.Data);
          this.dataSource.paginator = this.paginator;
          this.array = result.Data;
          this.totalSize = this.array.length;
          this.iterator();

          this.allItems = result.Data;
          this.productList = result.Data;
          this.setPage(1);
          this.filterMainCategory = this.filterProductCategoryList[0]["CategoryName"];
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        }
        else {
          this.allItems = null;
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
  setPage(page: number) {

    //&& this.pager.totalPages>0 when issue comes of page is 1 but total pages is 0 than apply 
    if (page < 1 || (page > this.pager.totalPages && this.pager.totalPages > 0)) {
      return;
    }

    // get pager object from service

    this.pager = this.pagerService.getPager(this.allItems.length, page);
    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);

    if (this.pagedItems.length > 0) {
      this.minRecords = this.pager.startIndex + 1;
    }
    else {
      this.minRecords = this.pager.startIndex;
    }
    this.maxRecords = this.pager.endIndex + 1;
    this.totalRecords = this.allItems.length;
    this.change_Sorting(this.sortValue);
    window.scroll(0, 0);

  }
  change_Sorting(value) {
    this.sortValue = value;
    if (value === "pricehighlow") ////When Price Goes hight to low
      this.dataSource = this.dataSource.sort(function (a, b) {
        return b.ProductPrice - a.ProductPrice;

      });
    else if (value === "pricelowhigh") ////When Price Goes hight to low
      this.dataSource = this.dataSource.sort(function (a, b) {
        return a.ProductPrice - b.ProductPrice;
      });
    else if (value === "nameasc") ////When Price Goes hight to low
      this.dataSource = this.dataSource.sort(function (a, b) {
        var nameA = a.ProductName.toLowerCase(), nameB = b.ProductName.toLowerCase()
        if (nameA < nameB) //sort string ascending
          return -1;
        if (nameA > nameB)
          return 1;
        return 0;
      });
    else if (value === "namedesc") ////When Price Goes hight to low
      this.dataSource = this.dataSource.sort(function (a, b) {
        var nameA = a.ProductName.toLowerCase(), nameB = b.ProductName.toLowerCase()
        if (nameA > nameB) //sort string descending
          return -1;
        if (nameA < nameB)
          return 1;
        return 0;
      });
    else if (value === "default") ////When Price Goes hight to low
      this.dataSource = this.dataSource.sort(function (a, b) {
        dateA: Date; dateB: Date;
        this.dateA = new Date(a.CreatedDate), this.dateB = new Date(b.CreatedDate)
        return this.dateA - this.dateB //sort by date ascending
      });
  }
  bindCategoryAttributeVariantList(): any {
    this.spinner.show();
    this.productService.getCategoryAttributeVariantList(this.queryString).subscribe(
      result => {
        if (result.IsSuccess === true) {
          if (result.Data.categoryFilterList != null && result.Data.categoryFilterList.length > 0) {
            this.filterProductCategoryList = result.Data.categoryFilterList;
          }
          if (result.Data.attributeFilterList != null && result.Data.attributeFilterList.length > 0) {
            this.filterProductAttributeGroupList = result.Data.attributeFilterList;
          }
          if (result.Data.variantFilterList != null && result.Data.variantFilterList.length > 0) {
            this.filterProductVariantGroupList = result.Data.variantFilterList;
          }
          if (result.Data.variantValueFilterList != null && result.Data.variantValueFilterList.length > 0) {
            this.filterProductVariantValueList = result.Data.variantValueFilterList;
          }
          if (result.Data.attributValueFilterList != null && result.Data.attributValueFilterList.length > 0) {
            this.filterProductAttributeValueList = result.Data.attributValueFilterList;
          }
          if (result.Data.colorFilterList != null && result.Data.colorFilterList.length > 0) {
            this.filterProductColorList = result.Data.colorFilterList;
          }
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
  bindCategoryList(): any {
    this.productService.getProductFilterCategoryList(this.queryString).subscribe(
      result => {
        if (result.IsSuccess === true) {
          return this.filterProductCategoryList = result.Data;
        }
        else {

        }
      },
      (err) => {

      });
  }
  bindAttributeGroupList(): any {
    this.productService.getProductFilterAttributeGroupList(this.queryString).subscribe(
      result => {
        if (result.IsSuccess === true) {
          return this.filterProductAttributeGroupList = result.Data;
        }
        else {

        }
      },
      (err) => {

      });
  }
  bindColorList(): any {
    this.productService.getProductColorList().subscribe(
      result => {
        if (result.IsSuccess === true) {
          return this.filterProductColorList = result.Data;

        }
        else {

        }
      },
      (err) => {

      });
  }
  getColorList(): any {
    if (this.filterAttributes.filter((x) => x.FilterType == 3).length > 0) {
      this.filterAttributes.filter((x) => x.FilterType == 3).forEach(element => {
        if (this.filterProductColorList.filter((x) => x.ColorId === element.AttributeId).length > 0) {
          this.filterProductColorList.filter((x) => x.ColorId === element.AttributeId)[0]['IsChecked'] = true;
        }
        else{
          this.filterProductColorList.filter((x) => x.ColorId === element.AttributeId)[0]['IsChecked'] = false;
        }
      });
      
    }
    return this.filterProductColorList;
  }

  bindAttributeValueList(): any {
    this.productService.getProductFilterAttributeValueList().subscribe(
      result => {
        if (result.IsSuccess === true) {
          return this.filterProductAttributeValueList = result.Data;
        }
        else {

        }
      },
      (err) => {

      });
  }
  bindVariantGroupList(): any {
    this.productService.getProductFilterVariantGroupList(this.queryString).subscribe(
      result => {
        if (result.IsSuccess === true) {
          return this.filterProductVariantGroupList = result.Data;
        }
        else {

        }
      },
      (err) => {

      });
  }
  bindVariantValueList(): any {
    this.productService.getProductFilterVariantValueList().subscribe(
      result => {
        if (result.IsSuccess === true) {
          return this.filterProductVariantValueList = result.Data;
        }
        else {

        }
      },
      (err) => {

      });
  }
  getAtttributeValueListByGroup(id): any {
    //alert(this.filterAttributes.length);
    if (this.filterAttributes.filter((x) => x.FilterType == 2).length > 0) {
      this.filterAttributes.filter((x) => x.FilterType == 2).forEach(element => {
        //alert(this.filterProductAttributeValueList.filter((x) => x.AttributeGroupId === id && x.AttributeValueId===element.AttributeId)[0]['IsChecked']);
        if (this.filterProductAttributeValueList.filter((x) => x.AttributeGroupId === id && x.AttributeValueId === element.AttributeId).length > 0) {
          this.filterProductAttributeValueList.filter((x) => x.AttributeGroupId === id && x.AttributeValueId === element.AttributeId)[0]['IsChecked'] = true;
        }
        
      });

    }
    if (this.filterProductAttributeValueList != null && this.filterProductAttributeValueList.length > 0)
      return this.filterProductAttributeValueList.filter((x) => x.AttributeGroupId === id);
  }
  getVariantValueListByGroup(id): any {
    if (this.filterAttributes.filter((x) => x.FilterType == 1).length > 0) {
      this.filterAttributes.filter((x) => x.FilterType == 1).forEach(element => {
        if (this.filterProductVariantValueList.filter((x) => x.VariantGroupId === id && x.VariantValueId === element.AttributeId).length > 0) {
          this.filterProductVariantValueList.filter((x) => x.VariantGroupId === id && x.VariantValueId === element.AttributeId)[0]['IsChecked'] = true;
        }
      });
    }
    if (this.filterProductVariantValueList != null && this.filterProductVariantValueList.length > 0)
      return this.filterProductVariantValueList.filter((x) => x.VariantGroupId === id);
  }
  getAttributeName(id): string {
    return this.filterProductAttributeValueList.filter((x) => x.AttributeValueId === id)[0]['AttributeValue'];
  }
  getVariantName(id): string {
    
    return this.filterProductVariantValueList.filter((x) => x.VariantValueId === id)[0]['VariantValue'];
  }
  getColorName(id): string {
    return this.filterProductColorList.filter((x) => x.ColorId === id)[0]['ColorValue'];
  }
  getAttributeFilterProductList(id:number,isChecked:boolean,attributeName:string): void {
    if (isChecked == true) {
      this.filterAttributes.push(new FilterAttributeItems(id, attributeName, 2));
    }
    else {
      this.removeAttributeFromFilterList(id, 2);
      this.removeFilter(id,2);
    }
    this.filterProducts();
  }
  removeAttributeFromFilterList(id, filterType) {
    if (this.filterAttributes != null && this.filterAttributes.length > 0) {
      for (var i = 0; i <= this.filterAttributes.length - 1; i++) {
        if (this.filterAttributes[i].AttributeId === parseInt(id) && this.filterAttributes[i].FilterType === filterType) {
          this.filterAttributes.splice(i, 1);
        }
      }
    }
  }
  getVariantFilterProductList(id:number,isChecked:boolean,variantName:string): void {
    if (isChecked == true) {
      this.filterAttributes.push(new FilterAttributeItems(id, variantName, 1));
    }
    else {
      
      this.removeAttributeFromFilterList(id, 1);
      this.removeFilter(id,1);
    }
    this.filterProducts();
  }
  getColorFilterProductList(id:number,isChecked:boolean,color:string): void {
    if (isChecked == true) {
      this.filterAttributes.push(new FilterAttributeItems(id, color, 3));
    }
    else {
      this.removeAttributeFromFilterList(id, 3);
      this.removeFilter(id,3);
    }
    
    this.filterProducts();
  }

  removeFilter(id, filterType) {
    for (var i = 0; i <= this.filterAttributes.length - 1; i++) {
      if (this.filterAttributes[i].AttributeId === id && this.filterAttributes[i].FilterType === filterType) {
        this.filterAttributes.splice(i, 1);
      }
    }
    if (filterType == 1) {
      //this.rebindVariantProductlist();
      this.filterProductVariantValueList.filter((x) => x.VariantValueId === id)[0]['IsChecked'] = false;
    }
    else if (filterType == 2) {
      //this.rebindAttributeProductlist();
      this.filterProductAttributeValueList.filter((x) => x.AttributeValueId === id)[0]['IsChecked'] = false;
    }
    else if (filterType == 3) {
      //this.rebindColorProductlist();
      this.filterProductColorList.filter((x) => x.ColorId === id)[0]['IsChecked'] = false;
    }
    this.filterProducts();
  }
  SetFilterProducts(): any {
    this.productService.getProductByFilter(this.category_Id, this.subCategory_Id, this.brand_Id, this.filterAttributes).subscribe(
      result => {
        if (result.IsSuccess === true) {          
          return this.allItems = result.Data;

        }
        else {

        }
      },
      (err) => {

      });
  }
  filterProducts() {
    this.spinner.show();
    this.productService.getProductByFilter(this.category_Id, this.subCategory_Id, this.brand_Id, this.filterAttributes).subscribe(
      result => {
        if (result.IsSuccess) {
          this.allItems = result.Data;
          this.setPage(1);
          window.scroll(0, 0);
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        }
        else {

        }
      },
      (err) => {

      });
  }
  rebindAttributeProductlist() {
    if (this.filterAttributes.filter(x => x.FilterType == 2).length > 0) {
      this.allItems = this.allItems.filter((x) => x.AttributeList.find((y) => this.filterAttributes.filter((y) => y.FilterType == 2).find((z) => z.AttributeId === y.Id)));
    }
  }
  rebindColorProductlist() {
    if (this.filterAttributes.filter(x => x.FilterType == 3).length > 0) {
      this.allItems = this.allItems.filter((x) => this.filterAttributes.filter((y) => y.FilterType == 3).find((z) => z.AttributeId === x.ColorId));
    }
  }
  rebindVariantProductlist() {
    if (this.filterAttributes.filter(x => x.FilterType == 1).length > 0) {
      this.allItems = this.allItems.filter((x) => x.VariantList.find((y) => this.filterAttributes.filter((y) => y.FilterType == 1).find((z) => z.AttributeId === y.Id)));
    }
  }
}
export class FilterAttributeItems {
  AttributeId: number;
  AttributeName: string;
  FilterType: number;
  constructor(AttributeId: number, AttributeName: string, FilterType: number) {
    this.AttributeId = AttributeId;
    this.AttributeName = AttributeName;
    this.FilterType = FilterType;
  }
}
