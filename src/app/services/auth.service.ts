import { Injectable } from '@angular/core';

interface TAuthenticatedUser {
  username: string | null;
  id: string | null;
}
// TODO: Implement a real authentication system.
@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isAuthenticated = true;

  private _authenticatedUser: TAuthenticatedUser = {
    username: 'maxblagun',
    id: 'baea2164-700d-42d4-bc57-08f3b2a19c03',
  };

  get isAuthenticated() {
    return this._isAuthenticated;
  }

  get authenticatedUser() {
    return this._authenticatedUser;
  }
}
