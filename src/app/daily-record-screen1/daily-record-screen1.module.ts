import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyRecordScreen1PageRoutingModule } from './daily-record-screen1-routing.module';

import { DailyRecordScreen1Page } from './daily-record-screen1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyRecordScreen1PageRoutingModule
  ],
  declarations: [DailyRecordScreen1Page]
})
export class DailyRecordScreen1PageModule {}
