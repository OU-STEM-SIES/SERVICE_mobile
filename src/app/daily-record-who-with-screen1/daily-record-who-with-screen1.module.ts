import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyRecordWhoWithScreen1PageRoutingModule } from './daily-record-who-with-screen1-routing.module';

import { DailyRecordWhoWithScreen1Page } from './daily-record-who-with-screen1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyRecordWhoWithScreen1PageRoutingModule
  ],
  declarations: [DailyRecordWhoWithScreen1Page]
})
export class DailyRecordWhoWithScreen1PageModule {}
