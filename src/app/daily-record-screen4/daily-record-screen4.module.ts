import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyRecordScreen4PageRoutingModule } from './daily-record-screen4-routing.module';

import { DailyRecordScreen4Page } from './daily-record-screen4.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyRecordScreen4PageRoutingModule
  ],
  declarations: [DailyRecordScreen4Page]
})
export class DailyRecordScreen4PageModule {}
