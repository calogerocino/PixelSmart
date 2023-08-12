import { AuthService } from 'src/app/shared/servizi/auth.service';
import { catchError, exhaustMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { autoLogin, autologout, loginStart, loginSuccess } from './auth.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  setErrorMessage,
  setLoadingSpinner,
} from 'src/app/shared/store/shared.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';
import { of } from 'rxjs';

@Injectable()
export class AuthEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly store: Store<AppState>
  ) {}

  login$ = createEffect(() => this.actions$.pipe(
    ofType(loginStart),
    switchMap((action) => {
      return this.authService.SignIn(action.email, action.password).pipe(
        map((data) => {
          this.store.dispatch(setLoadingSpinner({ status: false }));
          this.store.dispatch(setErrorMessage({ message: null }));
          const user = this.authService.formatUser(data);
          this.authService.setUserInLocalStorage(user);
          // this.authService.SetUserData(user)
          return loginSuccess({ user, redirect: true });
        }),
        catchError((errResp) => {
          this.store.dispatch(setLoadingSpinner({ status: false }));
          const ErrorMessage = this.authService.getErrorMessage(
            errResp.error.error.message
          );
          return of(setErrorMessage({ message: ErrorMessage }));
        })
      );
    })
  ));

  loginRedirect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginSuccess),
      tap(() => {
        // if (action.redirect) {
        this.router.navigate(['/']);
        // }
      })
    );
  }, { dispatch: false });

  autoLogin$ = createEffect(() => this.actions$.pipe(
    ofType(autoLogin),
    map(() => {
      const user = this.authService.getUserFromLocalStorage();
      return loginSuccess({ user, redirect: false });
    })
  ));

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autologout),
      tap(() => {
        this.authService.logoutS();
        this.router.navigate(['auth/login']);
      })
    );
  }, { dispatch: false });
}
