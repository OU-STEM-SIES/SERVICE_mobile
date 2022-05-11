import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyMoodScreen1Page } from './my-mood-screen1.page';

const routes: Routes = [
  {
    path: '',
    component: MyMoodScreen1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyMoodScreen1PageRoutingModule {}
