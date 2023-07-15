import { DEFAULT_ROUTER_FEATURENAME, routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface State {
  [DEFAULT_ROUTER_FEATURENAME]: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  [DEFAULT_ROUTER_FEATURENAME]: routerReducer
};
