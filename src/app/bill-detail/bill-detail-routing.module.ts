import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BillDetailPage } from './bill-detail.page';

const routes: Routes = [
  {
    path: '',
    component: BillDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BillDetailPageRoutingModule {}
