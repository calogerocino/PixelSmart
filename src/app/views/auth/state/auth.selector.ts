import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => !!state.user);

export const getUser = createSelector(getAuthState, (state) => state.user);

export const getUserToken = createSelector(getAuthState, (state) => state.user?.token);
