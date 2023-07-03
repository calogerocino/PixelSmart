import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { SharedService } from '../services/shared.service';
import * as SharedActions from './shared.actions';

@Injectable()
export class SharedEffects {

  loadPercentual$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SharedActions.loadPercentual),
      switchMap(() => this.sharedService.loadPercentual().pipe(
        map(({ result, errorMessage }) =>
          !errorMessage
            ? SharedActions.loadPercentualSuccess({ percentual: result })
            : SharedActions.loadPercentualFailure({ error: errorMessage })
        ),
        catchError(error => of(SharedActions.loadPercentualFailure({ error })))
      ))
    )
  );

  constructor(private readonly actions$: Actions, private readonly sharedService: SharedService) {}
}
