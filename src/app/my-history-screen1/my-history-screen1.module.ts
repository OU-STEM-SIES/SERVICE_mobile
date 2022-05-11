import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyHistoryScreen1PageRoutingModule } from './my-history-screen1-routing.module';

import { MyHistoryScreen1Page } from './my-history-screen1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyHistoryScreen1PageRoutingModule
  ],
  declarations: [MyHistoryScreen1Page]
})
export class MyHistoryScreen1PageModule {}
