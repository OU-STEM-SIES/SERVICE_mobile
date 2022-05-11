import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyRecordScreen1Page } from './daily-record-screen1.page';

const routes: Routes = [
  {
    path: '',
    component: DailyRecordScreen1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyRecordScreen1PageRoutingModule {}
