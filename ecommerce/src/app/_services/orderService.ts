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
export class OrderService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {
    }
    saveOrderDetails(paymentType:number,encryptedAddressId:string) {
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
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
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        return this.http.get<any>(this.baseUrl + `Order/GetOrderList/`+userEncryptedId)
            .pipe(map(result => {
                return result;
            }));
    }
    getOrderDetailsList()
    {
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        return this.http.get<any>(this.baseUrl + `Order/GetOrderDetailsList/`+ userEncryptedId)
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
    getItemsOrderDetails(itemId:string,CancelReturnReplaceType:string)
    {
        return this.http.get<any>(this.baseUrl + `Order/GetProductOrderDetails/`+ itemId+'/'+CancelReturnReplaceType)
            .pipe(map(result => {
                return result;
            }));
    }
    saveOrderCancelDetails(encryptedOrderDetailsId:string,encryptedOrderId:string,reasonId:number,remark:string)
    {
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
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
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
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
}