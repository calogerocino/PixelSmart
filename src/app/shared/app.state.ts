import { AUTH_STATE_NAME } from '../views/auth/state/auth.selector';

import { AuthReducer } from '../views/auth/state/auth.reducer';
import { AuthState } from '../views/auth/state/auth.state';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface UserState {
  [AUTH_STATE_NAME]: AuthState;
}

export interface AppState {
  router: RouterReducerState;
}
export const appReducer = {
  [AUTH_STATE_NAME]: AuthReducer,
  // [AUTH_STATE_NAME]: userReducer,
  router: routerReducer,
};
