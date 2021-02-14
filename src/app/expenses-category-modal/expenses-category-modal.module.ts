import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensesCategoryModalPageRoutingModule } from './expenses-category-modal-routing.module';

import { ExpensesCategoryModalPage } from './expenses-category-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesCategoryModalPageRoutingModule
  ],
  declarations: [ExpensesCategoryModalPage]
})
export class ExpensesCategoryModalPageModule {}
