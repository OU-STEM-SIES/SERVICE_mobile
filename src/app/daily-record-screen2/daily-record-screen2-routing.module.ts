import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyRecordScreen2Page } from './daily-record-screen2.page';

const routes: Routes = [
  {
    path: '',
    component: DailyRecordScreen2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyRecordScreen2PageRoutingModule {}
