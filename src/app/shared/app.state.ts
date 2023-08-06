import { AUTH_STATE_NAME } from '../views/auth/state/auth.selector';

import { AuthReducer, userReducer } from '../views/auth/state/auth.reducer';
import { AuthState } from '../views/auth/state/auth.state';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';

export interface AppState {
  [AUTH_STATE_NAME]: AuthState;
  router: RouterReducerState;
}

export const appReducer = {
  [AUTH_STATE_NAME]: {AuthReducer,userReducer},
  // [AUTH_STATE_NAME]: userReducer,
  router: routerReducer,
};
