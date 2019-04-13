import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

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
