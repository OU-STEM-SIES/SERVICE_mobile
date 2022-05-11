import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyRecordScreen3PageRoutingModule } from './daily-record-screen3-routing.module';

import { DailyRecordScreen3Page } from './daily-record-screen3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyRecordScreen3PageRoutingModule
  ],
  declarations: [DailyRecordScreen3Page]
})
export class DailyRecordScreen3PageModule {}
