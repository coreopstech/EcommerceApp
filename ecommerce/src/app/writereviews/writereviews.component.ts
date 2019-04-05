import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrManager } from 'ng6-toastr-notifications';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ReviewRatingService } from '../_services/reviewRatingService';
import { ReviewRating } from '../_models/reviewRating';
import { environment } from './../../environments/environment.prod';


@Component({
  selector: 'app-writereviews',
  templateUrl: './writereviews.component.html',
  styleUrls: ['./writereviews.component.scss']
})
export class WriteReviewsComponent implements OnInit {
  baseImageUrl=environment.baseImageUrl;
  reviewModel=new ReviewRating();
  productData: any;
  productDetails: any;
  productImageList: any;
  orderDetailsId: any;
  reviewRatingId: string;
  encryptedReviewRatingId:string;
  submitted = false;
  loading = false;
  constructor(private reviewRatingService: ReviewRatingService,
    private toastr: ToastrManager,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute, private router: Router, private formBuilder: FormBuilder) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // trick the Router into believing it's last link wasn't previously loaded
        this.router.navigated = false;
        // if you need to scroll back to top, here is the right place
        window.scrollTo(0, 0);
      }
    });
  }

  ngOnInit() {
    this.orderDetailsId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams
      .subscribe(params => {
        this.reviewRatingId = params.pId;
        this.encryptedReviewRatingId=params.pId;      
      });
    this.getReviewDetails();
  }
  getReviewDetails() {
    this.reviewRatingService.getReviewRatingDetails(this.orderDetailsId, this.reviewRatingId)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.reviewModel = result.Data;
            if (result.Data.ProductDetails != null)
              this.productData = result.Data.ProductDetails;
            if (result.Data.ProductDetails != null && result.Data.ProductDetails.ProductDetailsList.length > 0)
              this.productDetails = result.Data.ProductDetails.ProductDetailsList[0];
              
            if (result.Data.ProductDetails.ProductImagesList != null && result.Data.ProductDetails.ProductImagesList.filter((x) => x.ImageType == 1).length > 0) {
              this.productImageList = result.Data.ProductDetails.ProductImagesList.filter((x) => x.ImageType == 1);
              this.productImageList = this.productImageList[0];
            }
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }
          else {
            this.reviewModel.ReviewDescription='';
            this.reviewModel.ReviewTitle='';
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          this.reviewModel.ReviewDescription='';
            this.reviewModel.ReviewTitle='';
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
  }
  onSubmit() {
    this.spinner.show();
    this.reviewRatingService.saveReviewDetails(this.reviewModel, this.orderDetailsId,this.encryptedReviewRatingId)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.encryptedReviewRatingId=result.Data.EncryptedReviewRatingId;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.router.navigate(["/reviews"]);
          }
          else {
            this.toastr.errorToastr(result.Message);
            this.loading = false;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          this.toastr.errorToastr(error);
          this.loading = false;
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
    this.loading = false;
  }

  SaveRating(rating)
  {
    alert(rating);
    this.reviewRatingService.saveRatingDetails(rating,this.orderDetailsId,this.encryptedReviewRatingId)
    .subscribe(
      result => {
        if (result.IsSuccess) {
          this.encryptedReviewRatingId=result.Data.EncryptedReviewRatingId;
         this.toastr.successToastr("Your rating has been saved");
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
}
