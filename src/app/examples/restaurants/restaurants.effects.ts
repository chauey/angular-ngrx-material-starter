import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { tap, withLatestFrom } from 'rxjs/operators';

import { LocalStorageService } from '@app/core';

import { State } from '@app/examples/examples.state';
import { RestaurantActionTypes } from './restaurants.actions';
import { selectRestaurants } from '@app/examples/restaurants/restaurants.selectors';

export const RESTAURANTS_KEY = 'EXAMPLES.RESTAURANTS';

@Injectable()
export class RestaurantsEffects {
  constructor(
    private actions$: Actions<Action>,
    private store: Store<State>,
    private localStorageService: LocalStorageService
  ) {}

  @Effect({ dispatch: false })
  persistRestaurants = this.actions$.pipe(
    ofType(
      RestaurantActionTypes.ADD_ONE,
      RestaurantActionTypes.UPDATE_ONE,
      RestaurantActionTypes.DELETE_ONE
    ),
    withLatestFrom(this.store.pipe(select(selectRestaurants))),
    tap(([actions, restaurantsState]) =>
      this.localStorageService.setItem(RESTAURANTS_KEY, restaurantsState)
    )
  );
}
