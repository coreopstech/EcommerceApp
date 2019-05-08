import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { FormBuilder } from '@angular/forms';
import { UserService } from '../_services/userService';
import { UserAddress } from './../_models/userAddress';
import { MatDialog } from '@angular/material';
import { ModalComponent } from './../modal/modal.component';


@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.scss']
})
export class CustomerlistComponent implements OnInit {
  customerAddressList: any;
  customerAddress = new UserAddress();
  isAddNewAddress = false;
  isEditable = false;
  cities: any;
  encryptedAddressId = "";
  constructor(private userService: UserService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private toast: ToastrManager) {

  }

  ngOnInit() {
    this.spinner.show();
    if (localStorage.getItem("currentidentity")) {

      this.userService.getUserAddressDetails(JSON.parse(localStorage.getItem("currentidentity")).id)
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
  }
  openAddressForm(id: string) {
    if (id != '0') {
      this.isEditable = true;
      this.isAddNewAddress = false;
      this.ShowAddressDetails(id);
      this.encryptedAddressId = id;
    }
    else {
      this.ShowAddressDetails('');
      this.isEditable = false;
      this.isAddNewAddress = true;
      this.encryptedAddressId = "";
    }
  }
  closeAddressForm() {
    this.isEditable = false;
    this.isAddNewAddress = false;
    this.encryptedAddressId = "";
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

  onSubmit() {
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
  DeleteAddress(encryptedAddressId) {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: { action: 'deleteaddress', title: 'Delete Address', encryptedAddressId: encryptedAddressId }
    });
  }

}
