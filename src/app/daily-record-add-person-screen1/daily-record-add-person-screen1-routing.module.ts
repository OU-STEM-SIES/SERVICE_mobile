import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DailyRecordAddPersonScreen1Page } from './daily-record-add-person-screen1.page';

const routes: Routes = [
  {
    path: '',
    component: DailyRecordAddPersonScreen1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DailyRecordAddPersonScreen1PageRoutingModule {}
