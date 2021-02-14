import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubProductsPage } from './sub-products.page';

const routes: Routes = [
  {
    path: '',
    component: SubProductsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubProductsPageRoutingModule {}
