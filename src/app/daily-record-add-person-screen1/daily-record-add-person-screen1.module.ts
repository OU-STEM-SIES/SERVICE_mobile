import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyRecordAddPersonScreen1PageRoutingModule } from './daily-record-add-person-screen1-routing.module';

import { DailyRecordAddPersonScreen1Page } from './daily-record-add-person-screen1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyRecordAddPersonScreen1PageRoutingModule
  ],
  declarations: [DailyRecordAddPersonScreen1Page]
})
export class DailyRecordAddPersonScreen1PageModule {}
