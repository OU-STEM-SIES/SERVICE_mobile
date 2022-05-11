/* eslint-disable object-shorthand */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
//
// INDEXIND ROWS AND COLUMNS STARTS FROM 0
//
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CircleService } from '../circle.service';
import { PersonInTheCircle } from '../models/personInTheCircle.model';

import { available_locations_OUTER_CIRCLE, available_locations_MIDDLE_CIRCLE, available_locations_INNER_CIRCLE } from '../my-circle-screen1/MyCircleHelper';
import { HOW_CLOSE } from '../../environments/config_hk';
import { SOCIAL_GROUPS } from '../../environments/config_hk';

export class PersonOnTheTable {
  constructor(
    public id: number,
    public supporterRecordId: number,
    public firstName: string,
    public lastName: string,
    public group: string,
    public howClose: number,
    public row: number,
    public column: number
  ) {}
}

@Component({
  selector: 'app-my-circle-screen1',
  templateUrl: './my-circle-screen1.page.html',
  styleUrls: ['./my-circle-screen1.page.scss'],
})
export class MyCircleScreen1Page implements OnInit, OnDestroy {

  peopleOnTheTable: PersonOnTheTable[][] = new Array(7);
  isLoading = false;
  private peopleInTeCircleSub: Subscription;

  // our pre-defined locations pool on the table:
  availableLocations_OUTER_CIRCLE: {row: number; column: number}[];
  availableLocations_MIDDLE_CIRCLE: {row: number; column: number}[];
  availableLocations_INNER_CIRCLE:  {row: number; column: number}[];

  // to make sure we are not refershing the table after the person was deleted - we just hide the icon.
  // The reason is that refrehing data is changing places where the items are placed and that would be confusing for the useer
  // The data will be fetched from the server when somebody is added to the circle.
  doNotRefreshAfterDelete = false;

  // contains the description of the problem with showing people in OUTER circle
  showingPeopleProblem_OUTER_CIRCLE: string = '';
  // contains the description of the problem with showing people in MIDDLE circle
  showingPeopleProblem_MIDDLE_CIRCLE: string = '';
  // contains the description of the problem with showing people in INNER circle
  showingPeopleProblem_INNER_CIRCLE: string = '';

  constructor(private circleService: CircleService,
    public actionSheetController: ActionSheetController,
    private router: Router,
    private loadingCtrl: LoadingController,
    public toastController: ToastController,
    private alertCtrl: AlertController) { }

  initializeArray() {
    for (let i = 0; i < 7; i++) {
      const tmp: PersonOnTheTable[] = new Array(7);
      this.peopleOnTheTable[i] = tmp;
    }
  }

  // To clone arrays with available locations (so we will be able to delete the location when it was taken)
  cloningLocationsPool() {
    this.availableLocations_OUTER_CIRCLE = available_locations_OUTER_CIRCLE.map((el) => el);
    this.availableLocations_MIDDLE_CIRCLE = available_locations_MIDDLE_CIRCLE.map((el) => el);
    this.availableLocations_INNER_CIRCLE = available_locations_INNER_CIRCLE.map((el) => el);
  }

  ngOnInit() {
    this.peopleInTeCircleSub = this.circleService.peopleInTheCircle.subscribe((peopleInTheCircle) => {
      if (!this.doNotRefreshAfterDelete) {
        this.cloningLocationsPool();
        this.showingPeopleProblem_OUTER_CIRCLE = '';
        this.showingPeopleProblem_MIDDLE_CIRCLE = '';
        this.showingPeopleProblem_INNER_CIRCLE = '';

        console.log('from MyCircleScreen1Page - this.doNotRefreshAfterDelete = ', this.doNotRefreshAfterDelete);

        this.initializeArray();
        // console.log('from MyCircleScreen1Page: ');

        for (let i = 0; i < peopleInTheCircle.length; i++) {
          // console.log( peopleInTheCircle[i]);
          let aPersonOnTheTable = this.placePersonOnTheTable(peopleInTheCircle[i]);
          const row = aPersonOnTheTable.row;
          const column = aPersonOnTheTable.column;
          // console.log('  row = ', row, '  column = ', column);
          this.peopleOnTheTable[row][column] = aPersonOnTheTable;
        }
      } else {
        this.doNotRefreshAfterDelete = false;
        console.log('   this.doNotRefreshAfterDelete = ', this.doNotRefreshAfterDelete);
      }
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.circleService.fetchAllDataFromTheServer().subscribe(
      () => {
        this.isLoading = false;
        this.presentToast();
      },
      (error) => {
        this.alertCtrl.create({
          header: 'An error occured!',
          message: 'The data could not be fetched. Please try again later.',
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

  // return PersonOnTheTable which contains coordinates where its icon should appear on the table
  placePersonOnTheTable(aPersonInTheCircle: PersonInTheCircle): PersonOnTheTable {
    let coordinates: {row: number; column: number}  = this.getCoordinates(aPersonInTheCircle.howClose);

    let aPersonOnTheTable = new PersonOnTheTable(
      aPersonInTheCircle.id,
      aPersonInTheCircle.supporterRecordId,
      aPersonInTheCircle.firstName,
      aPersonInTheCircle.lastName,
      aPersonInTheCircle.group,
      aPersonInTheCircle.howClose,
      coordinates.row,
      coordinates.column
    );
    return aPersonOnTheTable;
  }

  // return coordinates where the person will be placed on the table
  getCoordinates(howClose: number): {row: number; column: number} {
    let coordinates: {row: number; column: number};
    if (howClose === HOW_CLOSE.OUTER_CIRCLE) {
      if (this.availableLocations_OUTER_CIRCLE.length > 0) {
        // that means there is still a location available:
        coordinates = this.availableLocations_OUTER_CIRCLE.shift();
      } else {
        this.showingPeopleProblem_OUTER_CIRCLE = 'There are more than 24 people in the outer circle';
        // There was not enough space for people so we are overwriting the locations
        this.availableLocations_OUTER_CIRCLE = available_locations_OUTER_CIRCLE.map((el) => el);
        coordinates = this.availableLocations_OUTER_CIRCLE.shift();
      }
    } else if (howClose === HOW_CLOSE.MIDDLE_CIRCLE) {
      if (this.availableLocations_MIDDLE_CIRCLE.length > 0) {
        // that means there is still a location available:
        coordinates = this.availableLocations_MIDDLE_CIRCLE.shift();
      } else {
        this.showingPeopleProblem_MIDDLE_CIRCLE = 'There are more than 16 people in the middle circle';
        // There was not enough space for people so we are overwriting the locations
        this.availableLocations_MIDDLE_CIRCLE = available_locations_MIDDLE_CIRCLE.map((el) => el);
        coordinates = this.availableLocations_MIDDLE_CIRCLE.shift();
      }
    } else if (howClose === HOW_CLOSE.INNER_CIRCLE) {
      if (this.availableLocations_INNER_CIRCLE.length > 0) {
        // that means there is still a location available:
        coordinates = this.availableLocations_INNER_CIRCLE.shift();
      } else {
        this.showingPeopleProblem_INNER_CIRCLE = 'There are more than 8 people in the inner circle';
         // There was not enough space for people so we are overwriting the locations
         this.availableLocations_INNER_CIRCLE = available_locations_INNER_CIRCLE.map((el) => el);
        coordinates = this.availableLocations_INNER_CIRCLE.shift();
      }
    }
    return coordinates;
  }

  getName(row: number, column: number): string {
    const aPerson = this.peopleOnTheTable[row][column];
    // console.log('aPerson = ', aPerson);
    let name = '';
    if (aPerson) {
      name = this.peopleOnTheTable[row][column].firstName;
    }
    return name;
  }

  // Returns true if for the given coordinates of row and column
  // there is a person to be shown
  showPerson(row: number, column: number): boolean {
    let verdict = false;
    const aPerson = this.peopleOnTheTable[row][column];
    if (aPerson) {
      verdict = true;
    }
    return verdict;
  }

  testBtnClicked() {
    // console.log("Person: ", this.getName(0,1));
    // console.log("TEST1: ", this.peopleOnTheTable[0][1]);
    // const tmpArray = this.peopleOnTheTable[0];
    // console.log("tmpArray = ", tmpArray);
    // tmpArray[0] =
    //       new PersonOnTheTable(
    //         12345,
    //         "FirstNameREXq1",
    //         "LastNameREXq1",
    //         3,
    //         0,
    //         0
    //       );
    // console.log(this.peopleOnTheTable);
    const coords = this.getCoordinates(1);
    // console.log('row: ', coords.row, '  column: ', coords.column);
    // console.log('TEST importu: ', this.availableLocations_OUTER_CIRCLE[2]);
    console.log('this.availableLocations_INNER_CIRCLE: ', this.availableLocations_INNER_CIRCLE);
  }

  // Returns true if there are more people then can be shown in at least one of the 3 circles (OUTER_CIRCLE,MIDDLE_CIRCLE,INNER_CIRCLE)
  anyProblemsWithShowingPeople(): boolean {
    let verdict = false;
    if (this.showingPeopleProblem_OUTER_CIRCLE !== '') {
      verdict = true;
    }
    if (this.showingPeopleProblem_MIDDLE_CIRCLE !== '') {
      verdict = true;
    }
    if (this.showingPeopleProblem_INNER_CIRCLE !== '') {
      verdict = true;
    }
    return verdict;
  }

  btnClicked(row: number, column: number) {
    console.log('btnClicked:  row: ', row, '    column: ', column);
    let headerStr = this.getName(row, column);
    this.presentActionSheet(headerStr, row, column);
  }

  // addToCircle() {
  addPersonToCircle() {
    this.doNotRefreshAfterDelete = false;
    // REMOVE THIS PAGE WHEN NOT IN USE ANYMORE:
    // this.router.navigateByUrl('/add-to-circle1');
    // here we pass 'mode=add' only
    this.router.navigateByUrl('/add-edit-circle1/add/');
  }

 editPersonInCircle(supporterRecordId: number) {
   this.doNotRefreshAfterDelete = false;

   // here we pass 'mode' and 'supporterRecordId' that will be edited
   this.router.navigateByUrl('/add-edit-circle1/edit/' + supporterRecordId.toString());
  // another method:
  // this.router.navigate(['/add-edit-circle1', 'edit', supporterRecordId]);
  }

  async presentActionSheet(headerStr: string, row: number, column: number) {
    console.log('PERSON clicked:   ( row = ' +row+ ', col = ' +column+ ' )');
    const actionSheet = await this.actionSheetController.create({
      header: headerStr,
      buttons: [
        // {
        //   text: ' Mood history',
        //   icon: 'analytics-outline',
        //   handler: () => {
        //     console.log(' "Mood history" clicked');
        //     this.router.navigateByUrl('/mood-history1');
        //   }
        // },
        {
          text: 'Edit',
          icon: 'create-outline',
          handler: () => {
            console.log(' "Edit" clicked');
            let supporterRecordId = this.getSupporterRecordId(row, column);
            this.editPersonInCircle(supporterRecordId);
          }
        },
        {
          text: 'Remove from circle',
          icon: 'trash-outline',
          handler: () => {
            console.log(' "Remove from circle" clicked');
            let id = this.getId(row, column);
            let supporterRecordId = this.getSupporterRecordId(row, column);
            this.removePersonFromCircle(id, supporterRecordId, row, column);
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log(' "Cancel" clicked');
          }
        }
      ]
    });
    await actionSheet.present();
    const { role } = await actionSheet.onDidDismiss();
    // console.log('onDidDismiss resolved with role', role);
  }

  // we remove the person identified by 'supporterRecordId'
  removePersonFromCircle(id: number, supporterRecordId: number, row: number, column: number) {
    // Removing the person from the peopleOnTheTable table just hides the icon when the person is deleted from the circle.
    // We are not refershing the table with data from service- we just hide the icon.
    // The reason is that refrehing data is changing places where the items are placed and that would be confusing for the useer
    this.doNotRefreshAfterDelete = true;
    this.loadingCtrl.create({ message: 'Removing...' }).then(loadingEl => {
      loadingEl.present();
      this.circleService.removePerson(id, supporterRecordId).subscribe(
        (responseData) => {
          this.returnLocationToThePool(this.peopleOnTheTable[row][column]);
          this.peopleOnTheTable[row][column] = undefined;
          loadingEl.dismiss();
        },
        (error) => {
          loadingEl.dismiss();
          console.log('------------  ERROR START:  ---------');
          console.log(error);
          console.log(error.message);
          console.log(error.status);
          console.log('------------  ERROR END:  ---------');
          this.showAlert(
            'An error occurred!',
            'Please try again later.'
          );
        }
        );
    });
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

  // when the person is deleted from the table its location returns to the pool of available locations
  returnLocationToThePool(aPersonOnTheTable: PersonOnTheTable) {
    const howClose: number = aPersonOnTheTable.howClose;
    const rowTmp: number = aPersonOnTheTable.row;
    const columnTmp: number = aPersonOnTheTable.column;

    if (howClose === HOW_CLOSE.OUTER_CIRCLE) {
      this.availableLocations_OUTER_CIRCLE.push({row: rowTmp, column: columnTmp});
    } else if (howClose === HOW_CLOSE.MIDDLE_CIRCLE) {
      this.availableLocations_MIDDLE_CIRCLE.push({row: rowTmp, column: columnTmp});
    } else if (howClose === HOW_CLOSE.INNER_CIRCLE) {
      this.availableLocations_INNER_CIRCLE.push({row: rowTmp, column: columnTmp});
    }
  }

  // Return the supporterRecordId based on the given coordinates of row and column
  // we remove the person identified by 'supporterRecordId'
  getSupporterRecordId(row: number, column: number): number {
    return this.peopleOnTheTable[row][column].supporterRecordId;
  }

  // Return the person's id based on the given coordinates of row and column
  getId(row: number, column: number): number {
    return this.peopleOnTheTable[row][column].id;
  }

  // This is just for the peron at the centre
  // async presentActionSheetForME() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: 'ME',
  //     buttons: [{
  //       text: ' Mood history',
  //       icon: 'analytics-outline',
  //       cssClass: 'disabledActionSheetMenuBtn_HK',
  //       handler: () => {
  //         console.log(' "Mood history" clicked');
  //         // this.router.navigateByUrl('/mood-history1');
  //       }
  //     }, {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log(' "Cancel" clicked');
  //       }
  //     }]
  //   });
  //   await actionSheet.present();
  //   const { role } = await actionSheet.onDidDismiss();
  //   console.log('onDidDismiss resolved with role', role);
  // }

  ngOnDestroy() {
    if (this.peopleInTeCircleSub) {
      this.peopleInTeCircleSub.unsubscribe();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Tap the person icon for more actions.',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  getImage(row: number, column: number): string {
    const imgFolderPath = './../assets/socialGroupIcons/';
    // noSocialGroup.png is the default image if the person has unrecognised group code (or no code at all)
    //  That should not happen but just in case...
    let imgFile = 'noSocialGroup.png';
    const aPerson = this.peopleOnTheTable[row][column];
    if (aPerson) {
      const groupCode = this.peopleOnTheTable[row][column].group;
      if (groupCode) {
        const aDataFound = SOCIAL_GROUPS.filter(item => item.groupCode === groupCode);
        if (aDataFound.length === 1) {
          imgFile = aDataFound[0].groupImg;
        }
      }
    }
    return imgFolderPath + imgFile;
  }

  // This is just for testing - to experiment with parsing the data from server for 'My Circle' screen
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  parsingTEST_1() {
    this.circleService.parsingTEST_1().subscribe();
  }

  // This is just for testing - to get the data from server for 'My Circle' screen
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  showPeopleInTheCircleTEST() {
    this.circleService.showPeopleInTheCircleTEST().subscribe();
  }

  // This is just for testing - to see what data is stored locally for 'My Circle' screen
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  showDataStoredLocallyTEST() {
    this.circleService.peopleInTheCircle.subscribe((peopleInTheCircle) => {
      for (let i = 0; i < peopleInTheCircle.length; i++) {
        console.log(peopleInTheCircle[i]);
      }
    });
  }

  // This is just for testing that we could get the userId from the AuthService
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  showUserId_and_TokenTEST() {
    this.circleService.showUserId();
    this.circleService.showToken();
  }
}
