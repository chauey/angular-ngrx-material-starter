import { v4 as uuid } from 'uuid';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, NgForm, FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

import { State } from '@app/examples/examples.state';
import { Restaurant } from '@app/examples/restaurants/restaurants.model';
import {
  ActionRestaurantsAddOne,
  ActionRestaurantsDeleteOne,
  ActionRestaurantsUpdateOne,
  ActionRestaurantsSelect
} from '@app/examples/restaurants/restaurants.actions';
import { selectSelectedRestaurant, selectAllRestaurants } from '@app/examples/restaurants/restaurants.selectors';
import { MatSidenav, MatBottomSheetConfig } from '@angular/material';
import {MatBottomSheet} from '@angular/material';
import { BottomSheetOverviewExampleSheet } from '@app/examples/restaurants/container/bottom-sheet-overview-example-sheet';

@Component({
  selector: 'anms-restaurants',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class RestaurantContainerComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  @ViewChild('sidenav') sidenav: MatSidenav;

  restaurantFormGroup = this.fb.group(RestaurantContainerComponent.createRestaurant());
  restaurants$: Observable<Restaurant[]>;
  selectedRestaurant: Restaurant;
  isEditing: boolean;

  options: FormGroup;

  static createRestaurant(): Restaurant {
    return {
      id: uuid(),
      name: '',
      backgroundImageURL: '',
      category: null,
      contact: null,
      location: null
    };
  }

  constructor(public store: Store<State>, public fb: FormBuilder, private bottomSheet: MatBottomSheet) {
    this.options = fb.group({
      bottom: 0,
      fixed: false,
      top: 0
    });

    this.openBottomSheet();
  }

  ngOnInit() {
    this.restaurants$ = this.store.pipe(select(selectAllRestaurants));
    this.store
      .pipe(select(selectSelectedRestaurant), takeUntil(this.unsubscribe$))
      .subscribe(restaurant => {
        this.selectedRestaurant = restaurant;
        if (this.sidenav) {
        if (this.selectedRestaurant) {
          this.sidenav.open();
        } else {
          this.sidenav.close();
        }
      }
      });

      // this.openBottomSheet();
  }

  // ngAfterViewInit() {}

  openBottomSheet(): void {
    const options = new MatBottomSheetConfig();
    options.hasBackdrop = false;

    this.bottomSheet.open(BottomSheetOverviewExampleSheet, options);
  }

  select(id: string) {
    this.store.dispatch(new ActionRestaurantsSelect({ id }));
    this.isEditing = false;
  }

  deselect() {
    this.store.dispatch(new ActionRestaurantsSelect({ id: null }));
    this.isEditing = false;
  }

  edit() {
    this.isEditing = true;
    this.restaurantFormGroup.setValue(this.selectedRestaurant);
  }

  addNew(restaurantForm: NgForm) {
    restaurantForm.resetForm();
    this.restaurantFormGroup.reset();
    this.restaurantFormGroup.setValue(RestaurantContainerComponent.createRestaurant());
    this.store.dispatch(new ActionRestaurantsSelect({ id: null }));
    this.isEditing = true;
  }

  cancelEditing() {
    this.isEditing = false;
  }

  delete() {
    this.store.dispatch(new ActionRestaurantsDeleteOne({ id: this.selectedRestaurant.id }));
    this.isEditing = false;
  }

  save() {
    if (this.restaurantFormGroup.valid) {
      const restaurant = this.restaurantFormGroup.value;
      this.store.dispatch(
        this.selectedRestaurant
          ? new ActionRestaurantsUpdateOne({
              update: {
                id: restaurant.id,
                changes: restaurant
              }
            })
          : new ActionRestaurantsAddOne({ restaurant })
      );
      this.select(restaurant.id);
      this.isEditing = false;
    }
  }

}
