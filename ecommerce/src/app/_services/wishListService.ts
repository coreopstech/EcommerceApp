import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("currentuser")
    })
};
@Injectable()
export class WishListService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {
    }

    getWishList() {
        var currentUserId = localStorage.getItem("currentUserId");
        if (localStorage.getItem("currentUserId")) {
            currentUserId = currentUserId.replace('"', '');
            currentUserId = currentUserId.replace('"', '');
        }
        return this.http.get<any>(this.baseUrl + `WishList/GetProductWishtList/` + currentUserId)
            .pipe(map(result => {
                return result;
            }));

    }
    saveProductIntoWishList(encryptedProductDetailsId,encryptedProductId)
    {
        var currentUserId = localStorage.getItem("currentUserId");
        if (localStorage.getItem("currentUserId")) {
            currentUserId = currentUserId.replace('"', '');
            currentUserId = currentUserId.replace('"', '');
        }
        var body={
            encryptedProductDetailsId:encryptedProductDetailsId,
            encryptedProductId:encryptedProductId,
            userEncryptedId:currentUserId
        }
        return this.http.post<any>(this.baseUrl + `WishList/SaveProductIntoWishList`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    removeProductIntoWishList(encryptedProductDetailsId,encryptedProductId)
    {
        var currentUserId = localStorage.getItem("currentUserId");
        if (localStorage.getItem("currentUserId")) {
            currentUserId = currentUserId.replace('"', '');
            currentUserId = currentUserId.replace('"', '');
        }
        var body={
            encryptedProductDetailsId:encryptedProductDetailsId,
            encryptedProductId:encryptedProductId,
            userEncryptedId:currentUserId
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