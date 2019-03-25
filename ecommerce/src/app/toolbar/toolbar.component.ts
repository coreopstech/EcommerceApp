import { ModalComponent } from './../modal/modal.component';
import { Component, OnInit, Inject} from '@angular/core';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  doLogin(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {action: 'login', title: 'Login'}
    });
  }

  createAccount(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '400px',
      data: {action: 'register', title: 'Create New Account'}
    });
  }

}
