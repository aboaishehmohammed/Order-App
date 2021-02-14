import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubProductModalPageRoutingModule } from './sub-product-modal-routing.module';

import { SubProductModalPage } from './sub-product-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubProductModalPageRoutingModule
  ],
  declarations: [SubProductModalPage]
})
export class SubProductModalPageModule {}
