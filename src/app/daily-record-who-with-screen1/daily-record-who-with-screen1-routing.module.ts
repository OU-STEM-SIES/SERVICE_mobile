import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyRecordWhoWithScreen1Page } from './daily-record-who-with-screen1.page';

const routes: Routes = [
  {
    path: '',
    component: DailyRecordWhoWithScreen1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyRecordWhoWithScreen1PageRoutingModule {}
