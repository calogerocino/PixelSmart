import { createReducer, on } from '@ngrx/store';
import * as SharedActions from './shared.actions';

export const sharedFeatureKey = 'shared';

export interface SharedState {
  percentual: number;
  percentualLoading: boolean;
  percentualError: string | null;
}

export const initialState: SharedState = {
  percentual: 0,
  percentualLoading: false,
  percentualError: null,
};

export const reducer = createReducer(
  initialState,

  on(SharedActions.loadPercentual, state => ({
    ...state,
    percentualLoading: true
  })),
  on(SharedActions.loadPercentualSuccess, (state, { percentual }) => ({
    ...state,
    percentual,
    percentualLoading: false,
    percentualError: null
  })),
  on(SharedActions.loadPercentualFailure, (state, { error }) => ({
    ...state,
    percentualLoading: false,
    percentualError: error
  }))
);
