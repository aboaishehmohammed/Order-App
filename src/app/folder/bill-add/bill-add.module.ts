import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BillAddPageRoutingModule } from './bill-add-routing.module';

import { BillAddPage } from './bill-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BillAddPageRoutingModule
  ],
  declarations: [BillAddPage]
})
export class BillAddPageModule {}
