/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MyPrivacy } from './models/myPrivacy.model';
import { delay, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

//
// THIS HAS NOT BEEN IMPLEMENTED YET
//
export class PrivacyService {

  // sharePersonalInterestDataWithCircle: boolean;
  // shareMoodDataWithCircle: boolean;
  // shareActivityDataWithCircle: boolean;

  // THIS IS JUST TEMPORARY UNTIL IMPLEMENTED ON THE SERVER
  private _privacySettings = new BehaviorSubject<MyPrivacy>(new MyPrivacy(true, true, true));

  // WHEN IMPLEMENTED ON THE SERVER THEN THIS SHOULD BE USED INSTEAD:
  // private _privacySettings = new BehaviorSubject<MyPrivacy>(new MyPrivacy(false, false, false));

  get privacySettings() {
    return this._privacySettings.asObservable();
  }

  constructor() {
    // TO DO:
    // in the real life privacy settings for the user  should come from the server:
   }

  // TO BE IMPLEMENTED ON THE SERVER ?
  deleteUserDataOnPrivacySettings() {
    console.log(' -- inside deleteUserDataOnPrivacySettings():');
    this._privacySettings.next(new MyPrivacy(false, false, false));
  }

  saveUserPrivacySettings() {
    console.log('PrivacyService - inside saveUserPrivacySettings():');

    const sub = this.privacySettings.pipe(take(1)).subscribe(
      currentSettings => {
        // alert(currentSettings);
        console.log('sharePersonalInterestDataWithCircle = ', currentSettings.sharePersonalInterestDataWithCircle);
        console.log('shareMoodDataWithCircle = ', currentSettings.shareMoodDataWithCircle);
        console.log('shareActivityDataWithCircle = ', currentSettings.shareActivityDataWithCircle);
      });
    if (sub) {
      sub.unsubscribe();
    }
  }
}
