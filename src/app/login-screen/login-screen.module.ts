import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginScreenPageRoutingModule } from './login-screen-routing.module';

import { LoginScreenPage } from './login-screen.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginScreenPageRoutingModule,
    SharedModule
  ],
  declarations: [LoginScreenPage]
})
export class LoginScreenPageModule {}
