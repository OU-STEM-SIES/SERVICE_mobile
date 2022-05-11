import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyRecordScreen2PageRoutingModule } from './daily-record-screen2-routing.module';

import { DailyRecordScreen2Page } from './daily-record-screen2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyRecordScreen2PageRoutingModule
  ],
  declarations: [DailyRecordScreen2Page]
})
export class DailyRecordScreen2PageModule {}
