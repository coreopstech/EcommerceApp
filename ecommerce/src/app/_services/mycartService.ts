import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './../_models/user';
import { Cart } from './../_models/cart';
import { environment } from './../../environments/environment.prod';

// const httpOptions = {
//     headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentidentity")).token
//     })
// };
@Injectable()
export class MyCartService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {
    }
    getCartList() {
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        var cartData = localStorage.getItem("cartList");
        var body = {
            UserEncryptedId: userEncryptedId,
            cartDetails:JSON.parse(cartData)
        }
        console.log(cartData);
        return this.http.post<any>(this.baseUrl + `Product/GetCartList`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    getSavedForLaterList() {
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        var cartData = localStorage.getItem("cartList");
        var body = {
            UserEncryptedId: userEncryptedId,
            cartDetails:JSON.parse(cartData)
        }
        console.log(cartData);
        return this.http.post<any>(this.baseUrl + `Product/GetSaveForLaterList`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    
    UpdateProductQuantity(encryptedProductDetailId,encryptedProductId,productQuantity) {
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        var body={
                UserEncryptedId:userEncryptedId,
                EncryptedProductDetailsId:encryptedProductDetailId,
                EncryptedProductId:encryptedProductId,
                ProductQuantity:productQuantity
        }
        return this.http.post<any>(this.baseUrl + `Product/UpdateProductQuantity/`,body)
            .pipe(map(result => {
                return result;
            }));
    }
   
    RemoveProductIntoCart(encryptedProductDetailId,) {
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        var body={
                UserEncryptedId:userEncryptedId,
                EncryptedProductDetailsId:encryptedProductDetailId,
        }
        return this.http.post<any>(this.baseUrl + `Product/RemoveProductIntoCart/`,body)
            .pipe(map(result => {
                return result;
            }));
    }
    RemoveProductIntoSavedLater(encryptedProductDetailId,) {
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        var body={
                UserEncryptedId:userEncryptedId,
                EncryptedProductDetailsId:encryptedProductDetailId,
        }
        return this.http.post<any>(this.baseUrl + `Product/RemoveProductIntoSavedLater/`,body)
            .pipe(map(result => {
                return result;
            }));
    }
    MovedToCart(encryptedProductDetailId)
    {
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        var body={
                UserEncryptedId:userEncryptedId,
                EncryptedProductDetailsId:encryptedProductDetailId,
        }
        return this.http.post<any>(this.baseUrl + `Product/MoveProductIntoCart/`,body)
            .pipe(map(result => {
                return result;
            }));
    }
    MovedToSavedLater(encryptedProductDetailId)
    {
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        var body={
                UserEncryptedId:userEncryptedId,
                EncryptedProductDetailsId:encryptedProductDetailId,
        }
        return this.http.post<any>(this.baseUrl + `Product/MovedProductToSavedLater/`,body)
            .pipe(map(result => {
                return result;
            }));
    }
    getSavedCartList() {
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        var body = {
            UserEncryptedId: userEncryptedId,
        }
        return this.http.post<any>(this.baseUrl + `Product/GetSavedCartList`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    getBuyNowCartList() {
        var buyNowCart=JSON.parse(localStorage.getItem("buynow"));
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        var cart=new Cart(0,buyNowCart.itemId,buyNowCart.quantity,true);
        var body = {
            UserEncryptedId: userEncryptedId,
            cartModel:cart
        }
        return this.http.post<any>(this.baseUrl + `Product/GetBuyNowCartList`, body)
            .pipe(map(result => {
                return result;
            }));
    }
}