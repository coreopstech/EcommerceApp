import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';

@Injectable()
export class HomeService {
    baseUrl=environment.baseUrl;
    constructor(private http: HttpClient) {
    }
    getBannerList():any {
        return this.http.get<any>(this.baseUrl+`Home/GetBannerList`)
            .pipe(map(result => {
                return result;
            }));
    }
    getHomeDetails():any {
        return this.http.get<any>(this.baseUrl+`Home/GetHomeDetails`)
            .pipe(map(result => {
                return result;
            }));
    }
    getFooterPagesDetails(encryptedMenuId:string)
    {
        return this.http.get<any>(this.baseUrl+`Home/GetFooterPageDetails`)
            .pipe(map(result => {
                return result;
            }));
    }
}