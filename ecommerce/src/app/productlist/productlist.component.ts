import { Component, OnInit, ViewChild } from '@angular/core';
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

  categoryName: string;
  subCategoryName: string;
  encryptedCategoryId: string;
  encryptedSubCategoryId: string;
  encryptedBrandId: string;
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
  startRecord: number;
  endRecord: number;

  private sortValue: "default";
  queryString: string;

  isB2B = false;
  isBulkOrder = false;
  isPriceVisible = true;
  isColorListVisible=0;
  isVariantListVisible=0;
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
    private pagerService: PagerService) {
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
    this.findProductBySubCategoryId(this.category_Id, this.subCategory_Id, this.brand_Id);
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
    if (start <= 0)
      this.startRecord = 1;
    else
      this.startRecord = start + 1;
    if (end >= this.array.length)
      this.endRecord = this.array.length;
    else
      this.endRecord = end;
    const part = this.array.slice(start, end);
    this.dataSource = part;
    this.change_Sorting(this.sortValue);
    window.scroll(0, 0);

  }
  onPriceChange(event: any) {

    this.filterProductsByPrice(event.value);

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
          this.productList = result.Data;

          this.filterMainCategory = this.filterProductCategoryList[0]["CategoryName"];
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
          console.log(result.Data);
          this.categoryName = result.Data.CategoryName;
          this.subCategoryName = result.Data.SubCategoryName;
          this.encryptedCategoryId = result.Data.EncryptedCategoryId;
          this.encryptedSubCategoryId = result.Data.EncryptedSubCategoryId;
          this.encryptedBrandId = result.Data.EncryptedBrandId;
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
  getColorList(): any {
    if (this.filterAttributes.filter((x) => x.FilterType == 3).length > 0) {
      this.filterAttributes.filter((x) => x.FilterType == 3).forEach(element => {
        if (this.filterProductColorList.filter((x) => x.ColorId === element.AttributeId).length > 0) {
          this.filterProductColorList.filter((x) => x.ColorId === element.AttributeId)[0]['IsChecked'] = true;
        }
        else {
          this.filterProductColorList.filter((x) => x.ColorId === element.AttributeId)[0]['IsChecked'] = false;
        }
      });

    }

    return this.filterProductColorList;
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

  getAttributeFilterProductList(id: number, isChecked: boolean, attributeName: string): void {
    if (isChecked == true) {
      this.filterAttributes.push(new FilterAttributeItems(id, attributeName, 2));
    }
    else {
      this.removeAttributeFromFilterList(id, 2);
      this.removeFilter(id, 2);
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
  getVariantFilterProductList(id: number, isChecked: boolean, variantName: string): void {
    if (isChecked == true) {
      this.filterAttributes.push(new FilterAttributeItems(id, variantName, 1));
    }
    else {

      this.removeAttributeFromFilterList(id, 1);
      this.removeFilter(id, 1);
    }
    this.filterProducts();
  }
  getProductPriceChange(price: number): void {
    this.filterProducts();
  }
  getColorFilterProductList(id: number, isChecked: boolean, color: string): void {
    if (isChecked == true) {
      this.filterAttributes.push(new FilterAttributeItems(id, color, 3));
    }
    else {
      this.removeAttributeFromFilterList(id, 3);
      this.removeFilter(id, 3);
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
  filterProducts() {
    this.spinner.show();
    this.productService.getProductByFilter(this.category_Id, this.subCategory_Id, this.brand_Id, this.filterAttributes).subscribe(
      result => {
        if (result.IsSuccess) {
          this.dataSource = new MatTableDataSource<Element>(result.Data);
          this.dataSource.paginator = this.paginator;
          this.array = result.Data;
          this.totalSize = this.array.length;
          this.iterator();
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
  filterProductsByPrice(price: number) {
    this.spinner.show();
    this.productService.getProductByPriceFilter(this.category_Id, this.subCategory_Id, this.brand_Id, this.filterAttributes, price).subscribe(
      result => {
        if (result.IsSuccess) {
          this.dataSource = new MatTableDataSource<Element>(result.Data);
          this.dataSource.paginator = this.paginator;
          this.array = result.Data;
          this.totalSize = this.array.length;
          this.iterator();
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
  ShowColorList(isShowMore: number) {
    
    this.isColorListVisible=isShowMore;
    //this.getColorList();
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
