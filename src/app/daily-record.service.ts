/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { take, tap, delay, switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DailyRecord } from './models/dailyRecord.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DailyRecordService {

  // DailyRecord data container
  private _dailyRecordData = new BehaviorSubject<DailyRecord>(new DailyRecord());

  get dailyRecordData() {
    return this._dailyRecordData.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {}

  // To reset DailyRecord data container
  resetDailyRecordData() {
    console.log(' -- inside resetDailyRecordData():');
    this._dailyRecordData.next(new DailyRecord());
  }

  saveDailyRecord() {
    console.log('-- INSIDE saveDailyRecord()  ------');
    let fetchedUserId: number;
    let httpOptions;
    const timeStamp = new Date();
    console.log('timeStamp: ', timeStamp);
    return this.authService.userId.pipe(
      take(1),
      // this is to simulate a delay in response (use only for testing):
      //  delay(2000),
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
        httpOptions = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: 'token ' + token,
          }),
        };
        return this.dailyRecordData;
      }),
      take(1),
      switchMap((data) => {
        const pastimesTmpArray = [];
        data.activitiesAndPeople.forEach((value: number[], key: string) => {
          pastimesTmpArray.push(
            {
              whatdoing: key,
              whowith: value
            }
            );
        });

        const postData = {
          current_mood: data.moodToday,
          time: timeStamp,
          include_wellbeing: true,
          wellbeing: +data.wellbeing,
          loneliness: +data.loneliness,
          pastimes: pastimesTmpArray,
          spoketosomeone: false,
	        spoketosomeone_who: '',
          hours_bed: data.locationsAndHours.get('hours_bed'),
          hours_sofa: data.locationsAndHours.get('hours_sofa'),
          hours_kitchen: data.locationsAndHours.get('hours_kitchen'),
          hours_garden: data.locationsAndHours.get('hours_garden')
        };

        this.showSentData(postData);

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

  // This is just for testing that we could save the data
  saveDailyRecordTEST() {
    console.log('-- INSIDE saveDailyRecordTEST()  ------');
    let fetchedUserId: number;
    const timeStamp = new Date();
    console.log('timeStamp: ', timeStamp);
    return this.authService.userId.pipe(
      take(1),
      // this is to simulate a delay in response (only for testing):
      delay(2000),
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
            'Content-Type': 'application/json',
            Authorization: 'token ' + token,
          }),
        };

        const postData = {
          current_mood: 'EX',
          time: timeStamp,
          include_wellbeing: true,
          wellbeing: 3,
          loneliness: 4,
          pastimes: [
            {
              whatdoing: 'GARD',
			        whowith: [39,41]
            },
            {
              whatdoing: 'TV',
			        whowith: [39]
            }
          ],
          spoketosomeone: false,
	        spoketosomeone_who: '',
          hours_bed: 2,
          hours_sofa: 3,
          hours_kitchen: 4,
          hours_garden: 5,
        };

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
  getDailyRecords() {
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
