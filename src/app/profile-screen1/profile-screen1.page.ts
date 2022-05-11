/* eslint-disable object-shorthand */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

import { AlertController } from '@ionic/angular';
import { UserProfileData } from '../models/userProfileData.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-screen1',
  templateUrl: './profile-screen1.page.html',
  styleUrls: ['./profile-screen1.page.scss'],
})
export class ProfileScreen1Page implements OnInit {

  userProfileData: UserProfileData;
  isLoading = false;
  private userProfileDataSub: Subscription;

  constructor(
    private profileService: ProfileService,
    private alertCtrl: AlertController
  ) {}

  //  THIS IS JUST FOR THE TEST - DO NOT USE IT
  // ionViewWillEnter() {
  //   this.profileService.showUserId();
  // }

  ngOnInit() {
    this.userProfileDataSub = this.profileService.userProfileData.subscribe(userData => {
      this.userProfileData = userData;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.profileService.getUserProfileData().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    if (this.userProfileDataSub) {
      this.userProfileDataSub.unsubscribe();
    }
  }

  private showAlert(header: string, message: string) {
    this.alertCtrl
      .create({
        header: header,
        message: message,
        backdropDismiss: false,
        buttons: ['Ok'],
      })
      .then((alertEl) => alertEl.present());
  }
}
