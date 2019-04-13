import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';

@Injectable()
export class HeaderMenuService {
    baseUrl=environment.baseUrl;
    constructor(private http: HttpClient) {
    }
    
    getHeaderMenuList():any {
        return this.http.get<any>(this.baseUrl+`Product/GetHeaderMenuList`)
            .pipe(map(result => {
                return result;
            }));
    }
    // getParentMenuList() {
    //     return this.http.get<any>(this.baseUrl+`Product/GetMainHeaderList`)
    //         .pipe(map(result => {
                
    //             return result;
    //         }));
    // }
    // GetLevel1List(id) {
    //     return this.http.post<any>(this.baseUrl+`Product/GetLevel1List`,id)
    //         .pipe(map(result => {
    //             return result;
    //         }));
    // }
    // getCommanSetting()
    // {
    //     return this.http.get<any>(this.baseUrl+`Product/GetCommanSetting`)
    //     .pipe(map(result => {
    //         return result;
    //     }));
    // }
}