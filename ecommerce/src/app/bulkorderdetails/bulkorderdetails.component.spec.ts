import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkorderdetailsComponent } from './bulkorderdetails.component';

describe('BulkorderdetailsComponent', () => {
  let component: BulkorderdetailsComponent;
  let fixture: ComponentFixture<BulkorderdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkorderdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkorderdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
