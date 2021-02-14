import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MortsPage } from './morts.page';

const routes: Routes = [
  {
    path: '',
    component: MortsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MortsPageRoutingModule {}
