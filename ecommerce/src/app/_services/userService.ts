import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from './../_models/user';
import { environment } from './../../environments/environment.prod';
import { UserAddress } from '../_models/userAddress';




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

@Injectable()
export class UserService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {
    }
    addressId = "";

    @Output() change: EventEmitter<string> = new EventEmitter();
    @Output() orderchange: EventEmitter<string> = new EventEmitter();
    @Output() pricechange: EventEmitter<boolean> = new EventEmitter();
    @Output() cartValueChange: EventEmitter<number> = new EventEmitter();
    @Output() wishListValueChange: EventEmitter<number> = new EventEmitter();
    setAddressId(encryptedAddressId) {
        this.addressId = encryptedAddressId;
        this.change.emit(this.addressId);
    }
    setAddressId_Order(encryptedAddressId) {
        this.addressId = encryptedAddressId;
        this.orderchange.emit(this.addressId);
    }
    changePriceCalculation(status) {
        this.pricechange.emit(status);
    }
    changeWishListValue(cartValue) {
        this.wishListValueChange.emit(cartValue);
    }
    changeCartValue(cartValue) {
        this.cartValueChange.emit(cartValue);
    }

    register(user: User) {
        return this.http.post<any>(this.baseUrl + `Product/SignUp`, user)
            .pipe(map(result => {
                if (result.IsSuccess) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentidentity', JSON.stringify({ token: result.Data.TokenNo, name: result.Data.FullName, id: result.Data.EncrytedId }));
                }
                return result;
            }));
    }
    getUserDetails(userEncryptedId: string) {
        return this.http.get<any>(this.baseUrl + `Product/GetUserDetails/` + userEncryptedId)
            .pipe(map(result => {

                return result;
            }));
    }
    updateUserDetails(user: User) {
        return this.http.post<any>(this.baseUrl + `Product/UpdateUserDetails`, user)
            .pipe(map(result => {
                return result;
            }));
    }
    getUserAddressDetails(userEncryptedId: string) {
        return this.http.get<any>(this.baseUrl + `Product/GetUserAddressDetails/` + userEncryptedId)
            .pipe(map(result => {

                return result;
            }));
    }
    getAddressDetails(EncryptedAddressId: string) {
        return this.http.get<any>(this.baseUrl + `Product/GetAddressDetails/` + EncryptedAddressId)
            .pipe(map(result => {

                return result;
            }));
    }
    getCityList(stateId: string) {
        return this.http.get<any>(this.baseUrl + `Product/GetCityList/` + stateId)
            .pipe(map(result => {

                return result;
            }));
    }
    saveUserAddressDetails(userAddress: UserAddress) {
        var user = JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId = user.id;
        userAddress.EncryptedUserId = userEncryptedId;
        return this.http.post<any>(this.baseUrl + `Product/SaveUserAddressDetails`, userAddress)
            .pipe(map(result => {
                return result;
            }));
    }
    getTotalCartItems() {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        return this.http.get<any>(this.baseUrl + `Product/GetTotalCartItmes/` + userEncryptedId)
            .pipe(map(result => {
                return result;
            }));
    }



    //
    getUserAddressDetailsList(userEncryptedId: string) {
        return this.http.get<any>(this.baseUrl + `User/GetUserAddressDetails/` + userEncryptedId)
            .pipe(map(result => {
                return result;
            }));
    }
}