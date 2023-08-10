import { User } from 'src/app/shared/models/user.model';
import { createAction, props } from '@ngrx/store';

export const LOGIN_START = '[Auth] Login start';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAIL = '[Auth] Login Fail';
export const AUTO_LOGIN_ACTION = '[Auth] Auto login';
export const LOGOUT_ACTION = '[Auth] Logout';

export const loginStart = createAction(
  LOGIN_START,
  props<{ email: string; password: string }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User; redirect: boolean }>()
);

export const autoLogin = createAction(AUTO_LOGIN_ACTION);
export const autologout = createAction(LOGOUT_ACTION);
export const dummyAction = createAction('[dummy action]');
