import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyRecordScreen4Page } from './daily-record-screen4.page';

const routes: Routes = [
  {
    path: '',
    component: DailyRecordScreen4Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyRecordScreen4PageRoutingModule {}
