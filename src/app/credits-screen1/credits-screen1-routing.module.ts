import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreditsScreen1Page } from './credits-screen1.page';

const routes: Routes = [
  {
    path: '',
    component: CreditsScreen1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreditsScreen1PageRoutingModule {}
