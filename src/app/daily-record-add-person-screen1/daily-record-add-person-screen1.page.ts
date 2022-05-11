/* eslint-disable max-len */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CircleService } from '../circle.service';

import {
  SOCIAL_GROUPS,
  HOW_CLOSE,
  HOW_OFTEN
} from '../../environments/config_hk';

// here we have our own data container because for <ion-radio-group (howClose)
// and <ion-select (howOften) we have to use strings not numbers on the html page
export class DataContainer {
  constructor(
    public supporterRecordId: number,
    public firstName: string,
    public lastName: string,
    public group: string,
    public howClose: string,
    public howOften: string
  ) {}
}

@Component({
  selector: 'app-daily-record-add-person-screen1',
  templateUrl: './daily-record-add-person-screen1.page.html',
  styleUrls: ['./daily-record-add-person-screen1.page.scss'],
})
export class DailyRecordAddPersonScreen1Page implements OnInit, OnDestroy {
  // we need the value of whatActivityCode to pass it back
  // to DailyRecordWhoWithScreen1Page on return
  whatActivityCode: string;

  socialGroupImagesFolderPath = './../assets/socialGroupIcons/';
  socialGroupsArray = SOCIAL_GROUPS;
  howCloseEnum = HOW_CLOSE;
  howOftenEnum = HOW_OFTEN;

  // to hide/show the DIV with the form and the Submit btn
  showForm = false;

  private routeParametrsSub: Subscription;

  // container for data that will added on this page
  data: DataContainer;

  constructor(private circleService: CircleService,  private route: ActivatedRoute, private router: Router, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.routeParametrsSub = this.route.paramMap.subscribe((params) => {
      // console.log(params);
      this.whatActivityCode = params.get('whatActivityCode');
    });
  }

  ionViewDidEnter() {
    this.data = new DataContainer(null, null, null, null, null, null);
    this.showForm = true;
  }

  showGroupsForSelection() {
    setTimeout(() => {
      const radioList = document.getElementsByClassName('alert-radio-label');
      // console.log('radioList: \n\n', radioList);
      for (let index = 0; index < radioList.length; index++) {
        const oneRadio = radioList[index];
        const groupImgSrc = this.socialGroupImagesFolderPath + SOCIAL_GROUPS[index].groupImg;
        oneRadio.innerHTML = '<div style="display: flex; flex-flow: row nowrap; align-items: center;"><img src="' +groupImgSrc+ '" style="width:30px; margin-right: 10px;"/><span>' +SOCIAL_GROUPS[index].groupName+ '</span></div>';
        // (oneRadio as HTMLElement).style.fontSize = '1em';
      }
    }, 210);
  }

  // return path to the social group image
  getSelectedSocialGroupImage(): string {
    // do not show any icon (on the left) when entering new data
    let imgFile = 'group_icon_empty.svg';
    const socialGroupCode = this.data.group;
    if (socialGroupCode) {
      const aDataFound = SOCIAL_GROUPS.filter(item => item.groupCode === socialGroupCode);
      if (aDataFound.length === 1) {
        imgFile = aDataFound[0].groupImg;
      }
    }
    return this.socialGroupImagesFolderPath + imgFile;
  }

  onSubmit(form: NgForm) {
    console.log('INSIDE onSubmit(...)');
    if (!form.valid) {
      return;
    }
    this.loadingCtrl
      .create({
        keyboardClose: true, message: 'Saving the data....',
      })
      .then((loadingEl) => {
        loadingEl.present();
        this.circleService
          .addPerson(
            this.data.firstName,
            this.data.lastName,
            this.data.group,
            +this.data.howClose,
            +this.data.howOften,
            false)
          .subscribe(
            (responseData) => {
              loadingEl.dismiss();
              this.showForm=false;
              form.reset();
              // this.showAlert2('New data saved', 'The new person was added');
              this.router.navigateByUrl('/daily-record-who-with-screen1/' +this.whatActivityCode);
            },
            (error) => {
              loadingEl.dismiss();
              this.showAlert2('An error occurred!', 'The data could not be saved. Please try again later.');
            }
          );
      });
    console.log(form);
  }

  private showAlert2(header: string, message: string) {
    this.alertCtrl
      .create({
        header: header,
        message: message,
        backdropDismiss: false,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              this.router.navigateByUrl('/daily-record-who-with-screen1/' +this.whatActivityCode);
              // this.router.navigate(['/daily-record-who-with-screen1/' +this.whatActivityCode]);
            }
          }
        ],
      })
      .then((alertEl) => alertEl.present());
  }

  convertNumberToString(aNumber: number): string {
    // we append aNumber with an empty string.
    // to convert back a string to a number we use + operator in front of a variable
    return aNumber + '';
  }

  showDataContent() {
    console.log('----------------  DATA CONTENT - START  ---------------');
    console.log('\t supporterRecordId: ', this.data.supporterRecordId);
    console.log('\t howClose: ', this.data.howClose);
    console.log('\t firstName: ', this.data.firstName);
    console.log('\t lastName: ', this.data.lastName);
    console.log('\t group: ', this.data.group);
    console.log('\t howOften: ', this.data.howOften);
    console.log('----------------  DATA CONTENT - END  ---------------');
  }

  ngOnDestroy() {
    if (this.routeParametrsSub) {
      this.routeParametrsSub.unsubscribe();
    }
  }
}
