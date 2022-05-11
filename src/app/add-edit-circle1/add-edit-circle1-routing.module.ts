import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditCircle1Page } from './add-edit-circle1.page';

const routes: Routes = [
  {
    path: '',
    component: AddEditCircle1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddEditCircle1PageRoutingModule {}
