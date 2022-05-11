import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyHistoryScreen1Page } from './my-history-screen1.page';

const routes: Routes = [
  {
    path: '',
    component: MyHistoryScreen1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyHistoryScreen1PageRoutingModule {}
