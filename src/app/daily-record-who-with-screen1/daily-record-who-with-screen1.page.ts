/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertController, LoadingController } from '@ionic/angular';
import { CircleService } from '../circle.service';
import { DailyRecordService } from '../daily-record.service';
import { DailyRecord } from '../models/dailyRecord.model';
import { SOCIAL_GROUPS, HOW_CLOSE, PASTIME_CHOICES } from '../../environments/config_hk';
import { DailyRecordSelectedPeopleService } from '../daily-record-selected-people.service';

@Component({
  selector: 'app-daily-record-who-with-screen1',
  templateUrl: './daily-record-who-with-screen1.page.html',
  styleUrls: ['./daily-record-who-with-screen1.page.scss'],
})
export class DailyRecordWhoWithScreen1Page implements OnInit, OnDestroy {
  whatActivityCode: string;
  whatActivityDisplayStr: string;
  isLoading = false;

  // DailyRecord data container
  dailyRecordData: DailyRecord;
  private dailyRecordDataSub: Subscription;

  private routeParametrsSub: Subscription;

  private peopleInTeCircleSub: Subscription;
  // List of people that will be presented for selection (data from MyCircle - circle.service)
  peopleList: {supporterRecordId: number; fullName: string; group: string; howClose: number; isChecked: boolean}[];

  constructor(
    private circleService: CircleService,
    private dailyRecordService: DailyRecordService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private router: Router,
    private alertCtrl: AlertController,
    private dailyRecordSelectedPeopleService: DailyRecordSelectedPeopleService) {}

  ngOnInit() {
    this.routeParametrsSub = this.route.paramMap.subscribe((params) => {
      console.log('===========   INSIDE: ngOnInit() of DailyRecordWhoWithScreen1Page');
      // console.log(params);
      this.whatActivityCode = params.get('whatActivityCode');
      this.whatActivityDisplayStr = PASTIME_CHOICES[this.whatActivityCode];
    });
    this.dailyRecordDataSub = this.dailyRecordService.dailyRecordData.subscribe(data => {
      this.dailyRecordData = data;
    });
    this.peopleInTeCircleSub = this.circleService.peopleInTheCircle.subscribe((peopleInTheCircle) => {
      this.peopleList = [];
      peopleInTheCircle.forEach(el => {
        const tmpFullName = el.firstName+ ' ' +el.lastName;
        const personSelected = this.isThePersonAlreadySelected(this.whatActivityCode, el.supporterRecordId);
        // we want the recently addded person to appear at the top of the list (but it depends on the order from the server)
        this.peopleList.unshift({
          supporterRecordId: el.supporterRecordId,
          fullName: tmpFullName,
          group: el.group,
          howClose: el.howClose,
          isChecked: personSelected
        });
      });
    });
  }

  // checks if the person was not already selected earlier
  isThePersonAlreadySelected(activityCode: string, supporterRecordId: number): boolean {
    let personWasSelected = false;
    // here we are checking if the person was selected based on the saved data
    if (this.dailyRecordData.activitiesAndPeople.has(activityCode)) {
      // getting a list of ids for the people seleted
      const tmpList: number[] = this.dailyRecordData.activitiesAndPeople.get(activityCode);
      if (tmpList.find(el => el === supporterRecordId)) {
        personWasSelected = true;
      };
    }
    return personWasSelected;
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.circleService.fetchAllDataFromTheServer().subscribe(
      () => {
        this.isLoading = false;
        // the scenario that the user is coming back from DailyRecordAddPersonScreen1Page
        // and data about what user was selected has not been saved yet)
        this.peopleList.forEach(el => {
          if (this.dailyRecordSelectedPeopleService.selectedPeopleIDs.has(el.supporterRecordId)) {
            el.isChecked = true;
          }
        });
        // now we can delete that info
        this.dailyRecordSelectedPeopleService.deleteData();
      },
      (error) => {
        this.alertCtrl.create({
          header: 'An error occured!',
          message: 'Unable to load your circle data. Please try again later.',
          backdropDismiss: false,
          buttons: [
            {
              text: 'Ok',
              handler: () => {
                this.router.navigate(['/daily-record-screen4']);
              },
            },
          ],
        }).then(alertEl => {
          alertEl.present();
        });
      }
    );
  }


  deleteBtnClicked() {
    if (this.dailyRecordData.activitiesAndPeople.has(this.whatActivityCode)) {
      this.dailyRecordData.activitiesAndPeople.delete(this.whatActivityCode);
    }
    this.router.navigateByUrl('/daily-record-screen4');
  }

  // if true then the icon to delete data is shown in the upper left corner of the screen
  isThereAnyDataToDelete() {
    return this.dailyRecordData.activitiesAndPeople.has(this.whatActivityCode);
  }

  byMyselfBtnClicked(event: any) {
    const button = event.target;
    if (button.color === 'primary') {
      button.color = 'medium';
    }
    this.dailyRecordData.activitiesAndPeople.set(this.whatActivityCode, []);
    this.router.navigateByUrl('/daily-record-screen4');
  }

  getStyleClass2(howClose: number) {
    let cssClassName = 'circleUnknown';
    if (howClose === HOW_CLOSE.INNER_CIRCLE) {
      cssClassName = 'innerCircle';
    } else if (howClose === HOW_CLOSE.MIDDLE_CIRCLE) {
      cssClassName = 'middleCircle';
    } if (howClose === HOW_CLOSE.OUTER_CIRCLE) {
      cssClassName = 'outerCircle';
    }
    return cssClassName;
  }

  addPersonBtnClicked() {
    // preserving IDs of people already selected:
    this.peopleList.forEach(el => {
      if (el.isChecked) {
        this.dailyRecordSelectedPeopleService.selectedPeopleIDs.add(el.supporterRecordId);
      }
    });
    // then go to a new page:
    this.router.navigateByUrl('/daily-record-add-person-screen1/' +this.whatActivityCode);
  }

  getNumberOfPeopleSelected() {
    const selectedPeople = this.peopleList.filter(el => {
      return el.isChecked === true;
    });
    return selectedPeople.length;
  }

  saveBtnClicked() {
    // store IDs of people selected by the user to the DailyRecordService
    const iDs: number[] = [];
    this.peopleList.forEach(el => {
      if (el.isChecked === true) {
        iDs.push(el.supporterRecordId);
      }
    });
    this.dailyRecordData.activitiesAndPeople.set(this.whatActivityCode, iDs);
    this.router.navigateByUrl('/daily-record-screen4');
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

  ngOnDestroy() {
    if (this.routeParametrsSub) {
      this.routeParametrsSub.unsubscribe();
    }
    if (this.dailyRecordDataSub) {
      this.dailyRecordDataSub.unsubscribe();
    }
    if (this.peopleInTeCircleSub) {
      this.peopleInTeCircleSub.unsubscribe();
    }
  }
}
