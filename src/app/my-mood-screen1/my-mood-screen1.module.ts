import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyMoodScreen1PageRoutingModule } from './my-mood-screen1-routing.module';

import { MyMoodScreen1Page } from './my-mood-screen1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyMoodScreen1PageRoutingModule
  ],
  declarations: [MyMoodScreen1Page]
})
export class MyMoodScreen1PageModule {}
