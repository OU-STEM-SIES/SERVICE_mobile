/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DailyRecordService } from '../daily-record.service';
import { DailyRecord } from '../models/dailyRecord.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-daily-record-screen4',
  templateUrl: './daily-record-screen4.page.html',
  styleUrls: ['./daily-record-screen4.page.scss'],
})
export class DailyRecordScreen4Page implements OnInit, OnDestroy {

  // DailyRecord data container
  dailyRecordData: DailyRecord;
  private dailyRecordDataSub: Subscription;

  constructor(private dailyRecordService: DailyRecordService, private router: Router) { }

  ngOnInit() {
    this.dailyRecordDataSub = this.dailyRecordService.dailyRecordData.subscribe(data => {
      this.dailyRecordData = data;
    });
  }

  selectedByTheUser(whatWereYouDoing: string) {
    this.router.navigateByUrl('/daily-record-who-with-screen1/' + whatWereYouDoing);
   }

  // returns true if the icon/button is selected/checked
  //  then the tick will be shown
  showTick(whatWereYouDoing: string) {
    return this.dailyRecordData.activitiesAndPeople.has(whatWereYouDoing);
  }

  // returns how many people were alo doing the activity
  shownNumberOfPeople(whatWereYouDoing: string) {
    const peopleInTheActivity = this.dailyRecordData.activitiesAndPeople.get(whatWereYouDoing);
    if (peopleInTheActivity) {
      return peopleInTheActivity.length;
    } else {
      return 0;
    }
  }

  backFooterBtnClicked() {
    this.router.navigateByUrl('/daily-record-screen3');
  }

  nextFooterBtnClicked() {
    this.router.navigateByUrl('/daily-record-screen5');
  }

  // This is just for testing - to get what data is stored in DailyRecord data container
  showDailyRecordDataTEST() {
    console.log('-- showDailyRecordDataTEST() --------   START ------');
    console.log('\t\t moodToday = ', this.dailyRecordData.moodToday);
    console.log('\t\t wellbeing = ', this.dailyRecordData.wellbeing);
    console.log('\t\t loneliness = ', this.dailyRecordData.loneliness);
    console.log('\t\t activitiesAndPeople = ', this.dailyRecordData.activitiesAndPeople);
    console.log('\t\t hoursBed = ', this.dailyRecordData.locationsAndHours.get('hours_bed'));
    console.log('\t\t hoursSofa = ', this.dailyRecordData.locationsAndHours.get('hours_sofa'));
    console.log('\t\t hoursKitchen = ', this.dailyRecordData.locationsAndHours.get('hours_kitchen'));
    console.log('\t\t hoursGarden = ', this.dailyRecordData.locationsAndHours.get('hours_garden'));
    console.log('-- showDailyRecordDataTEST() --------   END ---------');
  }

  // This is just for testing -
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  otherTEST() {
    this.dailyRecordData.activitiesAndPeople.set('TV', [30,39,41,72]);
    this.dailyRecordData.activitiesAndPeople.set('EXER', []);
    this.dailyRecordData.activitiesAndPeople.set('COOK', [72]);
    this.showKeysTEST();
    // console.log('otherTEST(): \n', this.dailyRecordData.activitiesAndPeople.get('TV'));
    // const peopleInTheActivity = this.dailyRecordData.activitiesAndPeople.get('TV');
    // if (peopleInTheActivity) {
    //   console.log(peopleInTheActivity.length);
    // } else {
    //   console.log(0);
    // }
  }

  // This is just for testing -
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  showKeysTEST() {
    console.log('keys: ', Array.from(this.dailyRecordData.activitiesAndPeople.keys()));
  }

  ngOnDestroy() {
    if (this.dailyRecordDataSub) {
      this.dailyRecordDataSub.unsubscribe();
    }
  }
}
