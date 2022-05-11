import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditsScreen1PageRoutingModule } from './credits-screen1-routing.module';

import { CreditsScreen1Page } from './credits-screen1.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditsScreen1PageRoutingModule,
    SharedModule
  ],
  declarations: [CreditsScreen1Page]
})
export class CreditsScreen1PageModule {}
