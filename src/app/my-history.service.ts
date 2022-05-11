/* eslint-disable no-new-wrappers */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import { take, tap, delay, switchMap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { MyHistoryItem } from './models/myHistoryItem.model ';

@Injectable({
  providedIn: 'root'
})
export class MyHistoryService {
  private _myHistory: BehaviorSubject<MyHistoryItem[]> = new BehaviorSubject<MyHistoryItem[]>([]);

  constructor(private authService: AuthService, private http: HttpClient) { }

  get myHistory() {
    return this._myHistory.asObservable();
  }

  // Gets data from the back end server
  // If firstLoad is true that means this is the first load of data (when the whole page is loaded)
  // If firstLoad is false that means the load is triggered by ion-infinite-scroll
  getMyHistoryData(firstLoad: boolean, startingRecord: number, howManyRecordsToFetch: number) {
    console.log('\n inside getMyHistoryData(...)');
    let fetchedUserId: number;
    return this.authService.userId.pipe(
      take(1),
      // this is to simulate a delay in response:
      // delay(4000),
      switchMap((userId) => {
        if (!userId) {
          throw new Error('User not found!');
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap((token) => {
        console.log('\t token to be sent = ', token);
        return this.http.get<{ responseData: string }>(
          `${environment.myHistoryUrl}?id=${fetchedUserId}&start=${startingRecord}&howManyRecords=${howManyRecordsToFetch}`,
          { headers: { Authorization: 'token ' + token } }
        );
      }),
      map((responseData) => {
        return this.extractData(responseData);
      }),
      tap(data => {
        if (firstLoad) {
          this._myHistory.next(data);
        } else {
          this.myHistory.pipe(take(1)).subscribe((currentHistoryData) => {
            this._myHistory.next(currentHistoryData.concat(data));
          });
        }
      })
    );
  }

  // extracts/parses the data from the responseData returned from the server
  extractData(responseData): MyHistoryItem[]  {
    // this is just for seeing what was returned from the server
    // this.showResponseData(responseData);
    const myHistoryTmp: MyHistoryItem[] = [];
    for (const key in responseData) {
      if (key === 'results') {
        const dataArray = responseData[key];
        console.log('\n extractData(...) - dataArray.length = ', dataArray.length);
        dataArray.forEach(dataObj => {
          const activitiesAndPeopleTmp: Map<string, number[]> = new Map<string, number[]>();
          const pastimesArray = dataObj.pastimes;
          pastimesArray.forEach(element => {
            activitiesAndPeopleTmp.set(element.whatdoing, element.whowith);
          });
          myHistoryTmp.push(
            new MyHistoryItem(
              dataObj.current_mood,
              new Date(dataObj.time),
              dataObj.include_wellbeing,
              dataObj.wellbeing,
              dataObj.previouswellbeing,
              dataObj.loneliness,
              dataObj.previousloneliness,
              activitiesAndPeopleTmp,
              dataObj.hours_bed,
              dataObj.hours_sofa,
              dataObj.hours_kitchen,
              dataObj.hours_garden
            )
          );
        });
      }
    }
    return myHistoryTmp;
  }

  // This is just for testing - to check if we can get the data from server for 'My History' screen
  showMyHistoryTEST() {
    console.log('-- INSIDE showMyHistoryTEST()');
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
        console.log('token to be sent = ', token);
        return this.http.get<{ responseData: string }>(
          `${environment.myHistoryUrl}?id=${fetchedUserId}&start=0&howManyRecords=25`,
          { headers: { Authorization: 'token ' + token } }
        );
      }),
      map((resData) => {
        // this is just for seeing what was returned from the server
        this.showResponseData(resData);
        // console.log('WHAT: ', typeof resData);

    //     console.log('---   PARSING TEST ----');
    //     for (const key in resData) {
    //         console.log('key = ', key);
    //         // console.log('resData[key] = ', resData[key]);
    //         if (key === 'results') {
    //           const dataArray = resData[key];
    //           // console.log('dataArray = ', dataArray);
    //           console.log('\n dataArray.length = ', dataArray.length);
    //           dataArray.forEach(dataObj => {
    //             // console.log('dataObj = ', dataObj);
    //             console.log('id = ', dataObj.id);
    //             console.log('current_mood = ', dataObj.current_mood);
    //             console.log('current_mood = ', new Date(dataObj.time));
    //             console.log('include_wellbeing = ', dataObj.include_wellbeing);
    //             console.log('wellbeing = ', dataObj.wellbeing);
    //             console.log('loneliness = ', dataObj.loneliness);

    //             console.log('pastimes = ', dataObj.pastimes);
    //             const pastimesArray = dataObj.pastimes;
    //             pastimesArray.forEach(element => {
    //               console.log('\t whatdoing = ', element.whatdoing);
    //               const whowithArray = element.whowith;
    //               console.log('\t\t whowith = ', element.whowith);
    //               whowithArray.forEach((element, index) => {
    //                 console.log('\t\t\t whowith[',index,'] = ', element);
    //               });
    //             });

    //             console.log('hours_bed = ', dataObj.hours_bed);
    //             console.log('hours_sofa = ', dataObj.hours_sofa);
    //             console.log('hours_kitchen = ', dataObj.hours_kitchen);
    //             console.log('hours_garden = ', dataObj.hours_garden);
    //             console.log('-----------------------------------------------');
    //           });
    //       }
    //     }
      })
    );
  }

  extractDataTEST() {
    console.log('-- INSIDE extractDataTEST()');
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
        console.log('token to be sent = ', token);
        return this.http.get<{ responseData: string }>(
          `${environment.myHistoryUrl}?id=${fetchedUserId}&start=0&howManyRecords=25`,
          { headers: { Authorization: 'token ' + token } }
        );
      }),
      map((resData) => {
        return this.extractData(resData);
      }),
      tap(data => {
        console.log('FINAL DATA OUTSIDE ======');
        data.forEach(element => {
          console.log('\n\t\t\t\t activitiesAndPeople.size = ', element.activitiesAndPeople.size);
          console.log('\t activitiesAndPeople = ', element.activitiesAndPeople);
          // console.log('element = ', element);
        });
      })
    );
  }


  // this is just for testing - to see what was returned from the server
  showResponseData(resData) {
    console.log('-------- The response data from server - START  ----------');
    console.log(JSON.stringify(resData, null, 2));
    console.log('-------- The response data from server - END  ----------');
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
}
