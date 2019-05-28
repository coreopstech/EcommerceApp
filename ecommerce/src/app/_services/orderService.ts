import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';
import { Cart } from '../_models/cart';


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
export class OrderService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {
    }
    saveOrderDetails(paymentType:number,encryptedAddressId:string) {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var body={
                paymentType:paymentType,
                encryptedAddressId:encryptedAddressId,
                userEncryptedId:userEncryptedId
        }
        return this.http.post<any>(this.baseUrl + `Order/SaveOrderDetails`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    getOrderList()
    {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        return this.http.get<any>(this.baseUrl + `Order/GetOrderList/`+userEncryptedId)
            .pipe(map(result => {
                return result;
            }));
    }
    getOrderDetailsList()
    {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        return this.http.get<any>(this.baseUrl + `Order/GetOrderDetailsList/`+ userEncryptedId)
            .pipe(map(result => {
                return result;
            }));
    }
    getBulkOrderList()
    {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        return this.http.get<any>(this.baseUrl + `Order/GetBulkOrderList/`+userEncryptedId)
            .pipe(map(result => {
                return result;
            }));
    }
    getBulkOrderDetailsList()
    {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        return this.http.get<any>(this.baseUrl + `Order/GetBulkOrderDetailsList/`+ userEncryptedId)
            .pipe(map(result => {
                return result;
            }));
    }
    getOrderDetails(orderNumber:string)
    {
        return this.http.get<any>(this.baseUrl + `Order/GetOrderDetails/`+ orderNumber)
            .pipe(map(result => {
                return result;
            }));
    }
    getBulkOrderDetails(orderNumber:string)
    {
        return this.http.get<any>(this.baseUrl + `Order/GetBulkOrderDetails/`+ orderNumber)
            .pipe(map(result => {
                return result;
            }));
    }
    getItemsOrderDetails(itemId:string,CancelReturnReplaceType:string)
    {
        return this.http.get<any>(this.baseUrl + `Order/GetProductOrderDetails/`+ itemId+'/'+CancelReturnReplaceType)
            .pipe(map(result => {
                return result;
            }));
    }
    saveOrderCancelDetails(encryptedOrderDetailsId:string,encryptedOrderId:string,reasonId:number,remark:string)
    {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var body={
            EncryptedOrderDetailsId:encryptedOrderDetailsId,
            EncryptedOrderId:encryptedOrderId,
            UserEncryptedId:userEncryptedId,
            ReasonId:reasonId,
            CancellationRemark:remark
        }
        return this.http.post<any>(this.baseUrl + `Order/SaveOrderCancel`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    saveOrderReturnDetails(encryptedOrderDetailsId:string,encryptedOrderId:string,reasonId:number,remark:string)
    {
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var body={
            EncryptedOrderDetailsId:encryptedOrderDetailsId,
            EncryptedOrderId:encryptedOrderId,
            UserEncryptedId:userEncryptedId,
            ReasonId:reasonId,
            ReturnRemark:remark
        }
        return this.http.post<any>(this.baseUrl + `Order/SaveOrderReturn`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    savebuynoworder(paymentType:number,encryptedAddressId:string)
    {
        var buyNowCart=JSON.parse(localStorage.getItem("buynow"));
        var cart=new Cart(0,buyNowCart.itemId,buyNowCart.quantity,true);
        var userEncryptedId = '';
        if (localStorage.getItem("currentidentity") != null) {
            var user = JSON.parse(localStorage.getItem("currentidentity"));
            if (user != null && user.id != null && user.id != '') {
                userEncryptedId = user.id;
            }
        }
        var body={
                paymentType:paymentType,
                encryptedAddressId:encryptedAddressId,
                userEncryptedId:userEncryptedId,
                cartDetails:cart
        }
        return this.http.post<any>(this.baseUrl + `Order/SaveBuyNowOrderDetails`, body)
            .pipe(map(result => {
                return result;
            }));
    }
}