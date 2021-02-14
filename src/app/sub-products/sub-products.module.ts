import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SubProductsPageRoutingModule } from './sub-products-routing.module';

import { SubProductsPage } from './sub-products.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubProductsPageRoutingModule
  ],
  declarations: [SubProductsPage]
})
export class SubProductsPageModule {}
