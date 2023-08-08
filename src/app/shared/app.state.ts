import { AUTH_STATE_NAME } from '../views/auth/state/auth.selector';
import { SHARED_STATE_NAME } from './store/shared.selectors';

import { AuthReducer } from '../views/auth/state/auth.reducer';
import { AuthState } from '../views/auth/state/auth.state';
import { SharedState } from './store/shared.state';
import { SharedReducer } from './store/shared.reducer';

export interface UserState {
  [AUTH_STATE_NAME]: AuthState;
}

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
}
export const appReducer = {
  [AUTH_STATE_NAME]: AuthReducer,
  [SHARED_STATE_NAME]: SharedReducer,
};
