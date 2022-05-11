/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DailyRecordService } from '../daily-record.service';
import { MOODS_FOR_DISPLAY } from '../../environments/config_hk';
import { DailyRecord } from '../models/dailyRecord.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-daily-record-screen1',
  templateUrl: './daily-record-screen1.page.html',
  styleUrls: ['./daily-record-screen1.page.scss'],
})
export class DailyRecordScreen1Page implements OnInit, OnDestroy {

  // DailyRecord data container
  dailyRecordData: DailyRecord;
  private dailyRecordDataSub: Subscription;

  backgroundImage: string = 'mood-grid-system_v2_yellow.svg';
  pointerImage: string = 'blackPointer1.png';

  constructor(private dailyRecordService: DailyRecordService, private router: Router) { }

  ngOnInit() {
    this.dailyRecordDataSub = this.dailyRecordService.dailyRecordData.subscribe(data => {
      this.dailyRecordData = data;
    });
  }

  //  gets the mood value for the area clicked by the user and also
  // records coordinates of the mood value selected/clicked
  recordMood(event, moodCode: string, x: number, y: number) {
    // console.log(event);
    // we are saving the mood selected to the service
    this.dailyRecordData.moodToday = moodCode;
    // we are saving the location of the pointer (the plave clicked/tapped by the user) to the service
    this.dailyRecordData.selectedMoodValueLocation.x = x;
    this.dailyRecordData.selectedMoodValueLocation.y = y;
    console.log('this.dailyRecordData.moodToday = ', this.dailyRecordData.moodToday);
    console.log('x: ' +this.dailyRecordData.selectedMoodValueLocation.x+ ' y: ' +this.dailyRecordData.selectedMoodValueLocation.y);
  }

  showPointer(x: number, y: number) {
    let verdict: boolean = false;
    if ((this.dailyRecordData.selectedMoodValueLocation.x !== null) && (this.dailyRecordData.selectedMoodValueLocation.y !== null)) {
      if (this.dailyRecordData.selectedMoodValueLocation.x === x) {
        if (this.dailyRecordData.selectedMoodValueLocation.y === y) {
          verdict = true;
        }
      }
    }
    return verdict;
  }

  resetBtnClicked() {
    console.log('Inside resetBtnClicked()');
    // NONE is defined in config_hk.ts in MOODS_FOR_DISPLAY
    this.dailyRecordData.moodToday = 'NONE';
    this.dailyRecordData.selectedMoodValueLocation = {x: null, y: null};
    console.log('this.dailyRecordData.moodToday = ', this.dailyRecordData.moodToday);
    console.log('x: ' +this.dailyRecordData.selectedMoodValueLocation.x+ ' y: ' +this.dailyRecordData.selectedMoodValueLocation.y);
  }

  showMood(moodCode: string): string {
    return MOODS_FOR_DISPLAY[moodCode];
  }

  nextFooterBtnClicked() {
    this.router.navigateByUrl('/daily-record-screen2');
  }

  // This is just for testing - to get what data is stored in DailyRecord data container
  showDailyRecordDataTEST() {
    console.log('-- showDailyRecordDataTEST() --------   START ------');
    console.log('\t\t moodToday = ', this.dailyRecordData.moodToday);
    console.log('\t\t x: ' +this.dailyRecordData.selectedMoodValueLocation.x+ ' y: ' +this.dailyRecordData.selectedMoodValueLocation.y);
    console.log('\t\t wellbeing = ', this.dailyRecordData.wellbeing);
    console.log('\t\t loneliness = ', this.dailyRecordData.loneliness);
    console.log('\t\t activitiesAndPeople = ', this.dailyRecordData.activitiesAndPeople);
    console.log('\t\t hoursBed = ', this.dailyRecordData.locationsAndHours.get('hours_bed'));
    console.log('\t\t hoursSofa = ', this.dailyRecordData.locationsAndHours.get('hours_sofa'));
    console.log('\t\t hoursKitchen = ', this.dailyRecordData.locationsAndHours.get('hours_kitchen'));
    console.log('\t\t hoursGarden = ', this.dailyRecordData.locationsAndHours.get('hours_garden'));
    console.log('-- showDailyRecordDataTEST() --------   END ---------');
  }

  ngOnDestroy() {
    if (this.dailyRecordDataSub) {
      this.dailyRecordDataSub.unsubscribe();
    }
  }

  // THIS IS NOT USED AT THE MOMENT:
  // changeBackgroundImage(imageFileName: string) {
  //   this.backgroundImage = imageFileName;
  // }

  // THIS IS NOT USED AT THE MOMENT:
  // switchGrid() {
  //   if (this.backgroundImage === 'moodBackgroundGridOFF.jpg') {
  //     this.changeBackgroundImage('moodBackgroundGridON.png');
  //   } else if (this.backgroundImage === 'moodBackgroundGridON.png') {
  //     this.changeBackgroundImage('moodBackgroundGridOFF.jpg');
  //   }
  // }
}
