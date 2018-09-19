import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { Restaurant } from '@app/examples/restaurants/restaurants.model';

export enum RestaurantActionTypes {
  ADD_ONE = '[Restaurants] Add One',
  UPDATE_ONE = '[Restaurants] Update One',
  DELETE_ONE = '[Restaurants] Delete One',
  SELECT_ONE = '[Restaurants] Select One'
}

export class ActionRestaurantsAddOne implements Action {
  readonly type = RestaurantActionTypes.ADD_ONE;
  constructor(readonly payload: { restaurant: Restaurant }) {}
}

export class ActionRestaurantsUpdateOne implements Action {
  readonly type = RestaurantActionTypes.UPDATE_ONE;
  constructor(readonly payload: { update: Update<Restaurant> }) {}
}

export class ActionRestaurantsDeleteOne implements Action {
  readonly type = RestaurantActionTypes.DELETE_ONE;
  constructor(readonly payload: { id: string }) {}
}

export class ActionRestaurantsSelect implements Action {
  readonly type = RestaurantActionTypes.SELECT_ONE;
  constructor(readonly payload: { id: string }) {}
}

export type RestaurantActions =
  | ActionRestaurantsAddOne
  | ActionRestaurantsUpdateOne
  | ActionRestaurantsDeleteOne
  | ActionRestaurantsSelect;
