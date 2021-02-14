import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExpensesCategoryPage } from './expenses-category.page';

const routes: Routes = [
  {
    path: '',
    component: ExpensesCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpensesCategoryPageRoutingModule {}
