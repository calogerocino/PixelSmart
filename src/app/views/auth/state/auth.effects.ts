import { exhaustMap, map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/servizi/auth.service';
import { loginStart, loginSuccess } from './auth.action';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  // login$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(loginStart),
  //     exhaustMap((action) => {
  //       return this.authService.checkAuth().pipe(
  //         map((data: any) => {
  //           console.log('test')
  //           console.log(data)
  //           const user = this.authService.formatUser(data);
  //           return loginSuccess({ user });
  //         })
  //       );
  //     })
  //   );
  // });
}
