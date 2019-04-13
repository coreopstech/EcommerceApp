import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './../_services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { MyCartService } from '../_services/mycartService';
import { UserService } from '../_services/userService';
import { HeaderMenuService } from './../_services/headerMenuService';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckOutComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  userName: string;
  isLogged = false;
  productCartList: any;
  productData: any;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrManager,
    private myCartService: MyCartService,
    private userService: UserService,
    private headerService: HeaderMenuService) {

  }

  ngOnInit() {
    this.userService.pricechange.subscribe(status => {
      if (status) {
        this.getCartList();
      }
    });

    if (localStorage.getItem("currentidentity")) {
      this.isLogged = true;
      this.userName = JSON.parse(localStorage.getItem("currentidentity")).name;
      this.getCartList();
      if (this.productCartList == null) {
        this.router.navigate(['/viewcart']);
      }
      if (this.productCartList.length <= 0) {
        this.router.navigate(['/viewcart']);
      }

    }

  }
  getCartList() {
    this.spinner.show();
    this.productCartList = this.myCartService.getSavedCartList().subscribe(
      result => {
        if (result.IsSuccess === true) {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
          this.productData = result.Data;
          return this.productCartList = result.Data.productList;
        }
        else {
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        }
      },
      (err) => {
        setTimeout(() => {
          this.spinner.hide();
        }, 1000)
      });
  }

  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.spinner.show();
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
      return;
    }

    this.loading = true;
    //   this.authenticationService.login(this.f.username.value, this.f.password.value)
    //     .subscribe(
    //       result => {
    //         if (result.IsSuccess) {
    //           setTimeout(() => {
    //             this.spinner.hide();
    //           }, 1000)
    //           this.loginForm.reset();
    //           this.loading = false;
    //           this.ngOnInit();
    //         }
    //         else {
    //           this.toastr.error(result.Message);
    //           this.loading = false;
    //           setTimeout(() => {
    //             this.spinner.hide();
    //           }, 1000)
    //         }

    //       },
    //       error => {
    //         alert("error");
    //         this.toastr.error(error);
    //         this.loading = false;
    //         setTimeout(() => {
    //           this.spinner.hide();
    //         }, 1000)
    //       });
    //   this.loading = false;
  }
}
