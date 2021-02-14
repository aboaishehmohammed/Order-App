import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillDetailPageRoutingModule } from './bill-detail-routing.module';

import { BillDetailPage } from './bill-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillDetailPageRoutingModule
  ],
  declarations: [BillDetailPage]
})
export class BillDetailPageModule {}
