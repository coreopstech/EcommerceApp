import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';
import { User } from './../_models/user';

// const httpOptions = {
//     headers: new HttpHeaders({
//         'Content-Type': 'application/x-www-form-urlencoded',
//         //   'Authorization': 'my-auth-token'
//     })
// };
@Injectable()
export class AuthenticationService {
    customerName: string;
    baseUrl = environment.baseUrl;
    shypliteData:any;
    constructor(private http: HttpClient) {


    }

    login(loginModel: User) {
        var cartData = localStorage.getItem("cartList");
        var userModel = {
            emailMobile: loginModel.EmailModile,
            password: loginModel.Password,
        }
        var body = {
            cartDetails: JSON.parse(cartData),
            userModel: userModel
        }
        return this.http.post<any>(this.baseUrl + 'Product/AuthenticateCustomer', body)
            .pipe(map(result => {
                // login successful if there's a jwt token in the response
                if (result.IsSuccess) {
                    localStorage.removeItem('cartList');
                 //  this.shypliteData= this.getAuthenticationTokenShyplite();
                   //localStorage.setItem('currentidentity', JSON.stringify({ token: result.Data.TokenNo, name: result.Data.FullName, id: result.Data.EncrytedId, email: result.Data.Email, mobile: result.Data.Mobile, address: result.Data.Address,shypliteUserId:this.shypliteData.userID,shypliteUserToke:this.shypliteData.userToken }));
                   localStorage.setItem('currentidentity', JSON.stringify({ token: result.Data.TokenNo, name: result.Data.FullName, id: result.Data.EncrytedId, email: result.Data.Email, mobile: result.Data.Mobile, address: result.Data.Address }));
                }
                return result;
            }));
    }

    getAuthenticationTokenShyplite() {
        return this.http.get<any>(this.baseUrl + 'Home/GetAuthentication')
            .pipe(map(result => {
                return result;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentidentity');
        localStorage.removeItem('cartList');

    }
}