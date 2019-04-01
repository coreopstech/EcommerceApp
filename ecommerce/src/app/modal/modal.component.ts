import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { User } from './../_models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthenticationService } from './../_services/authentication.service';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserService } from '../_services/userService';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalData: any;
  loginModel: User;
  registerModel:User;
  submitted=false;
  returnUrl: string;
  constructor(
    private spinner: NgxSpinnerService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private snackBar: MatSnackBar,
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
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';
    this.registerModel=new User();
    this.loginModel=new User();
  }
  createAccount() {
    this.modalData.action = 'register';
    this.modalData.title = 'Create New Account';
    this.registerModel=new User();
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
    console.log(this.loginModel);
    alert(this.loginModel.EmailModile);
    this.spinner.show();
    this.submitted = true;
    this.authenticationService.login(this.loginModel)
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
  onRegister() {
    
    this.spinner.show();
    if(this.registerModel.Password.trim().toLowerCase()!=this.registerModel.ConfirmPassword.trim().toLowerCase())
    {
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
}
