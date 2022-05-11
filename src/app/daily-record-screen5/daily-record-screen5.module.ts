import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DailyRecordScreen5PageRoutingModule } from './daily-record-screen5-routing.module';

import { DailyRecordScreen5Page } from './daily-record-screen5.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DailyRecordScreen5PageRoutingModule
  ],
  declarations: [DailyRecordScreen5Page]
})
export class DailyRecordScreen5PageModule {}
