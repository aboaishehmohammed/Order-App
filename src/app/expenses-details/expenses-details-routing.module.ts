import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpensesDetailsPage } from './expenses-details.page';

const routes: Routes = [
  {
    path: '',
    component: ExpensesDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesDetailsPageRoutingModule {}
