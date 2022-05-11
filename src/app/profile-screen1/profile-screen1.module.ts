import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileScreen1PageRoutingModule } from './profile-screen1-routing.module';

import { ProfileScreen1Page } from './profile-screen1.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileScreen1PageRoutingModule,
    SharedModule
  ],
  declarations: [ProfileScreen1Page]
})
export class ProfileScreen1PageModule {}
