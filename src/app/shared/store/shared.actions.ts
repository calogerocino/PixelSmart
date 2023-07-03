import { createAction, props } from '@ngrx/store';

/* LOAD PERCENTUAL */
export const loadPercentual = createAction('[Shared] Load Percentual');
export const loadPercentualSuccess = createAction(
  '[Shared] Load Percentual Success',
  props<{ percentual: number }>()
);
export const loadPercentualFailure = createAction('[Shared] Load Percentual Failure', props<{ error: string }>());
