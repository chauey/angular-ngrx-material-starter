import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantItemDetailComponent } from './restaurant-item-detail.component';

describe('RestaurantItemDetailComponent', () => {
  let component: RestaurantItemDetailComponent;
  let fixture: ComponentFixture<RestaurantItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestaurantItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
