/* eslint-disable object-shorthand */

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';

import { AuthService, AuthResponseData } from '../auth.service';

@Component({
  selector: 'app-login-screen',
  templateUrl: './login-screen.page.html',
  styleUrls: ['./login-screen.page.scss'],
})
export class LoginScreenPage implements OnInit {
  isLoading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  authenticate(userName: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: 'Logging in...' })
      .then((loadingEl) => {
        loadingEl.present();
        const authObs: Observable<AuthResponseData> = this.authService.login(userName, password);
        authObs.subscribe(
          (resData) => {
            console.log(JSON.stringify(resData, null ,2));
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/start-screen');
          },
          (errRes) => {
            loadingEl.dismiss();
            console.log(
              '-------------- ERROR DETAILS START from authenticate(...) : --------------------'
            );
            console.log(errRes);
            console.log(
              '-------------- ERROR DETAILS END from authenticate(...) : --------------------'
            );
            // We are not interested in intercepting error codes from the server
            // const code = errRes.error.error.message;
            const header = 'Login failed';
            const message = 'Please try again later.';
            this.showAlert(header, message);
          }
        );
      });
  }

  onSubmit(form: NgForm) {
    // console.log(form);
    if (!form.valid) {
      return;
    }
    const userName = form.value.userName;
    const password = form.value.password;
    console.log(userName, password);

    this.authenticate(userName, password);
    form.reset();
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
