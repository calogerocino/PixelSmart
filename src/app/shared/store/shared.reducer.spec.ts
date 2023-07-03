import { Action } from '@ngrx/store';
import { initialState, reducer } from './shared.reducer';

describe('Shared Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;
      const result = reducer(initialState, action);
      expect(result).toBe(initialState);
    });
  });
});
