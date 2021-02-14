import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubProductModalPage } from './sub-product-modal.page';

const routes: Routes = [
  {
    path: '',
    component: SubProductModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubProductModalPageRoutingModule {}
