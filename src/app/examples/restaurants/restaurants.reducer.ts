import { createEntityAdapter, EntityAdapter } from '@ngrx/entity';

import { Restaurant, RestaurantState } from './restaurants.model';
import {
  RestaurantActionTypes,
  RestaurantActions
} from './restaurants.actions';

export function sortByName(a: Restaurant, b: Restaurant): number {
  return a.name.localeCompare(b.name);
}

export const restaurantAdapter: EntityAdapter<Restaurant> =
  createEntityAdapter<Restaurant>({
    sortComparer: sortByName
  });

export const initialState: RestaurantState = restaurantAdapter.getInitialState({
  selectedRestaurantId: null,
  ids: ['1', '2', '3'],
  entities: {
    '1': {
      id: '1',
      name: 'Hopdoddy Burger Bar',
      backgroundImageURL:
        'http://sandbox.bottlerocketapps.com/BR_iOS_CodingExam_2015_Server/Images/hopdoddy.png',
      category: 'Burgers',
      contact: {
        phone: '9723872337',
        formattedPhone: '(972) 387-2337',
        twitter: 'hopdoddy'
      },
      location: {
        address: '5100 Belt Line Road, STE 502',
        crossStreet: 'Dallas North Tollway',
        lat: 32.950787,
        lng: -96.821118,
        postalCode: '75254',
        cc: 'US',
        city: 'Addison',
        state: 'TX',
        country: 'United States',
        formattedAddress: [
          '5100 Belt Line Road, STE 502 (Dallas North Tollway)',
          'Addison, TX 75254',
          'United States'
        ]
      }
    },
    '2': {
      id: '2',
      name: 'Pappadeaux Seafood Kitchen',
      backgroundImageURL:
        'http://sandbox.bottlerocketapps.com/BR_iOS_CodingExam_2015_Server/Images/pappadeaux.png',
      category: 'Seafood',
      contact: {
        phone: '9724479616',
        formattedPhone: '(972) 447-9616',
        twitter: 'pappadeaux'
      },
      location: {
        address: '18349 Dallas Pkwy',
        crossStreet: 'at Frankford Rd.',
        lat: 32.99908456526653,
        lng: -96.83018780592823,
        postalCode: '75287',
        cc: 'US',
        city: 'Dallas',
        state: 'TX',
        country: 'United States',
        formattedAddress: [
          '18349 Dallas Pkwy (at Frankford Rd.)',
          'Dallas, TX 75287',
          'United States'
        ]
      }
    },
    '3': {
      id: '3',
      name: 'Yard House',
      backgroundImageURL:
        'http://sandbox.bottlerocketapps.com/BR_iOS_CodingExam_2015_Server/Images/yardhouse.png',
      category: 'Tap House',
      contact: {
        phone: '9727164004',
        formattedPhone: '(972) 716-4004',
        twitter: 'yardhouse',
        facebook: '92873089221',
        facebookUsername: 'YardHouse',
        facebookName: 'Yard House'
      },
      location: {
        address: '5100 Belt Line Rd',
        lat: 32.95061646,
        lng: -96.81974196,
        postalCode: '75254',
        cc: 'US',
        city: 'Dallas',
        state: 'TX',
        country: 'United States',
        formattedAddress: [
          '5100 Belt Line Rd',
          'Dallas, TX 75254',
          'United States'
        ]
      }
    }
  }
});

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
