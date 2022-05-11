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
  selector: 'app-add-edit-circle1',
  templateUrl: './add-edit-circle1.page.html',
  styleUrls: ['./add-edit-circle1.page.scss'],
})
export class AddEditCircle1Page implements OnInit, OnDestroy {
  socialGroupImagesFolderPath = './../assets/socialGroupIcons/';
  socialGroupsArray = SOCIAL_GROUPS;
  howCloseEnum = HOW_CLOSE;
  howOftenEnum = HOW_OFTEN;

  // to hide/show the DIV with the form and the Submit btn
  showForm = false;

  private routeParametrsSub: Subscription;

  // This page can be in one of 2 modes: 'add' (to add person to the circle) or
  //  'edit' (to edit data for the person in the circle)
  private pageInAddMode: boolean = false;
  private pageInEditMode: boolean = false;

  pageTitle: string = 'Page mode error!';

  // id of the data that will be edited on this page
  private supporterRecordId: number;

  // container for data that will added or edited on this page
  data: DataContainer;

  constructor(private circleService: CircleService,
    private route: ActivatedRoute,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController) {}

  ngOnInit() {
    this.routeParametrsSub=this.route.paramMap.subscribe(params => {
      console.log('===========   INSIDE: ngOnInit() of AddEditCircle1Page');
      // console.log(params);
      const mode: string = params.get('mode');
      if (mode === 'edit') {
        this.pageInEditMode = true;
        this.supporterRecordId = +params.get('supporterRecordId');
        // gets data to be edited:
        this.circleService.getPersonForEdit(this.supporterRecordId).subscribe(
          (data) => {
            this.data = new DataContainer(data.supporterRecordId, data.firstName,
              data.lastName, data.group, this.convertNumberToString(data.howClose), this.convertNumberToString(data.howOften));
            this.pageTitle = `Edit ${data.firstName}\'s data`;
            // console.log('data = ', data, '     data type: ', typeof(data));
            console.log('supporterRecordId: ', this.data.supporterRecordId);
            console.log('howClose: ', this.data.howClose);
            console.log('firstName: ', this.data.firstName);
            console.log('lastName: ', this.data.lastName);
            console.log('group: ', this.data.group);
            console.log('howOften: ', this.data.howOften);
          }
        );
      } else if (mode === 'add') {
        this.pageInAddMode = true;
        this.pageTitle = 'Add to Circle';
        this.data = new DataContainer(null, null, null, null, null, null);
      }
      console.log('\n\t mode = ', mode);
      console.log('\t pageInEditMode = ', this.pageInEditMode);
      console.log('\t pageInAddMode = ', this.pageInAddMode);
   });
  }

  ionViewDidEnter() {
    this.showForm = true;
    // console.log('this.showForm = ', this.showForm);
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
    // noSocialGroup.png is the default image if the person has unrecognised group code (or no code at all)
    //  That should not happen but just in case...
    let imgFile = 'noSocialGroup.png';
    if (this.pageInAddMode) {
      // do not show any icon (on the left) when entering new data
      imgFile = 'group_icon_empty.svg';
    }
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
    console.log('INSIDE onSubmit(...)');
    this.loadingCtrl
      .create({
        keyboardClose: true, message: 'Saving the data....',
      })
      .then((loadingEl) => {
        loadingEl.present();
        if (this.pageInAddMode) {
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
                this.showAlert2('New data saved', 'The person was added to the circle');
              },
              (error) => {
                loadingEl.dismiss();
                this.showAlert2('An error occurred!', 'The data could not be saved. Please try again later.');
              }
            );
         } else if (this.pageInEditMode) {
          this.circleService
            .updatePersonData(
              this.data.supporterRecordId,
              this.data.firstName,
              this.data.lastName,
              this.data.group,
              +this.data.howClose,
              +this.data.howOften)
            .subscribe(
              (responseData) => {
                loadingEl.dismiss();
                this.showForm=false;
                form.reset();
                this.showAlert2('Edited data saved', 'The data was updated');
              },
              (error) => {
                loadingEl.dismiss();
                this.showAlert2('An error occurred!', 'The data could not be saved. Please try again later.');
              }
            );
         }
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
              this.router.navigateByUrl('/my-circle-screen1');
              // this.router.navigate(["/my-circle-screen1"]);
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
