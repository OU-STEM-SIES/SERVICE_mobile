/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-body-style */
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, tap, delay, switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MyMoodService {

  constructor(private authService: AuthService, private http: HttpClient) { }

  saveMoodValue(moodValue: string) {
    // console.log('-- INSIDE saveMoodValue(...)  moodValue: ', moodValue);
    let fetchedUserId: number;
    const timeStamp = new Date();
    // console.log('timeStamp: ', timeStamp);
    return this.authService.userId.pipe(
      take(1),
      // this is to simulate a delay in response (only for testing):
      // delay(2000),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('User not found!');
        }
        fetchedUserId = userId;
        console.log('fetchedUserId = ', fetchedUserId);
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {

        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'token '  + token
          })
        };

        const postData = { user: fetchedUserId, current_mood: moodValue, time: timeStamp };
        this.showSentData(postData);

        // console.log('token = ', token);
        return this.http.post(`${environment.moodsUrl}`, postData, httpOptions);
      }),
      map((resData) => {
        // this is just for seeing what was returned from the server
        this.showResponseData(resData);
        // console.log('WHAT: ', typeof resData);
        return resData;
      })
    );
  }

  // this is just for testing - to see what was returned from the server
  showResponseData(resData) {
    console.log('-------- The response data from server - START  ----------');
    console.log(JSON.stringify(resData, null, 2));
    console.log('-------- The response data from server - END  ----------');
  }

  // this is just for testing - to see what was sent to the server
  showSentData(data) {
    console.log('-------- The  data sent to server - START  ---------');
    console.log(JSON.stringify(data, null, 2));
    console.log('-------- The  data sent to server - END  ---------');
  }

  // This is just for testing that we could get the userId from the AuthService
  // DO NOT USE THIS FUNCTION IN PRODUCTION
  showUserId() {
    this.authService.userId.pipe(take(1)).subscribe((userId) => {
      console.log('userId: ', userId, '  ', typeof userId);
    });
  }

  // This is just for testing that we could get the token from the AuthService
  // DO NOT USE THIS FUNCTION IN PRODUCTION
  showToken() {
    this.authService.token.pipe(take(1)).subscribe((token) => {
      console.log('token: ', token, '  ', typeof token);
    });
  }

  // This is just for testing - to se/check what moods were recorded
  // The limit is set to show 100 records
  getRecordedMoods() {
    console.log('-- INSIDE getRecordedMoods()');
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
        // console.log('fetchedUserId = ', fetchedUserId);
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        // console.log('token = ', token);
        return this.http.get<{ responseData: string }>(
          `${environment.moodsUrl}?id=${fetchedUserId}&limit=100&fromdt=2021-06-16T00:00:00.000000Z`,
          { headers: { Authorization: 'token ' + token } }
        );
      }),
      map((resData) => {
        // this is just for seeing what was returned from the server
        this.showResponseData(resData);
        // console.log('WHAT: ', typeof resData);
      })
    );
  }
}
