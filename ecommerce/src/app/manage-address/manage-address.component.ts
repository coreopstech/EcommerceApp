import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserService } from '../_services/userService';
import { UserAddress } from '../_models/userAddress';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage-address.component.html',
  styleUrls: ['./manage-address.component.scss']
})
export class ManageAddressComponent implements OnInit {
  customerAddressList: any;
  encryptedAddressId = "0";
  cities: any;
  customerAddress = new UserAddress();
  constructor(private spinner: NgxSpinnerService,
    private toast: ToastrManager,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUserAddressList();
  }
  getUserAddressList() {
    this.spinner.show();
    this.userService.getUserAddressDetails()
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.customerAddressList = result.Data;
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
  openAddressForm(id: string) {
    if (id != '0') {
      this.ShowAddressDetails(id);
      this.encryptedAddressId = id;
    }
    else {
      this.ShowAddressDetails('');
      this.encryptedAddressId = "0";
    }
  }
  ShowAddressDetails(addressId) {
    this.spinner.show();

    if (addressId === '')
      addressId = 0;
    this.userService.getAddressDetails(addressId)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.customerAddress = result.Data;
            if (this.customerAddress.CityList != null && this.customerAddress.CityList.length > 0) {
              this.cities = this.customerAddress.CityList;
              this.customerAddress = result.Data;
            }
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
  SaveAddress() {
    this.spinner.show();
    
    this.userService.saveUserAddressDetails(this.customerAddress)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)

            this.closeAddressForm();
            this.ngOnInit();
            this.toast.successToastr(result.Message);
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
  onStateChange(stateId) {
    this.userService.getCityList(stateId)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.cities = result.Data;
            //console.log(this.cities);
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
  closeAddressForm() {
    this.encryptedAddressId="0";
    this.ShowAddressDetails(this.encryptedAddressId);
  }
  ResetAddress()
  {
    this.closeAddressForm();
    this.ngOnInit();
  }
}
