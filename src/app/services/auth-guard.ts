import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(public auth: AuthService, public router: Router) {}

  canActivate() {
    if (this.auth.isTokenExpired()) {
      return this.auth.refreshToken().catch(err => {
        return Observable.of(false);
      }).map((hasTokenRefresh: boolean) => {
        if (!hasTokenRefresh) {
          this.router.navigate(['login']);
          return false;
        } else {
          return true;
        }
      });
    } else {
      return Observable.of(true);
    }
  }
}
