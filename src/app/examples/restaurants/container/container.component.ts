import { v4 as uuid } from 'uuid';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm } from '@angular/forms';
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

@Component({
  selector: 'anms-restaurants',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class RestaurantContainerComponent implements OnInit {
  private unsubscribe$: Subject<void> = new Subject<void>();
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;

  restaurantFormGroup = this.fb.group(RestaurantContainerComponent.createRestaurant());
  restaurants$: Observable<Restaurant[]>;
  selectedRestaurant: Restaurant;
  isEditing: boolean;

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

  constructor(public store: Store<State>, public fb: FormBuilder) {}

  ngOnInit() {
    this.restaurants$ = this.store.pipe(select(selectAllRestaurants));
    this.store
      .pipe(select(selectSelectedRestaurant), takeUntil(this.unsubscribe$))
      .subscribe(restaurant => (this.selectedRestaurant = restaurant));
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
