import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyCircleScreen1PageRoutingModule } from './my-circle-screen1-routing.module';

import { MyCircleScreen1Page } from './my-circle-screen1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyCircleScreen1PageRoutingModule
  ],
  declarations: [MyCircleScreen1Page]
})
export class MyCircleScreen1PageModule {}
