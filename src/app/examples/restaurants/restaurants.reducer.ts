import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Restaurant, RestaurantState } from './restaurants.model';
import {
  RestaurantActionTypes,
  RestaurantActions
} from './restaurants.actions';

export function sortByName(a: Restaurant, b: Restaurant): number {
  return a.name.localeCompare(b.name);
}

export const restaurantAdapter: EntityAdapter<Restaurant> = createEntityAdapter<
  Restaurant
>({
  sortComparer: sortByName
});

export const initialState: RestaurantState = restaurantAdapter.getInitialState(
  getRestaurantNgrxCollection()
);

export function restaurantReducer(
  state: RestaurantState = initialState,
  action: RestaurantActions
): RestaurantState {
  switch (action.type) {
    case RestaurantActionTypes.ADD_ONE:
      return restaurantAdapter.addOne(action.payload.restaurant, state);

    case RestaurantActionTypes.UPDATE_ONE:
      return restaurantAdapter.updateOne(action.payload.update, state);

    case RestaurantActionTypes.DELETE_ONE:
      return {
        ...restaurantAdapter.removeOne(action.payload.id, state),
        selectedRestaurantId: null
      };

    case RestaurantActionTypes.SELECT_ONE:
      return { ...state, selectedRestaurantId: action.payload.id };

    default:
      return state;
  }
}

function getRestaurantNgrxCollection() {
  const data = require('./restaurants.json');

  let id1 = 1;
  let id2 = 1;
  return {
    selectedRestaurantId: null,
    ids: data.restaurants.map(d => (id1++).toString()),
    entities: data.restaurants.reduce(
      (ac, p) => ({ ...ac, [id2]: { ...p, id: id2++ } }),
      {}
    )
  };
}
