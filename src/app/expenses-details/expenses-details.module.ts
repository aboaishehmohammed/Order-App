import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExpensesDetailsPageRoutingModule } from './expenses-details-routing.module';

import { ExpensesDetailsPage } from './expenses-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExpensesDetailsPageRoutingModule
  ],
  declarations: [ExpensesDetailsPage]
})
export class ExpensesDetailsPageModule {}
