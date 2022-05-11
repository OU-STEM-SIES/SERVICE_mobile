/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { PickerController } from '@ionic/angular';
import { PickerOptions } from '@ionic/core';
import { DailyRecordService } from '../daily-record.service';
import { Subscription } from 'rxjs';
import { DailyRecord } from '../models/dailyRecord.model';

@Component({
  selector: 'app-daily-record-screen5',
  templateUrl: './daily-record-screen5.page.html',
  styleUrls: ['./daily-record-screen5.page.scss'],
})
export class DailyRecordScreen5Page implements OnInit, OnDestroy {

  // DailyRecord data container
  dailyRecordData: DailyRecord;
  private dailyRecordDataSub: Subscription;

  hours: number[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

  constructor(
    private dailyRecordService: DailyRecordService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private pickerController: PickerController) {
  }

  ngOnInit() {
    this.dailyRecordDataSub = this.dailyRecordService.dailyRecordData.subscribe(data => {
      this.dailyRecordData = data;
    });
  }

  // shows picker for each icon identified by whatIcon
  async showPicker(whatIcon: string) {
    let pickerAction;
    let options: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler:(value: any) => {
            pickerAction = 'cancel';
          }
        },
        {
          text:'Ok',
          handler:(value: any) => {
            pickerAction = 'ok';
            // console.log('----- Picker value: ', typeof(value));
            // console.log('----- Picker value: ', value);
            // console.log(JSON.stringify(value, null, 2));
          }
        }
      ],
      columns:[{
        name: 'hours',
        selectedIndex: this.dailyRecordData.locationsAndHours.get(whatIcon),
        options:this.createColumnOptions()
      }]
    };

    let picker = await this.pickerController.create(options);
    picker.present();
    picker.onDidDismiss().then(async data => {
      if (pickerAction === 'ok') {
        let col = await picker.getColumn('hours');
        console.log('col: ', col);
        let selectedValueFromPicker = col.options[col.selectedIndex].value;
        this.dailyRecordData.locationsAndHours.set(whatIcon, selectedValueFromPicker);
        console.log('selectedValueFromPicker: ', selectedValueFromPicker);
      }
    });
  }

  createColumnOptions(){
    let options = [];
    this.hours.forEach(x => {
      options.push({text: x, value: x});
    });
    return options;
  }

  // returns the number of hours for whatIcon
  getHours(whatIcon: string): number {
    return this.dailyRecordData.locationsAndHours.get(whatIcon);
  }

  submitBtnClicked() {
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Saving daily record...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.dailyRecordService.saveDailyRecord().subscribe(
          (responseData) => {
            loadingEl.dismiss();
            this.dailyRecordService.resetDailyRecordData();
            this.showAlert('Data saved', 'Your daily record is saved.');
          },
          (error) => {
            loadingEl.dismiss();
            this.showAlert(
              'An error occurred!',
              'Your daily record could not be saved. Please try again later.'
            );
          }
        );
      });
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

  // This is just for testing - to see if saving data on server works
  saveDailyRecordTEST() {
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Saving daily record...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.dailyRecordService.saveDailyRecordTEST().subscribe(
          (responseData) => {
            loadingEl.dismiss();
            this.showAlert('Data saved', 'Your daily record is saved.');
          },
          (error) => {
            loadingEl.dismiss();
            this.showAlert(
              'An error occurred!',
              'Your daily record could not be saved. Please try again later.'
            );
          }
        );
      });
  }

  // This is just for testing - to get what data were recorded
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  getDailyRecordsTEST() {
    this.dailyRecordService.getDailyRecords().subscribe();
  }

  // This is just for testing that we could get the userId from the AuthService
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  showUserId_and_TokenTEST() {
    this.dailyRecordService.showUserId();
    this.dailyRecordService.showToken();
  }

  // This is just for testing -
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  resetDailyRecordDataTEST() {
    this.dailyRecordService.resetDailyRecordData();
  }

   // This is just for testing -
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  otherTEST() {
    this.dailyRecordData.activitiesAndPeople.set('ART', [30,39,41,72]);
    this.dailyRecordData.activitiesAndPeople.set('HYG', []);
    this.dailyRecordData.activitiesAndPeople.set('CLEN', [72]);
    this.dailyRecordData.activitiesAndPeople.set('VOL', [39,41]);
    this.dailyRecordData.activitiesAndPeople.set('MUS', []);

    this.dailyRecordData.wellbeing = '3';
    this.dailyRecordData.loneliness = '6';

    this.dailyRecordData.locationsAndHours.set('hours_bed', 4);
    this.dailyRecordData.locationsAndHours.set('hours_sofa', 3);
    this.dailyRecordData.locationsAndHours.set('hours_kitchen', 2);
    this.dailyRecordData.locationsAndHours.set('hours_garden', 1);
  }

  backFooterBtnClicked() {
    this.router.navigateByUrl('/daily-record-screen4');
  }

  private showAlert(header: string, message: string) {
    this.alertCtrl
      .create({
        header: header,
        message: message,
        backdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.router.navigate(['/home-screen']);
            },
          },
        ],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }

  ngOnDestroy() {
    if (this.dailyRecordDataSub) {
      this.dailyRecordDataSub.unsubscribe();
    }
  }
}
