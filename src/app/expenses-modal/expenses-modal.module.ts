import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensesModalPageRoutingModule } from './expenses-modal-routing.module';

import { ExpensesModalPage } from './expenses-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesModalPageRoutingModule
  ],
  declarations: [ExpensesModalPage]
})
export class ExpensesModalPageModule {}
