import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  modalData: any;
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.modalData = data;
     }

  ngOnInit() {
  }
  createAccount() {
    this.modalData.action = 'register';
    this.modalData.title = 'Create New Account';
  }

  doLogin() {
    this.modalData.action = 'login';
    this.modalData.title = 'Login';
  }

  close() {
    this.dialogRef.close()
  }
}
