import {
  RestaurantActionTypes,
  ActionRestaurantsAddOne,
  ActionRestaurantsUpdateOne,
  ActionRestaurantsDeleteOne
} from './restaurants.actions';

describe('Restaurants Actions', () => {
  it('should create ActionRestaurantsAddOne action', () => {
    const action = new ActionRestaurantsAddOne({
      restaurant: {
        id: '1',
        title: 'test',
        author: 'test',
        description: ''
      }
    });
    expect(action.type).toEqual(RestaurantActionTypes.ADD_ONE);
    expect(action.payload.restaurant).toEqual(
      jasmine.objectContaining({
        id: '1',
        title: 'test',
        author: 'test',
        description: ''
      })
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
