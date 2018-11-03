import { restaurantReducer, initialState } from './restaurants.reducer';
import { RestaurantState } from './restaurants.model';
import {
  ActionRestaurantsAddOne,
  ActionRestaurantsUpdateOne,
  ActionRestaurantsDeleteOne,
  ActionRestaurantsSelect
} from './restaurants.actions';

const restaurant1 = {
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
};

describe('RestaurantReducer', () => {
  const TEST_INITIAL_STATE: RestaurantState = {
    selectedRestaurantId: null,
    ids: ['1'],
    entities: {
      '1': restaurant1
    }
  };

  it('should return the default state', () => {
    const action = {} as any;
    const state = restaurantReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should add a restaurant', () => {
    const action = new ActionRestaurantsAddOne({
      restaurant: {
        ...restaurant1,
        id: '2',
        name: 'test'
      }
    });
    const state = restaurantReducer(TEST_INITIAL_STATE, action);

    expect(state.ids.length).toEqual(2);
    expect(state.entities['2'].name).toEqual('test');
  });

  it('should update a restaurant', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = new ActionRestaurantsUpdateOne({
      update: {
        id,
        changes: {
          name: 'updated'
        }
      }
    });

    const state = restaurantReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toEqual(
      jasmine.objectContaining({
        name: 'updated'
      })
    );
  });

  it('should remove a restaurant', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = new ActionRestaurantsDeleteOne({ id });
    const state = restaurantReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toBe(undefined);
  });

  it('should select a restaurant', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = new ActionRestaurantsSelect({ id });
    const state = restaurantReducer(TEST_INITIAL_STATE, action);
    expect(state.selectedRestaurantId).toBe(id as string);
  });
});
