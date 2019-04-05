import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from './../../environments/environment.prod';
import { ReviewRating } from '../_models/reviewRating';


const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem("currentuser")
    })
};
@Injectable()
export class ReviewRatingService {
    baseUrl = environment.baseUrl;
    constructor(private http: HttpClient) {
    }
    getReviewRatingList() {
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        return this.http.get<any>(this.baseUrl + `ReviewRating/GetReviewRatingList/` + userEncryptedId)
            .pipe(map(result => {
                return result;
            }));
    }
    getReviewRatingDetails(encryptedOrderDetailsId: string, reviewRatingId: string) {
        var Id = "";
        if (reviewRatingId)
            Id = "?orderDetailsId=" + encryptedOrderDetailsId + "&reviewId=" + reviewRatingId;
        else
            Id = "?orderDetailsId=" + encryptedOrderDetailsId;
        return this.http.get<any>(this.baseUrl + `ReviewRating/GetReviewRatingDetails` + Id)
            .pipe(map(result => {
                return result;
            }));
    }
    saveReviewDetails(review: ReviewRating, encryptedOrderDetailsId: string, encryptedReviewRatingId: string) {
        var currentUserId = localStorage.getItem("currentUserId");
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        review.EncryptedOrderDetailsId = encryptedOrderDetailsId;
        review.UserEncryptedId = userEncryptedId;
        review.EncryptedReviewRatingId = encryptedReviewRatingId;
        return this.http.post<any>(this.baseUrl + `ReviewRating/SaveReviewDetails`, review)
            .pipe(map(result => {
                return result;
            }));
    }
    saveRatingDetails(rating: number, OrderDetailsId: string, ReviewRatingId: string) {
        var review: ReviewRating;
        var currentUserId = localStorage.getItem("currentUserId");
        var user=JSON.parse(localStorage.getItem("currentidentity"));
        var userEncryptedId=user.id;
        
        var body = {
            reviewRating: rating,
            encryptedOrderDetailsId: OrderDetailsId,
            userEncryptedId: currentUserId,
            encryptedReviewRatingId: ReviewRatingId
        }
        return this.http.post<any>(this.baseUrl + `ReviewRating/SaveRatingDetails`, body)
            .pipe(map(result => {
                return result;
            }));
    }
    getProductReviewList(encryptedProductDetailsId: string) {
        return this.http.get<any>(this.baseUrl + `ReviewRating/GetProductReviewList/` + encryptedProductDetailsId)
            .pipe(map(result => {
                return result;
            }));
    }
}