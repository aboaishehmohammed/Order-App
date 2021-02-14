import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensesCategoryPageRoutingModule } from './expenses-category-routing.module';

import { ExpensesCategoryPage } from './expenses-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesCategoryPageRoutingModule
  ],
  declarations: [ExpensesCategoryPage]
})
export class ExpensesCategoryPageModule {}
