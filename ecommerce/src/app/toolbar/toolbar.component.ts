import { ModalComponent } from './../modal/modal.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from './../_services/authentication.service';
import { Router, NavigationEnd } from '@angular/router';
import { UserService } from './../_services/userService';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  isLogged= false;
  totalItems=0;
  constructor(public dialog: MatDialog,
    private userService:UserService,
    private authenticationService: AuthenticationService,
    private spinner:NgxSpinnerService,
    private router: Router) { 
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
    this.isLogged = this.isUserLogged();
    this.userService.cartValueChange.subscribe(status => {
      if (status == 0) {
        this.getTotalItemsCount();
      }
    });
  }
  getTotalItemsCount() {
    if (!localStorage.getItem("currentUser")) {
      if (localStorage.getItem("cartList")) {
        var items = JSON.parse(localStorage.getItem("cartList"));
        if (items != null && items.length > 0) {
          this.totalItems = items.filter((x) => x.IsSavedForLater == false).length;
        }
        else
          this.totalItems = 0;
      }
    }
    else {
      this.spinner.show();
      this.userService.getTotalCartItems().subscribe(
        result => {
          if (result.IsSuccess === true) {
            //alert(result.Data);
            this.totalItems = result.Data;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
          }
          else {
            this.totalItems = 0;
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)

          }
        },
        (err) => {
          this.totalItems = 0;
          setTimeout(() => {
            this.spinner.hide();
          }, 1000)
        });
    }

  }

  doLogin(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { action: 'login', title: 'Login' }
    });
    
  }

  createAccount(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { action: 'register', title: 'Create New Account' }
    });
  }
  isUserLogged(): boolean {
    if (localStorage.getItem('currentidentity')) {
      return true;
    }
    else {
      return false;
    }
  }
  logout() {
    alert('logout');
    this.authenticationService.logout();
    this.router.navigate(["/home"]);
  }

}
