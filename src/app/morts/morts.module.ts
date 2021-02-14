import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MortsPageRoutingModule } from './morts-routing.module';

import { MortsPage } from './morts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MortsPageRoutingModule
  ],
  declarations: [MortsPage]
})
export class MortsPageModule {}
