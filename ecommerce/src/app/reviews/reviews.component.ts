import { Component, OnInit } from '@angular/core';
import { ReviewRatingService } from '../_services/reviewRatingService';
import { NgxSpinnerService } from 'ngx-spinner';

declare const $;
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['../orders/orders.component.scss', './reviews.component.scss']
})

export class ReviewsComponent implements OnInit {

  reviewRatingList:any;
  totalReviews=0;
  constructor(private reviewRatingService:ReviewRatingService,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.getReviewRatingList();
  }
  getReviewRatingList()
  {
    this.spinner.show();
    this.reviewRatingService.getReviewRatingList()
    .subscribe(
      result => {
        if (result.IsSuccess) {
          this.reviewRatingList=result.Data;
          this.totalReviews=this.reviewRatingList.length;
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        }
        else {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        }
      },
      error => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
      });
  }
  openDeletePopUp(encryptedReviewId)
  {
    alert("#Del"+encryptedReviewId);
    $("#Del"+encryptedReviewId).css('position', 'absolute');
    $("#Del"+encryptedReviewId).show();
  }
 hideDeletePopUp(encryptedReviewId)
  {
    $("#"+encryptedReviewId).hide();
  }
}