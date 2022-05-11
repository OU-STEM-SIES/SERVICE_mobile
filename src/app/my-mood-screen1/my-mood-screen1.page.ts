/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { MyMoodService } from '../my-mood.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { MOODS_FOR_DISPLAY } from '../../environments/config_hk';

@Component({
  selector: 'app-my-mood-screen1',
  templateUrl: './my-mood-screen1.page.html',
  styleUrls: ['./my-mood-screen1.page.scss'],
})
export class MyMoodScreen1Page implements OnInit {

  // THE COORDINATES ARE NOT BEING SENT TO THE SERVER AT THE MOMENT:
  // stores (x,y) coordinates of the selected mood value (cliked)
  // This is also the location of the pointer
  selectedMoodValueLocation: {x: number; y: number} = {x: null, y: null};

  backgroundImage: string = 'mood-grid-system_v2_yellow.svg';
  pointerImage: string = 'blackPointer1.png';

  // store the selected mood value (when the image is tapped with the finger)
  // NONE is defined in config_hk.ts in MOODS_FOR_DISPLAY
  selectedMoodValue: string = 'NONE';

  constructor(
    private myMoodService: MyMoodService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    // NONE is defined in config_hk.ts in MOODS_FOR_DISPLAY
    this.selectedMoodValue = 'NONE';
    this.selectedMoodValueLocation = {x: null, y: null};
  }

  //  gets the mood value for the area clicked by the user and also
  // records coordinates of the mood value selected/clicked
  recordMood(event, moodCode: string, x: number, y: number) {
    // console.log(event);
    this.selectedMoodValue = moodCode;
    this.selectedMoodValueLocation.x = x;
    this.selectedMoodValueLocation.y = y;
    console.log('selectedMoodValue: ' +this.selectedMoodValue+ ' -- x: ' +this.selectedMoodValueLocation.x+ ' y: ' +this.selectedMoodValueLocation.y);
  }

  showPointer(x: number, y: number) {
    let verdict: boolean = false;
    if ((this.selectedMoodValueLocation.x !== null) && (this.selectedMoodValueLocation.y !== null)) {
      if (this.selectedMoodValueLocation.x === x) {
        if (this.selectedMoodValueLocation.y === y) {
          verdict = true;
        }
      }
    }
    return verdict;
  }

  resetBtnClicked() {
    console.log('Inside resetBtnClicked()');
    // NONE is defined in config_hk.ts in MOODS_FOR_DISPLAY
    this.selectedMoodValue = 'NONE';
    this.selectedMoodValueLocation = {x: null, y: null};
    console.log('selectedMoodValue: ' +this.selectedMoodValue+ ' -- x: ' +this.selectedMoodValueLocation.x+ ' y: ' +this.selectedMoodValueLocation.y);
  }

  submitBtnClicked() {
    // like in lesson 146 on Udemy course
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Saving your mood...' })
      .then((loadingEl) => {
        loadingEl.present();
        this.myMoodService.saveMoodValue(this.selectedMoodValue).subscribe(
          (responseData) => {
            loadingEl.dismiss();
            this.showAlert('Data saved', 'Your mood data is saved.');
          },
          (error) => {
            loadingEl.dismiss();
            this.showAlert(
              'An error occurred!',
              'Your mood data could not be saved. Please try again later.'
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

  showMood(moodCode: string): string {
    return MOODS_FOR_DISPLAY[moodCode];
  }

  // This is just for testing that we could get the userId from the AuthService
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  showUserId_and_Token() {
    this.myMoodService.showUserId();
    this.myMoodService.showToken();
  }

  // This is just for testing - to get what moods were recorded
  // REMEMBER TO HIDE THE TESTING BUTTONS ON THE PAGE !
  getRecordedMoods() {
    this.myMoodService.getRecordedMoods().subscribe();
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
