import { restaurantReducer, initialState } from './restaurants.reducer';
import { RestaurantState } from './restaurants.model';
import {
  ActionRestaurantsAddOne,
  ActionRestaurantsUpdateOne,
  ActionRestaurantsDeleteOne,
  ActionRestaurantsSelect
} from './restaurants.actions';

describe('RestaurantReducer', () => {
  const TEST_INITIAL_STATE: RestaurantState = {
    selectedRestaurantId: null,
    ids: ['123'],
    entities: {
      '123': {
        id: '123',
        title: 'Reactive Programming with Angular and ngrx',
        author: 'Oren Farhi',
        description:
          'Learn to Harness the Power of Reactive Programming with RxJS and ngrx Extensions'
      }
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
        id: '1234',
        title: 'test',
        author: 'test',
        description: 'test'
      }
    });
    const state = restaurantReducer(TEST_INITIAL_STATE, action);

    expect(state.ids.length).toEqual(2);
    expect(state.entities['1234'].title).toEqual('test');
  });

  it('should update a restaurant', () => {
    const id = TEST_INITIAL_STATE.ids[0] as string;
    const action = new ActionRestaurantsUpdateOne({
      update: {
        id,
        changes: {
          title: 'updated',
          author: 'updated',
          description: 'updated'
        }
      }
    });

    const state = restaurantReducer(TEST_INITIAL_STATE, action);
    expect(state.entities[id]).toEqual(
      jasmine.objectContaining({
        title: 'updated',
        author: 'updated',
        description: 'updated'
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
