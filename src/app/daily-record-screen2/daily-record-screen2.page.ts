/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { DailyRecordService } from '../daily-record.service';
import { DailyRecord } from '../models/dailyRecord.model';
import { MyPrivacy } from '../models/myPrivacy.model';
import { PrivacyService } from '../privacy.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-daily-record-screen2',
  templateUrl: './daily-record-screen2.page.html',
  styleUrls: ['./daily-record-screen2.page.scss'],
})
export class DailyRecordScreen2Page implements OnInit, OnDestroy {

  // DailyRecord data container
  dailyRecordData: DailyRecord;
  private dailyRecordDataSub: Subscription;

  myPrivacySettings: MyPrivacy;
  private privacySettingsSub: Subscription;

  constructor(private dailyRecordService: DailyRecordService, private privacyService: PrivacyService, private router: Router) { }

  ngOnInit() {
    this.dailyRecordDataSub = this.dailyRecordService.dailyRecordData.subscribe(data => {
      this.dailyRecordData = data;
    });
    this.privacySettingsSub = this.privacyService.privacySettings.subscribe((settings) => {
      this.myPrivacySettings = settings;
    });
  }

  radio_list = [
    {
      id: 'radio_7',
      name: 'radio_list',
      value: 7,
      text: '7 -- Good --',
      disabled: false,
      color: 'primary',
    },
    {
      id: 'radio_6',
      name: 'radio_list',
      value: 6,
      text: '6',
      disabled: false,
      color: 'primary',
    },
    {
      id: 'radio_5',
      name: 'radio_list',
      value: 5,
      text: '5',
      disabled: false,
      color: 'primary',
    },
    {
      id: 'radio_4',
      name: 'radio_list',
      value: 4,
      text: '4',
      disabled: false,
      color: 'primary',
    },
    {
      id: 'radio_3',
      name: 'radio_list',
      value: 3,
      text: '3',
      disabled: false,
      color: 'primary',
    },
    {
      id: 'radio_2',
      name: 'radio_list',
      value: 2,
      text: '2',
      disabled: false,
      color: 'primary',
    },
    {
      id: 'radio_1',
      name: 'radio_list',
      value: 1,
      text: '1   --   Not good  --',
      disabled: false,
      color: 'primary',
    }
  ];

  backFooterBtnClicked() {
    this.router.navigateByUrl('/daily-record-screen1');
  }

  nextFooterBtnClicked() {
    this.router.navigateByUrl('/daily-record-screen3');
  }

  ngOnDestroy() {
    if (this.dailyRecordDataSub) {
      this.dailyRecordDataSub.unsubscribe();
    }
    if (this.privacySettingsSub) {
      this.privacySettingsSub.unsubscribe();
    }
  }

}
