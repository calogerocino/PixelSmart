import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { loginSuccess, syncUserLogin } from './auth.action';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    console.log(action);
    return {
      ...state,
      user: action.user,
    };
  })
);

export function AuthReducer(state, action) {
  return _authReducer(state, action);
}


const _userReducer = createReducer(
  initialState,
  on(syncUserLogin, (state, action) => {
    console.log(action);
    return {
      ...state,
      user: action.user,
    };
  })
);

export function userReducer(state, action) {
  return _userReducer(state, action);
}
