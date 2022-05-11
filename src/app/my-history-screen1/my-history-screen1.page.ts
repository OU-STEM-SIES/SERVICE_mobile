/* eslint-disable @typescript-eslint/semi */
/* eslint-disable arrow-body-style */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MyHistoryService } from '../my-history.service';
import { Subscription } from 'rxjs';
import { MyHistoryItem } from '../models/myHistoryItem.model ';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { MOODS_FOR_DISPLAY, PASTIME_CHOICES, HOW_CLOSE, SOCIAL_GROUPS } from '../../environments/config_hk';
import { IonInfiniteScroll } from '@ionic/angular';
import { CircleService } from '../circle.service';
import { PersonInTheCircle } from '../models/personInTheCircle.model';
import { take } from 'rxjs/operators';
// also you have to add the DatePipe in the NgModule providers section in your app.module.ts file
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-my-history-screen1',
  templateUrl: './my-history-screen1.page.html',
  styleUrls: ['./my-history-screen1.page.scss'],
})
export class MyHistoryScreen1Page implements OnInit, OnDestroy {

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  private peopleInTeCircleSub: Subscription;
  peopleInTheCircle: PersonInTheCircle[];

  private myHistorySub: Subscription;
  myHistory: MyHistoryItem[];

  // loading data from MyHistory service
  isLoading = false;

  // loading data from MyCircle service
  isLoadingFromMyCircle = false;
  fetchingDataFromMyCircleErrorMessage: string = '';

  startingRecord: number;
  howManyRecordsToFetch: number = 10;


  constructor(private circleService: CircleService, private myHistoryService: MyHistoryService, private router: Router, private alertCtrl: AlertController, public datePipe: DatePipe) { }

  ngOnInit() {
    this.peopleInTeCircleSub = this.circleService.peopleInTheCircle.subscribe((peopleInTheCircle) => {
      this.peopleInTheCircle = peopleInTheCircle;
    });
    if ((!this.peopleInTheCircle) || (this.peopleInTheCircle.length < 1)) {
      // To make sure that there is any data from CircleService
      this.isLoadingFromMyCircle = true;
      this.fetchingDataFromMyCircleErrorMessage = '';
      this.circleService.fetchAllDataFromTheServer().pipe(take(1)).subscribe(
        (data) => {
          this.peopleInTheCircle = data;
          this.isLoadingFromMyCircle = false;
        },
        (error) => {
          this.fetchingDataFromMyCircleErrorMessage = 'Your circle data could not be fetched. Please try again later.';
          console.log(this.fetchingDataFromMyCircleErrorMessage);
        }
        );
    }
    this.myHistorySub = this.myHistoryService.myHistory.subscribe(data => {
      this.myHistory = data;
    });
  }

  ionViewWillEnter() {
    this.startingRecord = 0;
    this.isLoading = true;
    this.myHistoryService.getMyHistoryData(true, this.startingRecord, this.howManyRecordsToFetch).subscribe(
      () => {
        this.isLoading = false;
      },
      (error) => {
        this.alertCtrl.create({
          header: 'An error occured!',
          message: 'The history data could not be fetched. Please try again later.',
          backdropDismiss: false,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.router.navigate(['/home-screen']);
              },
            },
          ],
        }).then(alertEl => {
          alertEl.present();
        });
      }
    );
  }

  async loadMoreData(event) {
    console.log('\n inside loadMoreData(...)');
    this.startingRecord = this.startingRecord + this.howManyRecordsToFetch;
    console.log('\t this.startingRecord = ', this.startingRecord);
    console.log('\t this.howManyRecordsToFetch = ', this.howManyRecordsToFetch);
    // this is to simulate a delay in response:
    // await this.waitMoment(2500);
    this.myHistoryService.getMyHistoryData(false, this.startingRecord, this.howManyRecordsToFetch).subscribe(
      () => {
        this.infiniteScroll.complete();
        console.log('loadMoreData(...) -  DONE');
      },
      (error) => {
        this.infiniteScroll.complete();
        console.log('loadMoreData(...) - ERROR');
      }
    );
  }

  waitMoment(time: number) {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        resolve();
      }, time);
    });
  }

  showMood(moodCode: string): string {
    return MOODS_FOR_DISPLAY[moodCode];
  }

  // returns the activity full name associated with the code
  // after looup in PASTIME_CHOICES
  // I had to add some control in case there are no value for a code
  // to avoid crashes (happened after keys changes in PASTIME_CHOICES)
  showActivity(activityCode: string): string {
    let displayStr: string = PASTIME_CHOICES[activityCode];
    displayStr = (displayStr) ? displayStr.trim() : 'Unspecified';
    if (displayStr.length < 1 ) {
      displayStr = activityCode;
    }
    return displayStr;
  }

  // returns person full name if the person is found in MyCircle.
  // Otherwise it returns the relevant message
  showFullName(supporterRecordId: number) {
    let displayStr = 'id: ' +supporterRecordId+ ' - person deleted';
    const foundPerson: PersonInTheCircle = this.peopleInTheCircle.find(aPersonInTheCircle =>
      aPersonInTheCircle.supporterRecordId === supporterRecordId);
    if (foundPerson) {
      displayStr = foundPerson.firstName+ ' ' +foundPerson.lastName;
    }
    return displayStr;
  }

  // returns CSS class for a person found in MyCircle
  getStyleClassForGroupImgDiv(supporterRecordId: number) {
    let cssClassName = 'circleUnknown';
    const foundPerson: PersonInTheCircle = this.peopleInTheCircle.find(aPersonInTheCircle =>
      aPersonInTheCircle.supporterRecordId === supporterRecordId);
    if (foundPerson) {
      if (foundPerson.howClose === HOW_CLOSE.INNER_CIRCLE) {
        cssClassName = 'innerCircle';
      } else if (foundPerson.howClose === HOW_CLOSE.MIDDLE_CIRCLE) {
        cssClassName = 'middleCircle';
      } if (foundPerson.howClose === HOW_CLOSE.OUTER_CIRCLE) {
        cssClassName = 'outerCircle';
      }
    }
    return cssClassName;
  }

  // checks if someDate is today
  isToday(someDate: Date): boolean {
    const today = new Date();
    return ((someDate.getDate() === today.getDate()) && (someDate.getMonth() === today.getMonth()) && (someDate.getFullYear() === today.getFullYear()));
  }

  // checks if someDate is yesterday
  isYesterday(someDate: Date): boolean {
    const today = new Date();
    const yesterday = new Date(today.setDate(today.getDate() - 1));
    return ((someDate.getDate() === yesterday.getDate()) && (someDate.getMonth() === yesterday.getMonth()) && (someDate.getFullYear() === yesterday.getFullYear()));
  }

  // shows date in the format that we want
  displayDate(someDate: Date): string {
    let dateToDisplay = 'Unknown date and time';
    if (someDate) {
      const aTime = this.datePipe.transform(someDate, 'hh:mma').toLowerCase();
      if (this.isToday(someDate)) {
        dateToDisplay = 'Today \xa0\xa0\xa0' +aTime;
      } else if (this.isYesterday(someDate)) {
        dateToDisplay = 'Yesterday \xa0\xa0\xa0' +aTime;
      } else {
        const mainPart = this.datePipe.transform(someDate, 'MMMM d yyyy');
        dateToDisplay = mainPart+ '\xa0\xa0\xa0' +aTime;
      }
    }
    return dateToDisplay;
  }

  // returns the code of the social group that the person belongs to (if the person is found in MyCircle).
  // Otherwise it returns null
  getSocialGroupCode(supporterRecordId: number): string {
    let socialGroupCode = null;
    const foundPerson: PersonInTheCircle = this.peopleInTheCircle.find(aPersonInTheCircle =>
      aPersonInTheCircle.supporterRecordId === supporterRecordId);
    if (foundPerson) {
      socialGroupCode = foundPerson.group;
    }
    return socialGroupCode;
  }

  // returns path to the social group image of the person identified by supporterRecordId
  getSocialGroupImageMain(supporterRecordId: number): string {
    const socialGroupCode = this.getSocialGroupCode(supporterRecordId);
    return this.getSocialGroupImage(socialGroupCode);
  }

  // returns path to the social group image
  getSocialGroupImage(groupCode: string): string {
    const imgFolderPath = './../assets/socialGroupIcons/';
    // group_icon_empty.svg is the default image if the person has unrecognised group code (or no code at all).
    // Because group_icon_empty.svg is translucent then we will show the color only
    //  That should not happen but just in case...
    let imgFile = 'group_icon_empty.svg';
    if (groupCode) {
      const aDataFound = SOCIAL_GROUPS.filter(item => item.groupCode === groupCode);
      if (aDataFound.length === 1) {
        imgFile = aDataFound[0].groupImg;
      }
    }
    return imgFolderPath + imgFile;
  }

  // returnd how the wellbeing changed from the previous record
  getChangeForWellbeing2(wellbeing: number, previousWellbeing: number): number {
    let difference = null;
    if ((wellbeing !== null) && (previousWellbeing !== null)) {
      if ((wellbeing !== 0) && (previousWellbeing !==0)) {
        difference = wellbeing - previousWellbeing;
      }
    }
    return difference;
  }

  // returnd how the loneliness changed from the previous record
  getChangeForLoneliness2(loneliness: number, previousLoneliness: number): number {
    let difference = null;
    if ((loneliness!== null) && (previousLoneliness !== null)) {
      if ((loneliness !== 0) && (previousLoneliness !== 0)) {
        difference = loneliness - previousLoneliness;
      }
    }
    return difference;
  }

  // return the full path to the image (arrow) that shows how the Wellbeing changed
  getImgForWellbeingChange2(wellbeing: number, previousWellbeing: number): string {
    const imgFolderPath =  './../assets/arrow_images/';
    let aChange = this.getChangeForWellbeing2(wellbeing, previousWellbeing);
    // console.log('getImgForWellbeingChange2(...) -> aChange: ', aChange);
    let imgFile = this.getArrowImg(aChange);
    // console.log('getImgForWellbeingChange2(...): ', imgFolderPath + imgFile);
    return imgFolderPath + imgFile;
  }

  // return the full path to the image (arrow) that shows how the Loneliness changed
  getImgForLonelinessChange2(loneliness: number, previousLoneliness: number): string {
    const imgFolderPath =  './../assets/arrow_images/';
    let aChange = this.getChangeForLoneliness2(loneliness, previousLoneliness);
    // console.log('getImgForLonelinessChange2(...) -> aChange: ', aChange);
    let imgFile = this.getArrowImg(aChange);
    // console.log('getImgForLonelinessChange2(...): ', imgFolderPath + imgFile);
    return imgFolderPath + imgFile;
  }

  // return the file name (image) that corresponds with the change
  getArrowImg(value: number): string {
    let fileName = 'empty_arrow.svg';
    switch (value) {
      case 6:
        fileName = 'Arrow+6.svg';
        break;
      case 5:
        fileName = 'Arrow+5.svg';
        break;
      case 4:
        fileName = 'Arrow+4.svg';
        break;
      case 3:
        fileName = 'Arrow+3.svg';
        break;
      case 2:
        fileName = 'Arrow+2.svg';
        break;
      case 1:
        fileName = 'Arrow+1.svg';
        break;
      case 0:
        fileName = 'Arrow+0.svg';
        break;
      case -6:
        fileName = 'Arrow-6.svg';
        break;
      case -5:
        fileName = 'Arrow-5.svg';
        break;
      case -4:
        fileName = 'Arrow-4.svg';
        break;
      case -3:
        fileName = 'Arrow-3.svg';
        break;
      case -2:
        fileName = 'Arrow-2.svg';
        break;
      case -1:
        fileName = 'Arrow-1.svg';
        break;
    }
    return fileName;
  }

  // returns the file name (image) that corresponds with the Wellbeing value
  getWellbeingImg(value: number): string {
    const imgFolderPath =  './../assets/wellbeing_loneliness_scales/';
    let fileName = 'wellbeing_scale_empty.svg';
    switch (value) {
      case 7:
        fileName = 'wellbeing_scale_7.svg';
        break;
      case 6:
        fileName = 'wellbeing_scale_6.svg';
        break;
      case 5:
        fileName = 'wellbeing_scale_5.svg';
        break;
      case 4:
        fileName = 'wellbeing_scale_4.svg';
        break;
      case 3:
        fileName = 'wellbeing_scale_3.svg';
        break;
      case 2:
        fileName = 'wellbeing_scale_2.svg';
        break;
      case 1:
        fileName = 'wellbeing_scale_1.svg';
        break;
    }
    return imgFolderPath + fileName;
  }

  // returns the file name (image) that corresponds with the Loneliness value
  getLonelinessImg(value: number): string {
    const imgFolderPath =  './../assets/wellbeing_loneliness_scales/';
    let fileName = 'loneliness_scale_empty.svg';
    switch (value) {
      case 7:
        fileName = 'loneliness_scale_7.svg';
        break;
      case 6:
        fileName = 'loneliness_scale_6.svg';
        break;
      case 5:
        fileName = 'loneliness_scale_5.svg';
        break;
      case 4:
        fileName = 'loneliness_scale_4.svg';
        break;
      case 3:
        fileName = 'loneliness_scale_3.svg';
        break;
      case 2:
        fileName = 'loneliness_scale_2.svg';
        break;
      case 1:
        fileName = 'loneliness_scale_1.svg';
        break;
    }
    return imgFolderPath + fileName;
  }

  // This is just for testing - to see what data is stored locally for 'My History' screen
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  showDataStoredLocallyTEST() {
    this.myHistoryService.myHistory.subscribe((myHistoryData) => {
      for (let i = 0; i < myHistoryData.length; i++) {
        console.log(myHistoryData[i]);
      }
    });
  }

  // This is just for testing - to get the data from server for 'My History' screen
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  showMyHistoryTEST() {
    this.myHistoryService.showMyHistoryTEST().subscribe();
  }

  // This is just for testing - to check if the data from server for 'My History' screen
  // was extracted/parsed correctly
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  extractDataTEST() {
    this.myHistoryService.extractDataTEST().subscribe();
  }

  // This is just for testing that we could get the userId from the AuthService
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  showUserId_and_Token() {
    this.myHistoryService.showUserId();
    this.myHistoryService.showToken();
  }

  ngOnDestroy() {
    if (this.peopleInTeCircleSub) {
      this.peopleInTeCircleSub.unsubscribe();
    }
    if (this.myHistorySub) {
      this.myHistorySub.unsubscribe();
    }
  }
}
