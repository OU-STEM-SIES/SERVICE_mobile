import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyRecordScreen5Page } from './daily-record-screen5.page';

const routes: Routes = [
  {
    path: '',
    component: DailyRecordScreen5Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyRecordScreen5PageRoutingModule {}
