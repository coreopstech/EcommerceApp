import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeProductListComponent } from './home-product-list.component';

describe('HomeProductListComponent', () => {
  let component: HomeProductListComponent;
  let fixture: ComponentFixture<HomeProductListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeProductListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
