import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyCircleScreen1Page } from './my-circle-screen1.page';

const routes: Routes = [
  {
    path: '',
    component: MyCircleScreen1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyCircleScreen1PageRoutingModule {}
