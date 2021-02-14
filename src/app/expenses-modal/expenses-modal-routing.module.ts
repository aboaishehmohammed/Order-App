import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpensesModalPage } from './expenses-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ExpensesModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesModalPageRoutingModule {}
