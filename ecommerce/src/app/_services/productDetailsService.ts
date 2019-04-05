import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';
import { BulkOrder } from './../_models/bulkOrder';



@Injectable()
export class ProductDetailService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {
    }

    getProductDetails(productId, productDetailId) {
        var currentUserId = localStorage.getItem("currentUserId");
        if (localStorage.getItem("currentUserId")) {
            currentUserId = currentUserId.replace('"', '');
            currentUserId = currentUserId.replace('"', '');
        }
        var cartData = localStorage.getItem("cartList");
        var body = {
            EncryptedProductId: productId,
            EncryptedProductDetailsId: productDetailId,
            UserEncryptedId: currentUserId,
            cartDetails: JSON.parse(cartData)
        }
        return this.http.post<any>(this.baseUrl + 'Product/GetProductDetail/', body)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductColorList(productId, productDetailId) {
        return this.http.get<any>(this.baseUrl + 'Product/GetProductColorList/' + productId + '/' + productDetailId)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductVariantList(productId, productDetailId) {
        return this.http.get<any>(this.baseUrl + `Product/GetProductVariantList/` + productId + '/' + productDetailId)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductVariantGroupList(productId, productDetailId) {
        return this.http.get<any>(this.baseUrl + `Product/GetProductVariantGroupList/` + productId + '/' + productDetailId)
            .pipe(map(result => {
                return result;
            }));
    }
    saveProductIntoCart(encryptedProductDetailId, encryptedProductId) {
        var currentUserId = localStorage.getItem("currentUserId");
        if (localStorage.getItem("currentUserId")) {
            currentUserId = currentUserId.replace('"', '');
            currentUserId = currentUserId.replace('"', '');
        }
        var body = {
            UserEncryptedId: currentUserId,
            EncryptedProductDetailsId: encryptedProductDetailId,
            EncryptedProductId: encryptedProductId
        }
        return this.http.post<any>(this.baseUrl + `Product/SaveProductIntoCart/`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    saveBulkOrder(bulkOrder:BulkOrder)
    {
        var currentUserId = localStorage.getItem("currentUserId");
        if (localStorage.getItem("currentUserId")) {
            currentUserId = currentUserId.replace('"', '');
            currentUserId = currentUserId.replace('"', '');
        }
        bulkOrder.UserEncryptedId=currentUserId;
        return this.http.post<any>(this.baseUrl + `Product/SaveBulkOrder/`, bulkOrder)
            .pipe(map(result => {
                return result;
            }));
    }
   
}