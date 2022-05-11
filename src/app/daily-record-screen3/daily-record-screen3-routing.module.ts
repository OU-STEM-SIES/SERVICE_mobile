import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyRecordScreen3Page } from './daily-record-screen3.page';

const routes: Routes = [
  {
    path: '',
    component: DailyRecordScreen3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyRecordScreen3PageRoutingModule {}
