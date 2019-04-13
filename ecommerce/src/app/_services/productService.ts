import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';

@Injectable()
export class ProductService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {
    }

    getProductByCategoryList(categoryId, subCategoryId, brandId) {
        var body = {
            CategoryId: categoryId,
            SubCategoryId: subCategoryId,
            BrandId: brandId,
        }
        return this.http.post<any>(this.baseUrl + `Product/ProductListByFilters`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductByFilter(categoryId, subCategoryId, brandId, filterAttributes) {
        var body = {
            CategoryId: categoryId,
            SubCategoryId: subCategoryId,
            BrandId: brandId,
            filterAttribute: filterAttributes,
        }

        return this.http.post<any>(this.baseUrl + `Product/ProductListByFilters`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductBySubCategoryList(id) {
        var params = new HttpParams();
        params.append('Id', id);
        return this.http.get<any>(this.baseUrl + `Product/ProductListBySubCategoryId`)
            .pipe(map(result => {
                return result;
            }));
    }
    getCategoryList() {
        return this.http.get<any>(this.baseUrl + `Product/GetCategoryList`)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductFilterCategoryList(id) {
        return this.http.get<any>(this.baseUrl + `Product/GetFilterCategoryList` + id)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductFilterAttributeGroupList(id) {
        return this.http.get<any>(this.baseUrl + `Product/GetFilterAttributeGroupList` + id)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductFilterVariantGroupList(id) {
        return this.http.get<any>(this.baseUrl + `Product/GetFilterVariantGroupList` + id)
            .pipe(map(result => {
                return result;
            }));
    }
    getCategoryAttributeVariantList(id) {
        return this.http.get<any>(this.baseUrl + `Product/GetCategory_AttributeGroup_VariantGroupList` + id)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductColorList() {
        return this.http.get<any>(this.baseUrl + `Product/GetFilterColorList`)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductFilterAttributeValueList() {
        return this.http.get<any>(this.baseUrl + `Product/GetFilterAttributeValueList`)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductFilterVariantValueList() {
        return this.http.get<any>(this.baseUrl + `Product/GetFilterVariantValueList`)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductSearchDataWithFilter(searchData,filterAttributes) {
        var body = {
            searchData: searchData,
            filterAttribute: filterAttributes,
        }
        return this.http.post<any>(this.baseUrl + `Product/GetProductSearchData`,body)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductSearchDataWithoutFilter(searchData) {
        var body = {
            searchData: searchData
        }
        return this.http.post<any>(this.baseUrl + `Product/GetProductSearchData`,body)
            .pipe(map(result => {
                return result;
            }));
    }


}