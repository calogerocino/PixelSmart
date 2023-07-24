import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.action';
import { exhaustMap, map, mergeMap } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/servizi/auth.service';

@Injectable()
export class authEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
        return this.authService.checkAuth().pipe(
          map((data) => {
            return loginSuccess();
          })
        );
      })
    );
  });
}
