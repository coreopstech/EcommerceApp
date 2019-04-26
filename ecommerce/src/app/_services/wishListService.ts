import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';


var token='';
if(localStorage.getItem("currentidentity")!=null)
{
    token=JSON.parse(localStorage.getItem("currentidentity")).token;
}
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    })
};

@Injectable()
export class WishListService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {
    }

    getWishList() {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        return this.http.get<any>(this.baseUrl + `WishList/GetProductWishtList/` + userEncryptedId)
            .pipe(map(result => {
                return result;
            }));

    }
    saveProductIntoWishList(encryptedProductDetailsId,encryptedProductId)
    {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var body={
            encryptedProductDetailsId:encryptedProductDetailsId,
            encryptedProductId:encryptedProductId,
            userEncryptedId:userEncryptedId
        }
        return this.http.post<any>(this.baseUrl + `WishList/SaveProductIntoWishList`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    removeProductIntoWishList(encryptedProductDetailsId,encryptedProductId)
    {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var body={
            encryptedProductDetailsId:encryptedProductDetailsId,
            encryptedProductId:encryptedProductId,
            userEncryptedId:userEncryptedId
        }
        return this.http.post<any>(this.baseUrl + `WishList/RemoveProductIntoWishList`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    removeProductIntoWishListWithId(encryptedId)
    {
        return this.http.get<any>(this.baseUrl + `WishList/RemoveProductIntoWishList/`+encryptedId)
            .pipe(map(result => {
                return result;
            }));
    }
    moveProductIntoCart(encryptedId)
    {
        return this.http.get<any>(this.baseUrl + `WishList/MoveProductIntoWishListToCart/`+encryptedId)
            .pipe(map(result => {
                return result;
            }));
    }
    
    
}