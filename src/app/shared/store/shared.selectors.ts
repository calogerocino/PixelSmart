import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromShared from './shared.reducer';

export const selectSharedState = createFeatureSelector<fromShared.SharedState>(fromShared.sharedFeatureKey);

export const selectPercentual = createSelector(selectSharedState, state => state.percentual);
export const selectPercentualLoading = createSelector(selectSharedState, state => state.percentualLoading);
export const selectPercentualError = createSelector(selectSharedState, state => state.percentualError);
