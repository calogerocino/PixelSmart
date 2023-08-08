import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from 'src/app/shared/app.state';

export const AUTH_STATE_NAME = 'auth';

const getUserState = createFeatureSelector<UserState>(AUTH_STATE_NAME);

export const getUser = createSelector(getUserState, (state: UserState) => {
  return state.auth.user;
});
