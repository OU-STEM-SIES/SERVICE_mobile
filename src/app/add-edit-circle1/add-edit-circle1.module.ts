import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEditCircle1PageRoutingModule } from './add-edit-circle1-routing.module';

import { AddEditCircle1Page } from './add-edit-circle1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEditCircle1PageRoutingModule
  ],
  declarations: [AddEditCircle1Page]
})
export class AddEditCircle1PageModule {}
