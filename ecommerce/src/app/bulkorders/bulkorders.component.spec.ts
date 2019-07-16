import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkordersComponent } from './bulkorders.component';

describe('BulkordersComponent', () => {
  let component: BulkordersComponent;
  let fixture: ComponentFixture<BulkordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
