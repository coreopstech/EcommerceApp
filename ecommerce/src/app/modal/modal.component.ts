import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from './../_models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../_services/authentication.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../_services/userService';
import { ToastrManager } from 'ng6-toastr-notifications';
import { EmailChange } from './../_models/emailChange';
import { MobileChange } from '../_models/mobileChange';
import { BulkOrder } from './../_models/bulkOrder';
import { ProductDetailService } from './../_services/productDetailsService';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalData: any;
  loginModel: User;
  emailModel: EmailChange;
  mobileModel: MobileChange;
  registerModel: User;
  submitted = false;
  returnUrl: string;
  previousOtp: string;
  newOtp: string;
  previousMobileOtp: string;
  newMobileOtp: string;
  bulkOrderModel:BulkOrder;
  constructor(
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    private productDetailService:ProductDetailService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private toast: ToastrManager,
    private route: ActivatedRoute,
    private router: Router,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.modalData = data;

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
    if (this.modalData.emailChangeModel != null && this.modalData.emailChangeModel.PreviousEmailOtp != '') {
      this.previousOtp = this.modalData.emailChangeModel.PreviousEmailOtp;
      this.newOtp = this.modalData.emailChangeModel.NewEmailOtp;

      this.emailModel = new EmailChange();
      this.emailModel = this.modalData.emailChangeModel;
      this.emailModel.NewEmailOtp = "";
      this.emailModel.PreviousEmailOtp = "";
      this.emailModel.Password = "";
    }
    if (this.modalData.mobileChangeModel != null && this.modalData.mobileChangeModel.PreviousMobileOtp != '') {
      this.previousMobileOtp = this.modalData.mobileChangeModel.PreviousMobileOtp;
      this.newMobileOtp = this.modalData.mobileChangeModel.NewMobileOtp;

      this.mobileModel = new MobileChange();
      this.mobileModel = this.modalData.mobileChangeModel;
      this.mobileModel.NewMobileOtp = "";
      this.mobileModel.PreviousMobileOtp = "";
      this.mobileModel.Password = "";
    }
    if (this.modalData.bulkOrder != null && this.modalData.bulkOrder.EncryptedProductDetailsId != '') {
     this.bulkOrderModel=new BulkOrder();
     this.bulkOrderModel=this.modalData.bulkOrder;
    }
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.registerModel = new User();
    this.loginModel = new User();
  }
  createAccount() {
    this.modalData.action = 'register';
    this.modalData.title = 'Create New Account';
    this.registerModel = new User();
  }

  doLogin() {

    this.modalData.action = 'login';
    this.modalData.title = 'Login';
    this.loginModel = new User();
    this.loginModel.EmailModile = "";
    this.loginModel.Password = "";

  }

  close() {
    this.dialogRef.close();
  }
  onLogin() {
    this.spinner.show();
    this.submitted = true;
    this.authenticationService.login(this.loginModel)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.userService.changeCartValue(0);
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.dialogRef.close();
            this.router.navigate([this.returnUrl]);
          }
          else {
            this.toast.successToastr(result.Message, '', {
              duration: 3000,
            });
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          this.snackBar.open(error, '', {
            duration: 2000,
          });
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
  }
  onRegister() {

    this.spinner.show();
    if (this.registerModel.Password.trim().toLowerCase() != this.registerModel.ConfirmPassword.trim().toLowerCase()) {
      setTimeout(() => {
        this.spinner.hide();
      }, 1000)
      this.snackBar.open('Password Not Match', '', {
        duration: 3000,
      });
      return;
    }
    this.submitted = true;
    this.userService.register(this.registerModel)
      .subscribe(
        result => {
          if (result.IsSuccess) {

            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.dialogRef.close();
            this.router.navigate([this.returnUrl]);
          }
          else {

            this.snackBar.open(result.Message, '', {
              duration: 3000,
            });
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          this.snackBar.open(error, '', {
            duration: 2000,
          });
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
  }
  DeleteAddress(encryptedAddressId) {
    this.spinner.show();
    this.userService.DeleteAddressDetails(encryptedAddressId)
      .subscribe(
        result => {
          if (result.IsSuccess) {

            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.dialogRef.close();
            this.toast.successToastr(result.Message, '', {
              duration: 3000,
            });
            this.router.navigate([this.returnUrl]);
          }
          else {

            this.toast.errorToastr(result.Message, '', {
              duration: 3000,
            });
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          this.toast.errorToastr(error, '', {
            duration: 3000,
          });
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
  }
  onEmailChange() {
    if (this.emailModel.NewEmailOtp != this.newOtp) {
      this.toast.errorToastr("OTP of " + this.emailModel.NewEmail + " incorrect! Please enter valid OTP");
      return;
    }
    if (this.emailModel.PreviousEmailOtp != this.previousOtp) {
      this.toast.errorToastr("OTP of " + this.emailModel.PreviousEmail + " incorrect! Please enter valid OTP");
      return;
    }
    this.spinner.show();
    this.userService.ChangeUserEmail(this.emailModel)
      .subscribe(
        result => {
          if (result.IsSuccess) {

            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.dialogRef.close();
            //this.router.navigate([this.returnUrl]);
          }
          else {
            this.toast.errorToastr(result.Data);
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          this.snackBar.open(error, '', {
            duration: 2000,
          });
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
  }
  onMobileChange() {
    if (this.mobileModel.NewMobileOtp != this.newMobileOtp) {
      this.toast.errorToastr("OTP of " + this.mobileModel.NewMobile + " incorrect! Please enter valid OTP");
      return;
    }
    if (this.mobileModel.PreviousMobileOtp != this.previousMobileOtp) {
      this.toast.errorToastr("OTP of " + this.mobileModel.PreviousMobile + " incorrect! Please enter valid OTP");
      return;
    }
    this.spinner.show();
    this.userService.ChangeUserMobile(this.mobileModel)
      .subscribe(
        result => {
          if (result.IsSuccess) {

            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.dialogRef.close();
            //this.router.navigate([this.returnUrl]);
          }
          else {
            this.toast.errorToastr(result.Data);
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          this.snackBar.open(error, '', {
            duration: 2000,
          });
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
  }
  onBulkOrder()
  {
    this.spinner.show();
    this.submitted = true;
    this.productDetailService.saveBulkOrder(this.bulkOrderModel)
      .subscribe(
        result => {
          if (result.IsSuccess) {

            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.toast.successToastr("Your Order has been Confirmed. Will connect with you soon!");
            this.dialogRef.close();
          }
          else {

            this.toast.errorToastr(result.Message);
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          this.toast.errorToastr(error);
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
  }

}
