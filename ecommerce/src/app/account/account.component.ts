import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { UserService } from '../_services/userService';
import { AuthenticationService } from './../_services/authentication.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../_models/user';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Globals } from './../_services/globalvariables';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})

export class AccountComponent implements OnInit {
  currentPage = 'profile';
  profileModel: User;
  isEditable = false;
  isPriceVisible=true;
  isB2B=false;
  isBulkOrder=false;
  constructor(private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private toast: ToastrManager,
    private route: ActivatedRoute,
    private router: Router,
    private global:Globals) {

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
    })
  }


  ngOnInit() {
    this.getUserDetails();
    this.isPriceVisible=this.global.isPriceVisible;
    this.isB2B=this.global.isB2B;
    this.isBulkOrder=this.global.isBulkOrder;
  }

  changeView(value: string) {
    this.currentPage = value;
  }
  onRegister() {

    this.spinner.show();
    this.userService.saveUserData(this.profileModel)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.isEditable = false;
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
  getUserDetails() {
    this.spinner.show();
    this.userService.getUserData()
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.profileModel = result.Data;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)

          }
          else {
            this.profileModel = result.Data;
            this.toast.errorToastr(result.Message, '', {
              duration: 2000,
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
  EditUserDetails(isEditable) {
    this.isEditable = true;
  }
  DeactivateUserAccount() {
    this.spinner.show();
    this.userService.DeactiveUserAccount()
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.router.navigate(['/home']);
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
}
