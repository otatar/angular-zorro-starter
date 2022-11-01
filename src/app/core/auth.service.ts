import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../data/types/user.model';
import { UserAccountState } from '../data/types/userAccount';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _userAccountSource = new BehaviorSubject<UserAccountState>({
    isLoggedIn: false,
    jwt: null,
    user: null,
  });

  readonly userAccount$ = this._userAccountSource.asObservable();

  redirectUrl: string | null = null;

  constructor(private router: Router) {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) this._setUserAccount(JSON.parse(storedUserInfo), false);
  }

  private _setUserAccount(
    userAccount: UserAccountState,
    setLocalStorage: boolean
  ): void {
    if (setLocalStorage)
      localStorage.setItem('userInfo', JSON.stringify(userAccount));
    this._userAccountSource.next(userAccount);
  }

  login(user: User, remember: boolean): void {
    const userAccount = {
      isLoggedIn: true,
      jwt: 'fgslgfsdjldjfjgldf',
      user: user,
    };
    this._setUserAccount(userAccount, remember);
    if (this.redirectUrl) {
      this.router.navigateByUrl(this.redirectUrl);
    } else {
      this.router.navigateByUrl('dashboard');
    }
  }

  logout(): void {
    this._setUserAccount({ isLoggedIn: false, jwt: null, user: null }, false);
    localStorage.removeItem('userInfo');
  }
}
