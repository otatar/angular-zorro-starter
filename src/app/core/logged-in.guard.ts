import { Injectable } from '@angular/core';
import {
  CanLoad,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Route,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserAccountState } from '../data/types/userAccount';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedInGuard implements CanLoad {
  private userAccount: UserAccountState;

  constructor(private router: Router, private authService: AuthService) {
    this.authService.userAccount$.subscribe((ua) => (this.userAccount = ua));
  }

  canLoad(
    route: Route,
    segments: import('@angular/router').UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.userAccount.isLoggedIn) {
      this.authService.redirectUrl = route.path
      return this.router.parseUrl('/login');
    } else {
      return true;
    }
  }
}
