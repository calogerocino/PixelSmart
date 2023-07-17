// import { Injectable } from "@angular/core";
// import {
//   CanActivate,
//   RouterStateSnapshot,
//   ActivatedRouteSnapshot,
// } from "@angular/router";
// import { Router } from "@angular/router";
// import { AuthService } from "./auth.service";

// @Injectable()
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router, private authService: AuthService) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     if (this.authService.isAuthenticated()) {
//       return true;
//     }

//     // not logged in so redirect to login page with the return url
//     this.router.navigate(["/auth/login"], {
//       queryParams: { returnUrl: state.url },
//     });
//     return false;
//   }
// }

import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../../shared/servizi/auth.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, public router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn !== true) {
      this.router.navigate(['/auth/login'], {
        queryParams: { returnUrl: state.url },
      });
    } else {
      return false;
    }
    return true;
  }
}

