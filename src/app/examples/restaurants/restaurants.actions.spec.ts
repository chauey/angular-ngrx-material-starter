import {
  RestaurantActionTypes,
  ActionRestaurantsAddOne,
  ActionRestaurantsUpdateOne,
  ActionRestaurantsDeleteOne
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

describe('Restaurants Actions', () => {
  it('should create ActionRestaurantsAddOne action', () => {
    const action = new ActionRestaurantsAddOne({
      restaurant: restaurant1
    });
    expect(action.type).toEqual(RestaurantActionTypes.ADD_ONE);
    expect(action.payload.restaurant).toEqual(
      jasmine.objectContaining(restaurant1)
    );
  });

  it('should create ActionRestaurantsUpdateOne action', () => {
    const action = new ActionRestaurantsUpdateOne({
      update: {
        id: '1',
        changes: {
          id: 'updated'
        }
      }
    });
    expect(action.type).toEqual(RestaurantActionTypes.UPDATE_ONE);
    expect(action.payload.update).toEqual(
      jasmine.objectContaining({
        id: '1',
        changes: {
          id: 'updated'
        }
      })
    );
  });

  it('should create ActionRestaurantsDeleteOne action', () => {
    const action = new ActionRestaurantsDeleteOne({ id: '1' });
    expect(action.type).toEqual(RestaurantActionTypes.DELETE_ONE);
    expect(action.payload.id).toEqual('1');
  });
});
