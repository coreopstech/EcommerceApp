import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../_services/userService';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrManager } from 'ng6-toastr-notifications';
import { UserAddress } from './../_models/userAddress';

@Component({
  selector: 'app-customer-address',
  templateUrl: './customer-address.component.html',
  styleUrls: ['./customer-address.component.scss']
})
export class CustomerAddressComponent implements OnInit {

  isLogged = false;
  customerAddressList: any;
  addressForm: FormGroup;
  customerAddress= new UserAddress();
  isAddEdit = false;
  submitted = false;
  loading = false;
  cities: any;
  editRecordId: string;
  isbuttonVisibleId: string;
  selectedEncryptedId: string;
  selectedAddressDetails:any;
  
  constructor(private userService: UserService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private toast: ToastrManager) { }

  ngOnInit() {
    this.spinner.show();
    this.editRecordId = "";
    this.isbuttonVisibleId = "";
   
    if (localStorage.getItem("currentidentity")) {
      this.isLogged = true;
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

  ShowAddressDetails(addressId) {
    this.spinner.show();
    this.editRecordId = addressId;
    this.isAddEdit = true;
    if (addressId === '')
      addressId = 0;
    this.userService.getAddressDetails(addressId)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            this.customerAddress = result.Data;
            if (this.customerAddress.CityList != null && this.customerAddress.CityList.length > 0) {
              this.cities = this.customerAddress.CityList;
              this.customerAddress= result.Data;
            }
            console.log(this.customerAddress);
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
  get f() { return this.addressForm.controls; }

  onSubmit() {
    this.spinner.show();
  
    this.userService.saveUserAddressDetails(this.customerAddress)
      .subscribe(
        result => {
          if (result.IsSuccess) {
            setTimeout(() => {
              this.spinner.hide();
            }, 1000)
            this.isAddEdit = false;
            this.editRecordId = "";
            this.SetAddressId(result.Data.EncryptedAddressId);
            //this.ngOnInit();
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
            console.log(this.cities);
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
  ResetAddressList() {
    this.addressForm.reset();
    this.loading = false;
    this.isAddEdit = false;
    this.editRecordId = "";
    this.submitted=false;
    this.ngOnInit();
  }
  ShowEdit_DeliveryButton(encryptedAddressId) {
    this.ngOnInit();
    this.isbuttonVisibleId = encryptedAddressId;
  }
  SetAddressId(encryptedAddressId) {
    this.spinner.show();
    this.userService.setAddressId(encryptedAddressId);
    this.selectedEncryptedId = encryptedAddressId;
    this.userService.getAddressDetails(this.selectedEncryptedId) .subscribe(
      result => {
        if (result.IsSuccess) {
          this.selectedAddressDetails = result.Data;
          
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
  ShowAddress()
  {
    this.userService.setAddressId('');
    this.selectedEncryptedId = '';
    this.ngOnInit();
  }
}
