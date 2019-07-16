import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchproductlistComponent } from './searchproductlist.component';

describe('SearchproductlistComponent', () => {
  let component: SearchproductlistComponent;
  let fixture: ComponentFixture<SearchproductlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchproductlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchproductlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
