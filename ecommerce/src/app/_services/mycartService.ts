import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './../_models/user';
import { Cart } from './../_models/cart';
import { environment } from './../../environments/environment.prod';

<<<<<<< HEAD
// const httpOptions = {
//     headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("currentidentity")).token
//     })
// };
=======
var token = '';
if (localStorage.getItem("currentidentity") != null) {
    token = JSON.parse(localStorage.getItem("currentidentity")).token;
}
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    })
};
>>>>>>> e453c59f4d3453565341ed4e15f20ea5ddd1186d
@Injectable()
export class MyCartService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {
    }
    getCartList() {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var cartData = localStorage.getItem("cartList");
        var body = {
            UserEncryptedId: userEncryptedId,
            cartDetails: JSON.parse(cartData)
        }
        return this.http.post<any>(this.baseUrl + `Product/GetCartList`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    getSavedForLaterList() {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var cartData = localStorage.getItem("cartList");
        var body = {
            UserEncryptedId: userEncryptedId,
            cartDetails: JSON.parse(cartData)
        }
        
        return this.http.post<any>(this.baseUrl + `Product/GetSaveForLaterList`, body)
            .pipe(map(result => {
                return result;
            }));
    }

    UpdateProductQuantity(encryptedProductDetailId, encryptedProductId, productQuantity) {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var body = {
            UserEncryptedId: userEncryptedId,
            EncryptedProductDetailsId: encryptedProductDetailId,
            EncryptedProductId: encryptedProductId,
            ProductQuantity: productQuantity
        }
        return this.http.post<any>(this.baseUrl + `Product/UpdateProductQuantity/`, body)
            .pipe(map(result => {
                return result;
            }));
    }

    RemoveProductIntoCart(encryptedProductDetailId, ) {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var body = {
            UserEncryptedId: userEncryptedId,
            EncryptedProductDetailsId: encryptedProductDetailId,
        }
        return this.http.post<any>(this.baseUrl + `Product/RemoveProductIntoCart/`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    RemoveProductIntoSavedLater(encryptedProductDetailId, ) {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var body = {
            UserEncryptedId: userEncryptedId,
            EncryptedProductDetailsId: encryptedProductDetailId,
        }
        return this.http.post<any>(this.baseUrl + `Product/RemoveProductIntoSavedLater/`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    MovedToCart(encryptedProductDetailId) {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var body = {
            UserEncryptedId: userEncryptedId,
            EncryptedProductDetailsId: encryptedProductDetailId,
        }
        return this.http.post<any>(this.baseUrl + `Product/MoveProductIntoCart/`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    MovedToSavedLater(encryptedProductDetailId) {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var body = {
            UserEncryptedId: userEncryptedId,
            EncryptedProductDetailsId: encryptedProductDetailId,
        }
        return this.http.post<any>(this.baseUrl + `Product/MovedProductToSavedLater/`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    getSavedCartList() {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var body = {
            UserEncryptedId: userEncryptedId,
        }
        return this.http.post<any>(this.baseUrl + `Product/GetSavedCartList`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    getBuyNowCartList() {
        var buyNowCart = JSON.parse(localStorage.getItem("buynow"));
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        if (user != null && user.id != null && user.id != '') {
            userEncryptedId = user.id;
        }
        //var userEncryptedId=user.id;
        var cart = new Cart(0, buyNowCart.itemId, buyNowCart.quantity, true);
        var body = {
            UserEncryptedId: userEncryptedId,
            cartModel: cart
        }
        return this.http.post<any>(this.baseUrl + `Product/GetBuyNowCartList`, body)
            .pipe(map(result => {
                return result;
            }));
    }
}