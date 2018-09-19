import { createSelector } from '@ngrx/store';

import { selectExamples, ExamplesState } from '@app/examples/examples.state';

import { RestaurantState } from './restaurants.model';
import { restaurantAdapter } from './restaurants.reducer';

const { selectEntities, selectAll } = restaurantAdapter.getSelectors();
const getSelectedRestaurantId = (state: RestaurantState) => state.selectedRestaurantId;

export const selectRestaurants = createSelector(
  selectExamples,
  (state: ExamplesState) => state.restaurants
);

export const selectSelectedRestaurantId = createSelector(
  selectRestaurants,
  getSelectedRestaurantId
);

export const selectRestaurantsEntities = createSelector(selectRestaurants, selectEntities);
export const selectAllRestaurants = createSelector(selectRestaurants, selectAll);
export const selectSelectedRestaurant = createSelector(
  selectRestaurantsEntities,
  selectSelectedRestaurantId,
  (restaurantEntities, selectedRestaurantId) => restaurantEntities[selectedRestaurantId]
);
