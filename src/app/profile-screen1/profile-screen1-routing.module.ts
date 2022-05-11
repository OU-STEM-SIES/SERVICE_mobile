import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileScreen1Page } from './profile-screen1.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileScreen1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileScreen1PageRoutingModule {}
