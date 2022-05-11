/* eslint-disable @typescript-eslint/semi */
/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-body-style */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { PersonInTheCircle } from './models/personInTheCircle.model';
import { take, tap, delay, switchMap, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HOW_CLOSE } from 'src/environments/config_hk';

@Injectable({
  providedIn: 'root',
})
export class CircleService {
  private _peopleInTheCircle: BehaviorSubject<PersonInTheCircle[]> = new BehaviorSubject<PersonInTheCircle[]>([]);

  get peopleInTheCircle() {
    return this._peopleInTheCircle.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) {
  }

  // gets all data for people in the circles from the back end server
  fetchAllDataFromTheServer() {
    console.log('-- INSIDE fetchAllDataFromTheServer()');
    return this.authService.token.pipe(
      take(1),
      // this is to simulate a delay in response:
      // delay(2000),
      switchMap((token) => {
        console.log('token to be sent = ', token);
        return this.http.get<{ responseData: string }>(
          `${environment.myCircleReadingUrl}`,
          { headers: { Authorization: 'token ' + token } }
        );
      }),
      map((resData) => {
        // this.showResponseData(resData);
        let aDataForTheScreen: PersonInTheCircle[] = [];
        let innerCircleData: PersonInTheCircle[] = [];
        let middleCircleData: PersonInTheCircle[] = [];
        let outerCircleData: PersonInTheCircle[] = [];

        for (const key in resData) {
          if (resData[key].hasOwnProperty('circle_of_support_1')) {
            const circleDataObj = resData[key]['circle_of_support_1'];
            innerCircleData = this.getDataForOneCircle(circleDataObj, HOW_CLOSE.INNER_CIRCLE);
          }
          if (resData[key].hasOwnProperty('circle_of_support_2')) {
            const circleDataObj = resData[key]['circle_of_support_2'];
            middleCircleData = this.getDataForOneCircle(circleDataObj, HOW_CLOSE.MIDDLE_CIRCLE);
          }
          if (resData[key].hasOwnProperty('circle_of_support_3')) {
            const circleDataObj = resData[key]['circle_of_support_3'];
            outerCircleData = this.getDataForOneCircle(circleDataObj, HOW_CLOSE.OUTER_CIRCLE);
          }
        }

        // mergin data for all the circles
        aDataForTheScreen = aDataForTheScreen.concat(innerCircleData, middleCircleData, outerCircleData);
        return aDataForTheScreen;
      }),
      tap((aDataForTheScreen) => {
        this._peopleInTheCircle.next(aDataForTheScreen);
      })
    );
  }

  // returns the data that can be edited
  getPersonForEdit(supporterRecordId: number) {
    return this.peopleInTheCircle.pipe(
      take(1),
      map((peopleInTheCircle) => {
        return { ...peopleInTheCircle.find((p) => p.supporterRecordId === supporterRecordId) };
      })
    );
  }

  // saving the data of the new person in the circle
  addPerson(
    firstName: string,
    lastName: string,
    group: string,
    howClose: number,
    howOften: number,
    isChecked: boolean
  ) {
    return this.authService.token.pipe(
      take(1),
       // this is to simulate a delay in response (use only for testing):
       //  delay(2000),
      switchMap((token) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'token '  + token
          })
        };

        const postData = {
          new_supporter: {
            first_name: firstName,
            last_name: lastName,
          },
          group: group,
          circle_of_support: howClose,
          how_often_expected_interaction: howOften
        };

        this.showSentData(postData);
        return this.http.post(`${environment.addToMyCircleUrl}`, postData, httpOptions);
       }),
       map((responseData) => {
        //  We return the responseData here but the data for all users will be fetched from the server
        // to show them on the my-circle-screen1 and stored locally
         // This is just for seeing what was returned from the server
         this.showResponseData(responseData);
         // console.log('WHAT: ', typeof responseData);
         return responseData;
       })
     );
  }

  // we remove the person identified by 'supporterRecordId' (it is the supporter record id)
  // 'id' (user record id) here is used just for removing the data that is held locally
  removePerson(personId: number, supporterRecordId: number) {
    return this.authService.token.pipe(
      take(1),
      // this is to simulate a delay in response:
      // delay(2000),
      switchMap(token => {
        console.log('token to be sent = ', token);
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'token '  + token
          })
        };

        const postData = {
          supporter_record_id: supporterRecordId,
          delete_supporter: true
        };

        this.showSentData(postData);
        return this.http.post(`${environment.removeFromMyCircleUrl}`, postData, httpOptions);
      }),
      switchMap((responseData) => {
        // just showing what was returned
        this.showResponseData(responseData);
        return this.peopleInTheCircle;
      }),
      take(1),
      tap((peopleInTheCircle) => {
        this._peopleInTheCircle.next(
          peopleInTheCircle.filter((p) => p.id !== personId)
        );
      })
    );
  }

  // saving the data of the person in the circle after it was edited
  updatePersonData(supporterRecordId: number, firstName: string, lastName: string, group: string, howClose: number, howOften: number) {
    return this.authService.token.pipe(
      take(1),
       // this is to simulate a delay in response (use only for testing):
       //  delay(2000),
      switchMap((token) => {
        const httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'application/json',
            Authorization: 'token '  + token
          })
        };

        const postData = {
          supporter_record_id: supporterRecordId,
          to_circle: howClose,
          first_name: firstName,
          last_name: lastName,
          group: group,
          how_often_expected_interaction: howOften
        }

        this.showSentData(postData);
        return this.http.post(`${environment.editDataMyCircleUrl}`, postData, httpOptions);
       }),
       map((responseData) => {
        //  We return the responseData here but the data for all users will be fetched from the server
        // to show them on the my-circle-screen1 and stored locally
         // This is just for seeing what was returned from the server
         this.showResponseData(responseData);
         // console.log('WHAT: ', typeof responseData);
         return responseData;
       })
      );
  }

  getDataForOneCircle(oneCircleData, whatCircle: number) {
    const aList: PersonInTheCircle[] = [];
    oneCircleData.forEach(element => {
      const supporterRecordId: number = element['id'];
      const group: string = element['group'];
      const howOften: number = element['how_often_expected_interaction'];

      if (element.hasOwnProperty('user_profile')) {
        const userProfileObj = element['user_profile'];
        if (userProfileObj.hasOwnProperty('user')) {
          const userObj = userProfileObj['user'];
          const aPerson = new PersonInTheCircle(userObj.id, supporterRecordId, userObj.first_name, userObj.last_name, group, whatCircle, howOften);
          aList.push(aPerson);
        }
      }
    });
    return aList;
  }

  // This is just for testing - to experiment with parsing data received from the server
  parsingTEST_1() {
    let aDataForTheScreen: PersonInTheCircle[] = [];
    console.log('-- INSIDE parsingTEST_1()');
    return this.authService.token.pipe(
      take(1),
      // this is to simulate a delay in response:
      // delay(5000),
      switchMap((token) => {
        console.log('token to be sent = ', token);
        return this.http.get<{ responseData: string }>(
          `${environment.myCircleReadingUrl}`,
          { headers: { Authorization: 'token ' + token } }
        );
      }),
      map((resData) => {
        let innerCircleData: PersonInTheCircle[] = [];
        let middleCircleData: PersonInTheCircle[] = [];
        let outerCircleData: PersonInTheCircle[] = [];

        for (const key in resData) {
          if (resData[key].hasOwnProperty('circle_of_support_1')) {
            const circleDataObj = resData[key]['circle_of_support_1'];
            innerCircleData = this.getDataForOneCircle(circleDataObj, HOW_CLOSE.INNER_CIRCLE);
          }
          if (resData[key].hasOwnProperty('circle_of_support_2')) {
            const circleDataObj = resData[key]['circle_of_support_2'];
            middleCircleData = this.getDataForOneCircle(circleDataObj, HOW_CLOSE.MIDDLE_CIRCLE);
          }
          if (resData[key].hasOwnProperty('circle_of_support_3')) {
            const circleDataObj = resData[key]['circle_of_support_3'];
            outerCircleData = this.getDataForOneCircle(circleDataObj, HOW_CLOSE.OUTER_CIRCLE);
          }
        }

        // mergin data for all the circles
        aDataForTheScreen = aDataForTheScreen.concat(innerCircleData, middleCircleData, outerCircleData);
        // here we check if we really got everything right:
        console.log('--------------- DATA REDY FOR THE SCREEN - START  --------------');
        aDataForTheScreen.forEach(el => {
            console.log('\t id: ', el.id);
            console.log('\t firstName: ', el.firstName);
            console.log('\t lastName: ', el.lastName);
            console.log('\t group: ', el.group);
            console.log('\t howClose: ', el.howClose);
            console.log('\t howOften: ', el.howOften);
            console.log('---------------------------------------');
        });
        console.log('--------------- DATA REDY FOR THE SCREEN - END  --------------');
        // console.log('typeof resData: ', typeof resData);
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

  // This is just for testing - to check if we can get the data from server for 'My Circle' screen
  showPeopleInTheCircleTEST() {
    console.log('-- INSIDE showPeopleInTheCircleTEST()');
    return this.authService.token.pipe(
      take(1),
      // this is to simulate a delay in response:
      // delay(5000),
      switchMap((token) => {
        console.log('token to be sent = ', token);
        return this.http.get<{ responseData: string }>(
          `${environment.myCircleReadingUrl}`,
          { headers: { Authorization: 'token ' + token } }
        );
      }),
      map((resData) => {
        // this is just for seeing what was returned from the server
        this.showResponseData(resData);
        console.log('WHAT: ', typeof resData);
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

}
