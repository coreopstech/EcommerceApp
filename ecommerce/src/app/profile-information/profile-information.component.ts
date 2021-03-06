import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../_services/authentication.service';
import { UserService } from '../_services/userService';
import { MatSnackBar, MatDialog } from '@angular/material';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../_models/user';
import { ModalComponent } from './../modal/modal.component';
import { EmailChange } from '../_models/emailChange';
import { MobileChange } from '../_models/mobileChange';

@Component({
  selector: 'app-profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss']
})
export class ProfileInformationComponent implements OnInit {
  profileModel: User;
  emailChangeModel: EmailChange;
  mobileChangeModel: MobileChange;
  isPersonalInfoEditable = false;
  isEmailAddressEditable = false;
  isMobileEditable = false;
  previousOTP: number;
  newOTP: number;
  previousEmail: string;
  previousMobile: string;
  constructor(private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private toast: ToastrManager,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.getUserDetails();
  }
  getUserDetails() {
    this.spinner.show();
    this.userService.getUserData()
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.profileModel = result.Data;
            this.previousEmail = this.profileModel.Email;
            this.previousMobile = this.profileModel.Mobile;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)

          }
          else {
            this.profileModel = result.Data;
            this.previousEmail = '';
            this.toast.errorToastr(result.Message, '');
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }

        },
        error => {
          this.toast.errorToastr(error, '');
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
  }
  onRegister() {
    this.spinner.show();
    this.userService.saveUserData(this.profileModel)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.isPersonalInfoEditable = false;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)

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
            duration: 2000,
          });
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
  }
  onEmailChange() {
    if (this.profileModel.Email == this.previousEmail)
      return;
    this.spinner.show();
    this.emailChangeModel = new EmailChange();
    this.emailChangeModel.NewEmail = this.profileModel.Email;
    this.emailChangeModel.PreviousEmail = this.previousEmail;
    this.userService.sendEmailChangeOTP(this.emailChangeModel)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.isEmailAddressEditable = false;
            this.emailChangeModel = result.Data;
            this.emailChangeModel.NewEmailOtp = result.Data.NewEmailOtp;
            this.emailChangeModel.PreviousEmailOtp = result.Data.PreviousEmailOtp;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)

            const dialogRef = this.dialog.open(ModalComponent, {
              width: '400px',
              data: { action: 'emailChange', title: 'Verify OTP', emailChangeModel: this.emailChangeModel }
            });

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
            duration: 2000,
          });
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
  }

  onMobileChange() {
    if (this.profileModel.Mobile == this.previousMobile)
      return;
    this.spinner.show();
    this.mobileChangeModel = new MobileChange();
    this.mobileChangeModel.NewMobile = this.profileModel.Mobile;
    this.mobileChangeModel.PreviousMobile = this.previousMobile;
    this.userService.sendMobileChangeOTP(this.mobileChangeModel)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.isMobileEditable = false;
            this.mobileChangeModel = result.Data;
            this.mobileChangeModel.NewMobileOtp = result.Data.NewMobileOtp;
            this.mobileChangeModel.PreviousMobileOtp = result.Data.PreviousMobileOtp;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)

            const dialogRef = this.dialog.open(ModalComponent, {
              width: '400px',
              data: { action: 'mobileChange', title: 'Verify OTP', mobileChangeModel: this.mobileChangeModel }
            });

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
            duration: 2000,
          });
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
  }
  onProfileEdit() {
    this.isPersonalInfoEditable = true;
  }
  onEmailEdit() {
    this.isEmailAddressEditable = true;
  }
  onMobileEdit() {
    this.isMobileEditable = true;
  }
}
