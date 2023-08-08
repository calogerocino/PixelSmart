import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from 'src/app/shared/app.state';

export const AUTH_STATE_NAME = 'auth';

export const getUserSelector = createFeatureSelector<UserState>('auth');

export const getUser = createSelector(
  getUserSelector,
  (state: UserState) => state.auth.user
);
