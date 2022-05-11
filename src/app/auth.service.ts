/* eslint-disable arrow-body-style */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
//
// Capacitor storage docs:
// https://capacitorjs.com/docs/apis/storage
// to install: npm install @capacitor/storage

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, from } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { User } from './models/user.model';
// import { Plugins } from '@capacitor/core';
import { Storage } from '@capacitor/storage';

import { Observable } from 'rxjs';

export interface AuthResponseData {
  token: string;
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  last_login: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  autoLogin() {
    return from(Storage.get({ key: 'authData' })).pipe(
      map((storedData: { key: string; value: string }) => {
        if (!storedData || !storedData.value) {
          // returns null if we do not have a user
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          userId: number;
          userName: string;
          firstName: string;
          lastName: string;
          email: string;
        };
        const user = new User(
          parsedData.token,
          parsedData.userId,
          parsedData.userName,
          parsedData.firstName,
          parsedData.lastName,
          parsedData.email
        );
        return user;
      }),
      tap((user) => {
        if (user) {
          this._user.next(user);
        }
      }),
      map((user) => {
        // returns true if we have a user
        return !!user;
      })
    );
  }

  // user is logged in if there is a token (obtained from the API server) for the user
  get userIsLoggedIn() {
    console.log('inside -> userIsLoggedIn()');
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  // returnig Observable here
  get userId() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return user.userId;
        } else {
          return null;
        }
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.token;
        } else {
          return null;
        }
      })
    );
  }

  loginTEST(userName: string, password: string) {
    return this.http
      .post<AuthResponseData>(`${environment.loginApiUrl}`, {
        username: userName,
        password: password,
      })
      .pipe(tap(this.setUserData.bind(this)));
  }

  login(userName: string, password: string) {
    console.log('LOGIN url: ', `${environment.loginApiUrl}`);
    return this.http
      .post<AuthResponseData>(`${environment.loginApiUrl}`, {
        username: userName,
        password: password,
      })
      .pipe(tap(this.setUserData.bind(this)));
  }

  logout() {
    this._user.next(null);
    this.clearPermanentStorageData();
  }

  clearPermanentStorageData() {
    Storage.remove({ key: 'authData' });
  }

  private setUserData(userData: AuthResponseData) {
    console.log('INSIDE setUserData(...)  token: ', userData.token);
    this._user.next(
      new User(
        userData.token,
        userData.id,
        userData.username,
        userData.first_name,
        userData.last_name,
        userData.email
      )
    );
    this.storeAuthData(userData);
  }

  private storeAuthData(userData: AuthResponseData) {
    const data = JSON.stringify({
      token: userData.token,
      userId: userData.id,
      userName: userData.username,
      firstName: userData.first_name,
      lastName: userData.last_name,
      email: userData.email,
    });
    Storage.set({ key: 'authData', value: data });
  }
}
