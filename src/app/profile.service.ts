/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, tap, delay, switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserProfileData } from './models/userProfileData.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  private _userProfileData = new BehaviorSubject<UserProfileData>(new UserProfileData(undefined));

  get userProfileData() {
    return this._userProfileData.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  // This is just for testing that we could get the userId from the authService
  // DO NOT USE THIS FUNCTION IN PRODUCTION
  showUserId() {
    this.authService.userId.pipe(take(1)).subscribe((userId) => {
      console.log('userId (from ProfileService) = ', userId);
    });
  }

  getUserProfileData() {
    let fetchedUserId: number;
    return this.authService.userId.pipe(
      take(1),
      // this is to simulate a delay in response:
      // delay(5000),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('User not found!');
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        return this.http.get<{ responseData: string }>(
          `${environment.userProfileDataApiUrl}${fetchedUserId}`,
          // eslint-disable-next-line @typescript-eslint/naming-convention
          { headers: { Authorization: 'token ' + token } }
        );
      }),
      map((resData) => {
        // this is just for testing
        this.showResponseData(resData);
        // this is just for testing
        // this.showParsedData(resData);
        // console.log('WHAT: ', typeof resData);

        return new UserProfileData(resData);
      }),
      tap(userData => {
        this._userProfileData.next(userData);
      })
    );
  }

  // this is just for testing
  showResponseData(resData) {
    console.log(
      '--------------- JUST THE response data - START  --------------'
    );
    console.log(JSON.stringify(resData, null, 2));
    console.log(
      '---------------- JUST THE response data - END  ----------------'
    );
  }

  // this is just for testing
  showParsedData(resData) {
    console.log(
      '--------------- HERE GOES PARSED DATA - START  --------------'
    );
    for (const key in resData) {
      if (resData.hasOwnProperty(key)) {
        const userObj = resData[key].user;
        console.log('\t User id: ', userObj.id);
        console.log('\t User name: ', userObj.username);
        console.log('\t User first name: ', userObj.first_name);
        console.log('\t User last name: ', userObj.last_name);
        console.log('\t User email: ', userObj.email);

        console.log('\t\t Role: ', resData[key].role);
        console.log('\t\t Phone: ', resData[key].phone);
        console.log('\t\t Date of birth: ', resData[key].date_of_birth);

        console.log('\t\t Gender: ', resData[key].gender);
        console.log('\t\t Ethnicity: ', resData[key].ethnicity);
        console.log('\t\t Education: ', resData[key].education);
        console.log('\t\t Disability: ', resData[key].disability);
        console.log(
          '\t\t Alcohol units per week: ',
          resData[key].alcohol_units_per_week
        );
      }
    }
    console.log('--------------- HERE GOES PARSED DATA - END  --------------');
  }
}
